import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Highlight } from "./config";

/**
 * The bold yellow-highlight "most quotable phrase" callout, per spec section 2.
 * Timed against `highlight.start`/`highlight.end` (seconds relative to clip start).
 */
export const HighlightCallout: React.FC<{ highlight: Highlight | undefined }> = ({
  highlight,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!highlight) return null;

  const startFrame = highlight.start * fps;
  const endFrame = highlight.end * fps;
  if (frame < startFrame || frame > endFrame) return null;

  const relative = frame - startFrame;
  const scale = interpolate(relative, [0, fps * 0.15], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fps * 0.1, endFrame - fps * 0.15, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        maxWidth: "78%",
        textAlign: "center",
      }}
    >
      <span
        style={{
          background: "#fde047",
          color: "#111214",
          fontWeight: 800,
          fontSize: 30,
          lineHeight: 1.25,
          padding: "6px 14px",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textTransform: "none",
        }}
      >
        {highlight.text}
      </span>
    </div>
  );
};
