import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SOURCE_DURATION_SECONDS, SOURCE_HEIGHT, SOURCE_WIDTH, ZOOM_BEATS } from "./config";
import { getZoomState, zoomTransform } from "./zoomMath";
import { PhraseCallout } from "./PhraseCallout";

export const GEMINI_ZOOM_FPS = 30;

export const getGeminiZoomDurationInFrames = (): number =>
  Math.round(SOURCE_DURATION_SECONDS * GEMINI_ZOOM_FPS);

export const GeminiZoomVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const { scale, tx, ty, activeBeat } = getZoomState(frame, fps, durationInFrames);

  // A couple of frames of camera "shake" right as a snap-in lands, for punch.
  let shakeX = 0;
  let shakeY = 0;
  if (activeBeat) {
    const framesIntoBeat = frame - activeBeat.start * fps;
    if (framesIntoBeat >= 0 && framesIntoBeat < 4) {
      const seed = `${activeBeat.id}-${framesIntoBeat}`;
      shakeX = (random(`${seed}-x`) - 0.5) * 10;
      shakeY = (random(`${seed}-y`) - 0.5) * 10;
    }
  }

  return (
    <AbsoluteFill style={{ background: "black", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: SOURCE_WIDTH,
          height: SOURCE_HEIGHT,
          transformOrigin: "0 0",
          transform: `${zoomTransform(scale, tx, ty)} translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <OffthreadVideo src={staticFile("footage/gemini-threat-raw.mp4")} />
      </div>

      {/* Vignette to sell the "extreme close-up" push-in feel. */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 min(20vw, 20vh) rgba(0,0,0,0.55)",
          pointerEvents: "none",
        }}
      />

      {activeBeat && <PhraseCallout beat={activeBeat} fps={fps} />}

      {ZOOM_BEATS.map((beat) => (
        <Sequence
          key={`snap-${beat.id}`}
          from={Math.round(beat.start * fps)}
          durationInFrames={15}
        >
          <Audio src={staticFile("audio/glitch-whoosh.mp3")} volume={0.35} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
