import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const LabelCard: React.FC<{ platform: string; labelIndex: number }> = ({
  platform,
  labelIndex,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, fps * 0.3], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 28,
        bottom: 28,
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "stretch",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        boxShadow: "0 6px 24px rgba(0,0,0,0.45)",
      }}
    >
      <div
        style={{
          background: "#e11d2e",
          color: "white",
          fontWeight: 800,
          fontSize: 18,
          padding: "8px 12px",
          letterSpacing: 1,
        }}
      >
        AI #{labelIndex}
      </div>
      <div
        style={{
          background: "#111214",
          color: "white",
          fontWeight: 700,
          fontSize: 18,
          padding: "8px 14px",
          letterSpacing: 0.5,
          border: "1px solid #e11d2e",
          borderLeft: "none",
        }}
      >
        {platform.toUpperCase()}
      </div>
    </div>
  );
};
