export const Plane: React.FC<{
  x: number;
  y: number;
  angle: number;
  opacity: number;
}> = ({ x, y, angle, opacity }) => {
  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
        opacity,
      }}
    >
      <path
        d="M -14 0 L 8 -6 L 20 0 L 8 6 Z M 2 -3 L -6 -10 L -11 -10 L -3 -1 Z M 2 3 L -6 10 L -11 10 L -3 1 Z"
        fill="#fff"
        stroke="#0b1220"
        strokeWidth={0.75}
        strokeLinejoin="round"
      />
    </g>
  );
};
