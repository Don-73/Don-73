import {
  AbsoluteFill,
  Freeze,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { AIClip } from "./config";
import { LabelCard } from "./LabelCard";
import { Captions } from "./Captions";
import { HighlightCallout } from "./HighlightCallout";
import { ReactionStamp } from "./ReactionStamp";
import { ExitGlitch } from "./ExitGlitch";

const TRANSITION_FRAMES = 8;

const ClipBody: React.FC<{ clip: AIClip; naturalFrames: number }> = ({
  clip,
  naturalFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow keyframed punch-in zoom, centered on the response-text area rather
  // than the whole screen (spec section 2).
  const scale = interpolate(frame, [0, naturalFrames], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const activeHighlight = clip.highlights.find((h) => {
    const startFrame = h.start * fps;
    const endFrame = h.end * fps;
    return frame >= startFrame && frame <= endFrame;
  });

  return (
    <AbsoluteFill style={{ background: "black", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale})`,
          transformOrigin: "50% 62%",
        }}
      >
        <OffthreadVideo
          src={staticFile("footage/ai-threat-raw.mp4")}
          startFrom={Math.round(clip.videoStart * fps)}
          endAt={Math.round(clip.videoEnd * fps)}
        />
      </div>
      <LabelCard platform={clip.platform} labelIndex={clip.labelIndex} />
      <Captions lines={clip.captionLines} durationInFrames={naturalFrames} />
      <HighlightCallout highlight={activeHighlight} />
      <ReactionStamp stamp={clip.reactionStamp} />
      {!clip.silentExit && (
        <ExitGlitch
          durationInFrames={naturalFrames}
          transitionFrames={TRANSITION_FRAMES}
        />
      )}
    </AbsoluteFill>
  );
};

export const AIClipSegment: React.FC<{ clip: AIClip }> = ({ clip }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const naturalFrames = Math.round((clip.videoEnd - clip.videoStart) * fps);

  if (!clip.holdFrames) {
    return <ClipBody clip={clip} naturalFrames={naturalFrames} />;
  }

  // Hold the closer's last frame for a beat (the spec's 1-2s of held silence
  // before the hard cut) instead of just looping/ending the video abruptly.
  return (
    <Freeze frame={Math.min(frame, naturalFrames - 1)}>
      <ClipBody clip={clip} naturalFrames={naturalFrames} />
    </Freeze>
  );
};

export { TRANSITION_FRAMES };
