import { Composition } from "remotion";
import {
  COMP_NAME,
  defaultMyCompProps,
  defaultTravelMapProps,
  DURATION_IN_FRAMES,
  TRAVEL_MAP_COMP_NAME,
  TRAVEL_MAP_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";
import { TravelMap } from "./TravelMap/Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
      <Composition
        id={TRAVEL_MAP_COMP_NAME}
        component={TravelMap}
        durationInFrames={TRAVEL_MAP_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultTravelMapProps}
      />
    </>
  );
};
