import React from "react";
import { AlertTriangle } from "lucide-react";

export const Loader: React.FC<{ label?: string; className?: string }> = ({
  label = "Loading",
  className = "",
}) => (
  <div
    className={`flex items-center justify-center gap-3 py-12 font-mono text-sm font-bold uppercase ${className}`}
    role="status"
  >
    <span
      className="w-5 h-5 rounded-full border-2 border-ink dark:border-chalk border-t-accent animate-spin"
      aria-hidden="true"
    ></span>
    {label}…
  </div>
);

export const ErrorState: React.FC<{ message?: string; className?: string }> = ({
  message = "Failed to load data.",
  className = "",
}) => (
  <div
    className={`flex items-center justify-center gap-2 py-12 font-mono text-sm font-bold uppercase text-coral ${className}`}
    role="alert"
  >
    <AlertTriangle size={16} /> {message}
  </div>
);
