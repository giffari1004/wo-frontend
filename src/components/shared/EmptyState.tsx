import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const hasAction = actionLabel && onAction;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-4 animate-in fade-in duration-300",
        className,
      )}
    >
      {/* Circular Muted Icon Badge */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>

      {/* Primary Serif Heading */}
      <h3 className="font-serif text-lg font-medium tracking-wide text-primary mb-1">
        {title}
      </h3>

      {/* Context-Specific Description */}
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* Optional Call to Action Trigger Button */}
      {hasAction && (
        <Button
          onClick={onAction}
          className="bg-primary hover:bg-primary/90 text-white font-medium tracking-wide shadow-sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
