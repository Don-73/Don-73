import { z } from "zod";
export const COMP_NAME = "MyComp";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Next.js and Remotion",
};

export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

export const TRAVEL_MAP_COMP_NAME = "TravelMap";

const CityCoord = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
});

export const TravelMapProps = z.object({
  from: CityCoord,
  to: CityCoord,
});

export const defaultTravelMapProps: z.infer<typeof TravelMapProps> = {
  from: { name: "Las Vegas", lat: 36.17, lon: -115.14 },
  to: { name: "New York", lat: 40.71, lon: -74.0 },
};

export const TRAVEL_MAP_DURATION_IN_FRAMES = 150;
