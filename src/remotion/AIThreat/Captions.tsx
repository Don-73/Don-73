import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Bottom-third burned-in caption, cycling through `lines` in even slices
 * across the clip's duration. Stands in for auto-captions synced to the
 * on-screen AI text (spec section 4) until real ASR captions are dropped in.
 */
export const Captions: React.FC<{
  lines: string[];
  durationInFrames: number;
}> = ({ lines, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (lines.length === 0) return null;

  const perLine = durationInFrames / lines.length;
  const index = Math.min(lines.length - 1, Math.floor(frame / perLine));
  const localFrame = frame - index * perLine;

  const opacity = interpolate(
    localFrame,
    [0, fps * 0.15, perLine - fps * 0.15, perLine],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: "6%",
        right: "6%",
        bottom: "10%",
        textAlign: "center",
        opacity,
      }}
    >
      <span
        style={{
          background: "rgba(0,0,0,0.72)",
          color: "white",
          fontWeight: 700,
          fontSize: 22,
          lineHeight: 1.4,
          padding: "8px 16px",
          borderRadius: 6,
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
      >
        {lines[index]}
      </span>
    </div>
  );
};
