import React from "react";
import { Download, ArrowDown } from "lucide-react";
import SmartImage from "./SmartImage";
import { Loader, ErrorState } from "./States";
import { useProfile, useSocialLinks } from "../hooks/usePortfolio";
import { SOCIAL_ICONS } from "../lib/socialIcons";

const Hero: React.FC = () => {
  const { data: profile, isLoading, isError } = useProfile();
  const { data: socials } = useSocialLinks();

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  if (isLoading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center px-4">
        <Loader label="Loading profile" />
      </section>
    );
  }
  if (isError || !profile) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center px-4">
        <ErrorState message="Couldn't load profile." />
      </section>
    );
  }

  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="home" className="min-h-screen flex items-center pt-28 pb-16 px-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Text */}
        <div className="lg:col-span-7 order-2 lg:order-1 space-y-6 animate-fade-in">
          <h1 className="font-bold leading-[0.95] tracking-tight text-5xl md:text-7xl">
            Hi, I'm <span className="highlight">{firstName}</span>
            <br />
            {lastName}
          </h1>

          <p className="text-xl md:text-2xl font-medium flex flex-wrap items-center gap-3">
            {profile.role}
            <span className="neo-tag bg-paper dark:bg-night py-1 normal-case tracking-normal">
              📍 {profile.location}
            </span>
          </p>

          <p className="text-base md:text-lg leading-relaxed max-w-xl text-ink/80 dark:text-chalk/80">
            {profile.about}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={profile.cvUrl ?? "#"}
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
            {(socials ?? []).map((link, idx) => {
              const Icon = SOCIAL_ICONS[link.platform] ?? SOCIAL_ICONS.other;
              return (
                <a
                  key={idx}
                  href={link.url}
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

        {/* Photo frame */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
          <div className="relative w-fit">
            {/* Accent block sitting behind the frame = the "shadow" */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-accent border-2 border-ink dark:border-chalk"></div>

            {/* The photo */}
            <div className="relative border-2 border-ink dark:border-chalk bg-paper dark:bg-night overflow-hidden">
              <SmartImage
                eager
                src={profile.photoUrl ?? ""}
                alt={profile.name}
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
