import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/* Use your shadcn Tab primitives - adjust import path if your project differs */
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./tabs";

export interface PillTab {
  value: string;
  label: React.ReactNode;
  panel?: React.ReactNode;
}

interface PillMorphTabsProps {
  items?: PillTab[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/**
 * PillMorphTabs
 *
 * - Uses shadcn Tabs primitives for accessibility.
 * - Active pill is an animated morphing element (framer-motion).
 * - Glassmorphism + subtle gradient background.
 * - Responsive and keyboard accessible (handled by Tabs).
 */
export default function PillMorphTabs({
  items = [],
  defaultValue,
  onValueChange,
  className,
}: PillMorphTabsProps) {
  const first = items[0]?.value ?? "tab-0";
  const [value, setValue] = React.useState<string>(defaultValue ?? first);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicator, setIndicator] = React.useState<{ left: number; width: number } | null>(null);
  const [isExpanding, setIsExpanding] = React.useState(false);

  // measure position & width of active trigger and set indicator
  const measure = React.useCallback(() => {
    const list = listRef.current;
    const activeEl = triggerRefs.current[value];
    if (!list || !activeEl) {
      setIndicator(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const tRect = activeEl.getBoundingClientRect();
    setIndicator({
      left: tRect.left - listRect.left + list.scrollLeft,
      width: tRect.width,
    });
  }, [value]);

  // measure on mount, value changes and resize
  React.useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    Object.values(triggerRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // when value changes, trigger a short "expand" animation effect
  React.useEffect(() => {
    setIsExpanding(true);
    const id = window.setTimeout(() => setIsExpanding(false), 300); // duration for expand feel
    return () => window.clearTimeout(id);
  }, [value]);

  React.useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value, onValueChange]);

  return (
    <div className={cn("w-full", className)}>
      <Tabs value={value} onValueChange={(v) => setValue(v)}>
        <div
          ref={listRef}
          className={cn(
            "relative",
            // glass + subtle gradient
            "inline-flex items-center gap-2 p-1 rounded-full",
            "bg-black/5 dark:bg-white/5 backdrop-blur-sm",
            "border border-black/5 dark:border-white/5"
          )}
          style={{
            // optional soft gradient overlay (works both light/dark)
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))",
          }}
        >
          {/* animated pill indicator */}
          {indicator && (
            <motion.div
              layout
              initial={false}
              animate={{
                left: indicator.left,
                width: indicator.width,
                // slight vertical expand when "isExpanding"
                scaleY: isExpanding ? 1.06 : 1,
                borderRadius: isExpanding ? 24 : 999,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
              }}
              className="absolute pointer-events-none top-1 bottom-1 rounded-full"
              style={{
                // gradient + subtle glass fill + soft border & shadow
                background: "linear-gradient(90deg, #0071e3, #4facfe)",
                boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                left: indicator.left,
                width: indicator.width,
              }}
            />
          )}

          {/* blur glow behind pill for extra depth */}
          {indicator && (
            <motion.div
              layout
              initial={false}
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="absolute pointer-events-none top-0 bottom-0 rounded-full filter blur-2xl opacity-20"
              style={{
                background: "linear-gradient(90deg,#0071e3,#4facfe)",
                mixBlendMode: "screen",
                left: indicator.left,
                width: indicator.width,
              }}
            />
          )}

          {/* TabsList using shadcn TabsTrigger */}
          <TabsList className="relative flex gap-1 p-1 bg-transparent">
            {items.map((it) => {
              const isActive = it.value === value;
              return (
                <TabsTrigger
                  key={it.value}
                  value={it.value}
                  ref={(el: HTMLButtonElement | null) => (triggerRefs.current[it.value] = el)}
                  className={cn(
                    "relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-black dark:hover:text-white",
                    isActive ? "text-white" : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                >
                  {it.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Panels */}
        <div className="mt-8">
          {items.map((it) => (
            <TabsContent key={it.value} value={it.value} className="p-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {it.panel ?? null}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}