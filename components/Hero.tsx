import React from "react";
import { Download, ArrowDown } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../constants";
import SmartImage from "./SmartImage";

const Hero: React.FC = () => {
  const cvHref = `${import.meta.env.BASE_URL}${PERSONAL_INFO.cvPath}`;
  const [firstName, ...rest] = PERSONAL_INFO.name.split(" ");
  const lastName = rest.join(" ");

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-28 pb-16 px-4"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Text */}
        <div className="lg:col-span-7 order-2 lg:order-1 space-y-6 animate-fade-in">
          <h1 className="font-bold leading-[0.95] tracking-tight text-5xl md:text-7xl">
            Hi, I'm <span className="highlight">{firstName}</span>
            <br />
            {lastName}
          </h1>

          <p className="text-xl md:text-2xl font-medium flex flex-wrap items-center gap-3">
            {PERSONAL_INFO.role}
            <span className="neo-tag bg-paper dark:bg-night py-1 normal-case tracking-normal">
              📍 {PERSONAL_INFO.location}
            </span>
          </p>

          <p className="text-base md:text-lg leading-relaxed max-w-xl text-ink/80 dark:text-chalk/80">
            {PERSONAL_INFO.about}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-accent text-ink px-6 py-3 font-mono text-sm uppercase"
              aria-label="Download CV"
            >
              <Download size={18} /> Download CV
            </a>
            <button
              onClick={scrollToContact}
              className="neo-btn bg-paper dark:bg-night px-6 py-3 font-mono text-sm uppercase"
            >
              Get in touch <ArrowDown size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {SOCIAL_LINKS.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="neo bg-paper dark:bg-night p-3 transition-transform hover:-translate-y-1"
                  aria-label={link.label}
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Photo frame (dummy placeholder) */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
          <div className="relative w-fit">
            {/* Accent block sitting behind the frame = the "shadow" */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-accent border-2 border-ink dark:border-chalk"></div>

            {/* The photo */}
            <div className="relative border-2 border-ink dark:border-chalk bg-paper dark:bg-night overflow-hidden">
              <SmartImage
                eager
                src={PERSONAL_INFO.photo}
                alt={PERSONAL_INFO.name}
                wrapperClassName="w-[260px] sm:w-[300px] lg:w-[330px] h-[330px] sm:h-[380px] lg:h-[420px]"
                className="block w-full h-full object-cover"
              />
            </div>

            {/* Rotated sticker */}
            <div className="absolute -bottom-5 -left-5 rotate-[-6deg] neo bg-coral text-ink px-4 py-2 font-mono text-xs font-bold uppercase">
              {"<Fullstack Dev />"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
