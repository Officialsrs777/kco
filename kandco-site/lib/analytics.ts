export function track(event: string, props?: Record<string, any>) {
  if (typeof window === "undefined") return;
  // Plausible global
  // @ts-ignore
  if (window.plausible) window.plausible(event, { props });
}
