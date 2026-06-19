import React from "react";
import { Star } from "lucide-react";

const ITEMS = [
  "React",
  "Next.js",
  "Angular",
  "TypeScript",
  "Golang",
  "Express",
  "Laravel",
  "Tailwind CSS",
  "Node.js",
  "Flutter",
];

// Brutalist scrolling ticker — a hard-to-fake, intentional design element.
const Marquee: React.FC = () => {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="border-y-2 border-ink dark:border-chalk bg-accent text-ink overflow-hidden py-3 select-none">
      <div className="flex w-max animate-marquee">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 px-5 font-mono text-sm font-bold uppercase tracking-wider"
          >
            {item}
            <Star size={14} className="fill-ink stroke-ink" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
