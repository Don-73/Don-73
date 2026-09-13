import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { TravelMapProps } from "../../../types/constants";
import { CityPin } from "./CityPin";
import {
  haversineDistanceKm,
  projectToBox,
  quadraticBezierPoint,
} from "./geo";
import { Plane } from "./Plane";
import { FONT_STACK } from "./theme";

const fontFamily = FONT_STACK;

const MAP_BOX = { x: 140, y: 160, width: 1000, height: 400 };

const TRIP_START = 25;
const TRIP_END = 120;

export const TravelMap = ({ from, to }: z.infer<typeof TravelMapProps>) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const origin = projectToBox(from, MAP_BOX);
  const destination = projectToBox(to, MAP_BOX);

  const control = {
    x: (origin.x + destination.x) / 2,
    y: (origin.y + destination.y) / 2 - Math.abs(destination.x - origin.x) * 0.28,
  };

  const pathD = `M ${origin.x} ${origin.y} Q ${control.x} ${control.y} ${destination.x} ${destination.y}`;

  const titleProgress = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 20,
  });

  const originPinProgress = spring({
    fps,
    frame: frame - 8,
    config: { damping: 12, mass: 0.5 },
    durationInFrames: 20,
  });

  const destinationPinProgress = spring({
    fps,
    frame: frame - (TRIP_END - 8),
    config: { damping: 12, mass: 0.5 },
    durationInFrames: 20,
  });

  const tripProgress = interpolate(frame, [TRIP_START, TRIP_END], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const planePoint = quadraticBezierPoint(origin, control, destination, tripProgress);

  const planeOpacity = interpolate(
    frame,
    [TRIP_START - 2, TRIP_START + 3, TRIP_END - 6, TRIP_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const guideOpacity = interpolate(frame, [12, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const distanceKm = haversineDistanceKm(from, to);
  const distanceMiles = Math.round(distanceKm * 0.621371).toLocaleString();

  const distanceLabelProgress = spring({
    fps,
    frame: frame - (TRIP_END + 5),
    config: { damping: 200 },
    durationInFrames: 15,
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0b1220 0%, #101a2e 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleProgress,
          transform: `translateY(${(1 - titleProgress) * -16}px)`,
        }}
      >
        <h1
          style={{
            fontFamily,
            fontSize: 48,
            fontWeight: 700,
            color: "#fff",
            margin: 0,
          }}
        >
          {from.name} → {to.name}
        </h1>
      </div>

      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={2}
          strokeDasharray="4 10"
          strokeLinecap="round"
          opacity={guideOpacity}
        />
        <path
          d={pathD}
          fill="none"
          stroke="#5eead4"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - tripProgress}
          style={{ filter: "drop-shadow(0 0 6px rgba(94,234,212,0.8))" }}
        />

        <CityPin
          x={origin.x}
          y={origin.y}
          label={from.name}
          progress={originPinProgress}
          labelAbove={false}
        />
        <CityPin
          x={destination.x}
          y={destination.y}
          label={to.name}
          progress={destinationPinProgress}
          labelAbove={true}
        />

        <Plane
          x={planePoint.x}
          y={planePoint.y}
          angle={planePoint.angle}
          opacity={planeOpacity}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: distanceLabelProgress,
          transform: `translateY(${(1 - distanceLabelProgress) * 12}px)`,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 26,
            fontWeight: 700,
            color: "#5eead4",
            background: "rgba(255,255,255,0.06)",
            padding: "10px 24px",
            borderRadius: 999,
          }}
        >
          {distanceMiles} mi
        </span>
      </div>
    </AbsoluteFill>
  );
};
