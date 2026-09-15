import { Composition } from "remotion";
import {
  AI_THREAT_COMP_NAME,
  AI_THREAT_HEIGHT,
  AI_THREAT_WIDTH,
  COMP_NAME,
  defaultMyCompProps,
  defaultTravelMapProps,
  DURATION_IN_FRAMES,
  GEMINI_ZOOM_COMP_NAME,
  GEMINI_ZOOM_HEIGHT,
  GEMINI_ZOOM_WIDTH,
  TRAVEL_MAP_COMP_NAME,
  TRAVEL_MAP_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import {
  AIThreatVideo,
  AI_THREAT_FPS,
  getAIThreatDurationInFrames,
} from "./AIThreat/AIThreatVideo";
import {
  GeminiZoomVideo,
  GEMINI_ZOOM_FPS,
  getGeminiZoomDurationInFrames,
} from "./GeminiZoom/GeminiZoomVideo";
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
      <Composition
        id={AI_THREAT_COMP_NAME}
        component={AIThreatVideo}
        durationInFrames={getAIThreatDurationInFrames()}
        fps={AI_THREAT_FPS}
        width={AI_THREAT_WIDTH}
        height={AI_THREAT_HEIGHT}
      />
      <Composition
        id={GEMINI_ZOOM_COMP_NAME}
        component={GeminiZoomVideo}
        durationInFrames={getGeminiZoomDurationInFrames()}
        fps={GEMINI_ZOOM_FPS}
        width={GEMINI_ZOOM_WIDTH}
        height={GEMINI_ZOOM_HEIGHT}
      />
    </>
  );
};
