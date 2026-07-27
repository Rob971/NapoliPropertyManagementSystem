"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { tourSteps } from "@/data/demo-scenarios";
import type { TourStep } from "@/types";
import { ChevronRight, X } from "lucide-react";

interface GuidedTourProps {
  step: number | null;
  onNext: () => void;
  onEnd: () => void;
}

function TourHighlight({ target }: { target: string }) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const update = () => {
      const element = document.querySelector(`[data-tour="${target}"]`);
      setRect(element ? element.getBoundingClientRect() : null);
    };

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    const timer = window.setTimeout(update, 150);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      window.clearTimeout(timer);
    };
  }, [target]);

  if (!rect) return null;

  return (
    <div
      className="pointer-events-none fixed z-[65] rounded-xl ring-4 ring-indigo-400/70 ring-offset-2 transition-all duration-300"
      style={{
        top: rect.top - 4,
        left: rect.left - 4,
        width: rect.width + 8,
        height: rect.height + 8,
      }}
    />
  );
}

function TourContent({
  step,
  current,
  onNext,
  onEnd,
}: {
  step: number;
  current: TourStep;
  onNext: () => void;
  onEnd: () => void;
}) {
  const isLast = step === tourSteps.length - 1;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/40" onClick={onEnd} aria-hidden />
      <TourHighlight target={current.target} />

      <div className="fixed bottom-6 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 animate-in slide-in-from-bottom-4 fade-in duration-300">
        <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-2xl ring-1 ring-indigo-100">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">
                Step {step + 1} of {tourSteps.length}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{current.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {current.description}
              </p>
            </div>
            <Button size="icon-sm" variant="ghost" onClick={onEnd}>
              <X className="size-4" />
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex gap-1">
              {tourSteps.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === step
                      ? "w-6 bg-indigo-600"
                      : index < step
                        ? "w-1.5 bg-indigo-300"
                        : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={onEnd}>
                Skip
              </Button>
              <Button size="sm" onClick={isLast ? onEnd : onNext}>
                {isLast ? "Start Exploring" : "Next"}
                {!isLast && <ChevronRight className="size-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function GuidedTour({ step, onNext, onEnd }: GuidedTourProps) {
  if (step === null || step >= tourSteps.length) return null;

  return (
    <TourContent
      step={step}
      current={tourSteps[step]}
      onNext={onNext}
      onEnd={onEnd}
    />
  );
}
