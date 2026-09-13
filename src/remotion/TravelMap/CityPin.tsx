import { FONT_STACK } from "./theme";

export const CityPin: React.FC<{
  x: number;
  y: number;
  label: string;
  progress: number;
  labelAbove: boolean;
}> = ({ x, y, label, progress, labelAbove }) => {
  const scale = progress;
  const ringScale = 1 + progress * 1.8;
  const ringOpacity = (1 - progress) * 0.5;

  return (
    <g style={{ opacity: progress }}>
      <circle
        cx={x}
        cy={y}
        r={10 * ringScale}
        fill="none"
        stroke="#5eead4"
        strokeWidth={1.5}
        opacity={ringOpacity}
      />
      <circle
        cx={x}
        cy={y}
        r={7 * scale}
        fill="#5eead4"
        stroke="#0b1220"
        strokeWidth={2}
      />
      <text
        x={x}
        y={labelAbove ? y - 20 : y + 32}
        textAnchor="middle"
        fill="#fff"
        fontSize={22}
        fontWeight={700}
        style={{
          fontFamily: FONT_STACK,
          transform: `translateY(${(1 - progress) * 8}px)`,
        }}
      >
        {label}
      </text>
    </g>
  );
};
