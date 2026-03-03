import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let hovering = false, visible = false, raf = 0;

    const onMove  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; visible = true; };
    const onOver  = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("[data-cursor-hover]")) hovering = true; };
    const onOut   = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("[data-cursor-hover]")) hovering = false; };
    const onLeave = () => { visible = false; };

    const tick = () => {
      dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`;
      dot.style.opacity    = visible ? "1" : "0";
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      const size             = hovering ? 56 : 32;
      ring.style.width       = size + "px";
      ring.style.height      = size + "px";
      ring.style.transform   = `translate(${rx - size / 2}px, ${ry - size / 2}px)`;
      ring.style.borderColor = hovering ? "hsl(16,100%,50%)" : "rgba(255,255,255,0.45)";
      ring.style.opacity     = visible ? (hovering ? "0.9" : "0.45") : "0";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout",  onOut,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout",  onOut);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed",top:0,left:0,width:8,height:8,borderRadius:"50%",
        background:"hsl(16,100%,50%)",pointerEvents:"none",zIndex:9999,
        opacity:0,willChange:"transform",mixBlendMode:"difference",
      }}/>
      <div ref={ringRef} style={{
        position:"fixed",top:0,left:0,width:32,height:32,borderRadius:"50%",
        border:"1.5px solid rgba(255,255,255,0.45)",pointerEvents:"none",zIndex:9998,
        opacity:0,willChange:"transform",mixBlendMode:"difference",
        transition:"width 0.22s cubic-bezier(0.22,1,0.36,1),height 0.22s cubic-bezier(0.22,1,0.36,1),border-color 0.18s ease",
      }}/>
    </>
  );
};

export default CustomCursor;
