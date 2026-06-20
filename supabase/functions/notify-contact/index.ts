// Supabase Edge Function: notify-contact
// -----------------------------------------------------------------------------
// Triggered by a Database Webhook on INSERT into public.contact_messages.
// Sends an email notification to the site owner via Resend (https://resend.com).
//
// Deploy:
//   supabase functions deploy notify-contact --no-verify-jwt
//
// Secrets (set once):
//   supabase secrets set \
//     RESEND_API_KEY=re_xxx \
//     NOTIFY_EMAIL_TO=you@example.com \
//     NOTIFY_EMAIL_FROM="Portfolio <onboarding@resend.dev>" \
//     WEBHOOK_SECRET=some-long-random-string
//
// Then create the Database Webhook (Dashboard → Database → Webhooks) on
// contact_messages / INSERT → POST to this function's URL, adding a header:
//   x-webhook-secret: <same WEBHOOK_SECRET>
// -----------------------------------------------------------------------------

interface ContactRecord {
  id?: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  created_at?: string;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

Deno.serve(async (req) => {
  // 1) Only the Supabase webhook (which knows the shared secret) may trigger mail.
  const secret = Deno.env.get("WEBHOOK_SECRET");
  if (secret && req.headers.get("x-webhook-secret") !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2) Parse the webhook payload { type, table, record, old_record, schema }.
  let record: ContactRecord | undefined;
  try {
    const body = await req.json();
    record = body.record;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (!record?.email || !record?.message) {
    return new Response("Missing record fields", { status: 400 });
  }

  // 3) Send the notification via Resend's REST API (no SDK needed).
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("NOTIFY_EMAIL_TO");
  const from =
    Deno.env.get("NOTIFY_EMAIL_FROM") ?? "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or NOTIFY_EMAIL_TO secret");
    return new Response("Email not configured", { status: 500 });
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 12px">📬 New message from your portfolio</h2>
      <p><strong>Name:</strong> ${escapeHtml(record.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(record.email)}</p>
      ${record.subject ? `<p><strong>Subject:</strong> ${escapeHtml(record.subject)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;background:#faf4e8;border:2px solid #1a1a18;padding:12px">${escapeHtml(record.message)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
      <p style="color:#888;font-size:12px">Reply directly to this email to respond.</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: record.email,
      subject: `New portfolio message from ${record.name}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", res.status, detail);
    return new Response(`Email failed: ${res.status}`, { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
