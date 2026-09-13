import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const ClosingCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "black",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      {/* Swap this for your logo card per spec section 1. */}
      <div
        style={{
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: 2,
        }}
      >
        ONE SAID YES
      </div>
    </AbsoluteFill>
  );
};
