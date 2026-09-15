import { interpolate, useCurrentFrame } from "remotion";
import type { ZoomBeat } from "./config";

/**
 * Re-shows the targeted phrase as a bold caption while the camera is
 * punched in on it, since the extreme close-up crops the rest of the
 * sentence out of frame.
 */
export const PhraseCallout: React.FC<{ beat: ZoomBeat; fps: number }> = ({ beat, fps }) => {
  const frame = useCurrentFrame();
  const startFrame = beat.start * fps;
  const endFrame = beat.end * fps;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fps * 0.15, endFrame - fps * 0.15, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const translateY = interpolate(frame, [startFrame, startFrame + fps * 0.15], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "6%",
        right: "6%",
        bottom: "8%",
        textAlign: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <span
        style={{
          display: "inline-block",
          background: "#fde047",
          color: "#111214",
          fontWeight: 800,
          fontSize: 30,
          lineHeight: 1.3,
          padding: "8px 18px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
      >
        {beat.phrase}
      </span>
    </div>
  );
};
