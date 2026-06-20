import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import GlassCard from "./GlassCard";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { submitContactMessage } from "../lib/queries";
import { Send, CheckCircle, Mail, User, MessageSquare, AlertTriangle } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // anti-spam: humans never fill this
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    },
    onError: (err) => {
      console.error("Contact submit failed", err);
      setStatus("error");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    // Bot filled the honeypot → silently pretend success, don't send.
    if (honeypot) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    mutation.mutate(formData);
  };

  const isSending = mutation.isPending;
  const isDone = status === "success";

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            title="Get In Touch"
            subtitle="Have a project in mind or just want to say hi?"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ScrollReveal delay={100} className="space-y-6">
            <p className="text-lg leading-relaxed text-ink/80 dark:text-chalk/80">
              I'm currently available for internship and full-time
              opportunities. If you have any questions or just want to connect,
              feel free to drop me a message!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <GlassCard hoverEffect={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden from users & screen readers, visible to bots */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-mono font-bold uppercase tracking-wide mb-1.5"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink/50 dark:text-chalk/50">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="neo-input !pl-10"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-mono font-bold uppercase tracking-wide mb-1.5"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink/50 dark:text-chalk/50">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="neo-input !pl-10"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-mono font-bold uppercase tracking-wide mb-1.5"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none text-ink/50 dark:text-chalk/50">
                      <MessageSquare size={18} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="neo-input !pl-10 resize-none"
                      placeholder="Your message here..."
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-coral">
                    <AlertTriangle size={14} /> Couldn't send. Try again or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending || isDone}
                  className={`neo-btn w-full py-3 font-mono uppercase text-sm ${
                    isDone ? "bg-grass text-ink" : "bg-accent text-ink"
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : isSending ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-ink border-t-transparent animate-spin"></span>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
