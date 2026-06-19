import React, { useState } from "react";
import GlassCard from "./GlassCard";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { Send, CheckCircle, Mail, User, MessageSquare } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return;
    }

    try {
      const existingSubmissions = JSON.parse(
        localStorage.getItem("contact_submissions") || "[]"
      );
      const newSubmission = {
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "contact_submissions",
        JSON.stringify([...existingSubmissions, newSubmission])
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after a few seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Failed to save submission", error);
      setStatus("error");
    }
  };

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

                <button
                  type="submit"
                  disabled={status === "success"}
                  className={`neo-btn w-full py-3 font-mono uppercase text-sm ${
                    status === "success"
                      ? "bg-grass text-ink"
                      : "bg-accent text-ink"
                  }`}
                >
                  {status === "success" ? (
                    <>
                      <CheckCircle size={20} />
                      Message Saved!
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
