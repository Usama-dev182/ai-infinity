import { Bot, Brain, Code2, Compass, Rocket, Workflow, type LucideProps } from "lucide-react";
import type { ServiceIconName } from "@/content/services";

const ICONS: Record<ServiceIconName, React.ComponentType<LucideProps>> = {
  Rocket,
  Brain,
  Bot,
  Workflow,
  Code2,
  Compass,
};

/** Maps a service's icon name to its Lucide component (single source for every page). */
export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = ICONS[name] ?? Code2;
  return <Icon aria-hidden="true" {...props} />;
}

export function ServiceIconTile({ name, size = "md" }: { name: ServiceIconName; size?: "sm" | "md" | "lg" }) {
  const box = { sm: "w-10 h-10 rounded-lg", md: "w-12 h-12 rounded-xl", lg: "w-14 h-14 rounded-2xl" }[size];
  const icon = { sm: "w-5 h-5", md: "w-6 h-6", lg: "w-7 h-7" }[size];
  return (
    <span className={`${box} bg-cta-gradient inline-flex items-center justify-center shrink-0 shadow-sm`}>
      <ServiceIcon name={name} className={`${icon} text-white`} />
    </span>
  );
}
