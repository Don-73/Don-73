import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { EDIT, EditItem } from "./config";
import { AIClipSegment, TRANSITION_FRAMES } from "./AIClipSegment";
import { TitleCard } from "./TitleCard";
import { ClosingCard } from "./ClosingCard";

const CLOSING_CARD_SECONDS = 2;

const itemDurationInFrames = (item: EditItem, fps: number): number => {
  if (item.kind === "title-card") {
    return Math.round(item.durationInSeconds * fps);
  }
  const natural = Math.round((item.videoEnd - item.videoStart) * fps);
  return natural + (item.holdFrames ?? 0);
};

export const AI_THREAT_FPS = 30;

export const getAIThreatDurationInFrames = (): number => {
  const bodyFrames = EDIT.reduce(
    (total, item) => total + itemDurationInFrames(item, AI_THREAT_FPS),
    0,
  );
  return bodyFrames + CLOSING_CARD_SECONDS * AI_THREAT_FPS;
};

export const AIThreatVideo: React.FC = () => {
  const fps = AI_THREAT_FPS;

  let cursor = 0;
  const placed = EDIT.map((item) => {
    const duration = itemDurationInFrames(item, fps);
    const from = cursor;
    cursor += duration;
    return { item, from, duration };
  });

  const totalBodyFrames = cursor;

  return (
    <AbsoluteFill style={{ background: "black" }}>
      {/* Global tension/heartbeat bed, very quiet, runs under the whole edit
          (spec section 3). Swap public/audio/tension-bed.mp3 for real music --
          this is a synthesized placeholder so the project runs out of the box. */}
      <Audio src={staticFile("audio/tension-bed.mp3")} volume={0.12} />

      {placed.map(({ item, from, duration }) => (
        <Sequence key={item.id} from={from} durationInFrames={duration}>
          {item.kind === "title-card" ? (
            <TitleCard lines={item.lines} />
          ) : (
            <AIClipSegment clip={item} />
          )}
        </Sequence>
      ))}

      {/* Glitch/whoosh cut out of every AI clip that isn't the silent stinger
          (spec section 2/3) -- placed globally so timing doesn't depend on
          each clip's own frame counter. */}
      {placed
        .filter(({ item }) => item.kind === "clip" && !item.silentExit)
        .map(({ item, from, duration }) => (
          <Sequence
            key={`whoosh-${item.id}`}
            from={from + duration - TRANSITION_FRAMES}
            durationInFrames={TRANSITION_FRAMES + 4}
          >
            <Audio src={staticFile("audio/glitch-whoosh.mp3")} volume={0.7} />
          </Sequence>
        ))}

      <Sequence from={totalBodyFrames} durationInFrames={CLOSING_CARD_SECONDS * fps}>
        <ClosingCard />
      </Sequence>
    </AbsoluteFill>
  );
};
