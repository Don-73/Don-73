import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const TitleCard: React.FC<{ lines: string[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, fps * 0.25, fps * 2.6, fps * 3],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: "black",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center", padding: "0 8%" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: i === 0 ? 500 : 800,
              fontSize: i === 0 ? 30 : 42,
              lineHeight: 1.4,
              marginTop: i === 0 ? 0 : 14,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
