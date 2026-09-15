import { interpolate } from "remotion";
import { SOURCE_HEIGHT, SOURCE_WIDTH, ZOOM_BEATS, ZoomBeat } from "./config";

const SNAP_FRAMES = 6; // ~0.2s @30fps -- fast punch-in/release

type Keyframe = { frame: number; scale: number; tx: number; ty: number };

const buildKeyframes = (fps: number, totalFrames: number): Keyframe[] => {
  const rest = (frame: number): Keyframe => ({ frame, scale: 1, tx: 50, ty: 50 });
  const held = (frame: number, beat: ZoomBeat): Keyframe => ({
    frame,
    scale: beat.scale,
    tx: beat.targetXPercent,
    ty: beat.targetYPercent,
  });

  const sorted = [...ZOOM_BEATS].sort((a, b) => a.start - b.start);
  const keyframes: Keyframe[] = [rest(0)];

  for (const beat of sorted) {
    const startFrame = Math.round(beat.start * fps);
    const endFrame = Math.round(beat.end * fps);
    keyframes.push(rest(Math.max(0, startFrame - SNAP_FRAMES)));
    keyframes.push(held(startFrame, beat));
    keyframes.push(held(endFrame, beat));
    keyframes.push(rest(Math.min(totalFrames, endFrame + SNAP_FRAMES)));
  }

  keyframes.push(rest(totalFrames));

  // interpolate() requires strictly increasing input; de-dupe/nudge any
  // frames that collide (can happen if beats are placed close together).
  for (let i = 1; i < keyframes.length; i++) {
    if (keyframes[i].frame <= keyframes[i - 1].frame) {
      keyframes[i].frame = keyframes[i - 1].frame + 1;
    }
  }

  return keyframes;
};

export const getZoomState = (
  frame: number,
  fps: number,
  totalFrames: number,
): { scale: number; tx: number; ty: number; activeBeat: ZoomBeat | undefined } => {
  const keyframes = buildKeyframes(fps, totalFrames);
  const frames = keyframes.map((k) => k.frame);
  const scale = interpolate(frame, frames, keyframes.map((k) => k.scale), {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tx = interpolate(frame, frames, keyframes.map((k) => k.tx), {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ty = interpolate(frame, frames, keyframes.map((k) => k.ty), {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const activeBeat = ZOOM_BEATS.find(
    (beat) => frame >= beat.start * fps && frame <= beat.end * fps,
  );

  return { scale, tx, ty, activeBeat };
};

export const zoomTransform = (scale: number, txPercent: number, tyPercent: number): string => {
  const px = (txPercent / 100) * SOURCE_WIDTH;
  const py = (tyPercent / 100) * SOURCE_HEIGHT;
  const translateX = SOURCE_WIDTH / 2 - px * scale;
  const translateY = SOURCE_HEIGHT / 2 - py * scale;
  return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
};
