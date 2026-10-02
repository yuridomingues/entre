"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** Adds class `tick` briefly when deps change — pair with `.tick` + `@keyframes score-pop` in CSS. */
export function usePulseTick(deps: readonly unknown[]) {
  const [tick, setTick] = useState(false);
  const key = JSON.stringify(deps);
  const prev = useRef(key);
  useEffect(() => {
    if (prev.current === key) return;
    prev.current = key;
    setTick(true);
    const t = setTimeout(() => setTick(false), 340);
    return () => clearTimeout(t);
  }, [key]);
  return tick;
}

export function useMotionTimers() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }, []);
  useEffect(() => () => clear(), [clear]);
  return { schedule, clear };
}

export function motionClass(tick: boolean, extra?: string) {
  return [extra, tick ? "tick" : ""].filter(Boolean).join(" ") || undefined;
}
