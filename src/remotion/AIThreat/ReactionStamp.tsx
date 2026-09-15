import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { ReactionStamp as ReactionStampType } from "./config";

export const ReactionStamp: React.FC<{ stamp: ReactionStampType | undefined }> = ({
  stamp,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!stamp) return null;

  const startFrame = stamp.start * fps;
  const endFrame = startFrame + stamp.durationInSeconds * fps;
  if (frame < startFrame || frame > endFrame) return null;

  const relative = frame - startFrame;
  const scale = interpolate(relative, [0, fps * 0.12], [0.6, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const settle = interpolate(relative, [fps * 0.12, fps * 0.2], [1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fps * 0.08, endFrame - fps * 0.1, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 34,
        right: 34,
        opacity,
        transform: `rotate(-6deg) scale(${scale * settle})`,
      }}
    >
      <span
        style={{
          display: "inline-block",
          background: "white",
          color: "#111214",
          fontWeight: 800,
          fontSize: 26,
          padding: "6px 16px",
          borderRadius: 4,
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
        }}
      >
        {stamp.text}
      </span>
    </div>
  );
};
