import { random, useCurrentFrame } from "remotion";

/**
 * Cheap glitch flicker for the last few frames of a clip, standing in for the
 * "glitch/whoosh cut into the next clip" transition (spec section 2/3). The
 * whoosh SFX itself is placed globally in AIThreatVideo so its timing doesn't
 * depend on this component re-mounting.
 */
export const ExitGlitch: React.FC<{
  durationInFrames: number;
  transitionFrames: number;
}> = ({ durationInFrames, transitionFrames }) => {
  const frame = useCurrentFrame();
  const framesFromEnd = durationInFrames - frame;
  if (framesFromEnd > transitionFrames || framesFromEnd < 0) return null;

  const seed = Math.floor(frame / 2);
  const offset = (random(`glitch-${seed}`) - 0.5) * 24;
  const sliceY = random(`glitch-y-${seed}`) * 100;

  return (
    <div style={{ position: "absolute", inset: 0, mixBlendMode: "screen" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,0,60,0.18)",
          transform: `translateX(${offset}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,200,255,0.16)",
          transform: `translateX(${-offset}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${sliceY}%`,
          height: 6,
          background: "rgba(255,255,255,0.6)",
        }}
      />
    </div>
  );
};
