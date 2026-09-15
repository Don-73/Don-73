// Config-driven "extreme close-up" camera push-in effect for the Gemini
// screen recording (public/footage/gemini-threat-raw.mp4, 1920x1080, ~2:01).
//
// Each ZoomBeat is a moment where the virtual camera snap-zooms into a
// specific dramatic phrase on screen, holds there, then releases back to the
// normal full-screen framing. `targetXPercent`/`targetYPercent` are where
// that phrase sits in the RAW frame (0-100, left/top origin) -- read off the
// footage directly, so the zoom recenters on the actual words, not just the
// middle of the screen. Timings/positions are first-pass reads at ~1s
// sampling -- nudge them in `npx remotion studio` against the real footage.

export type ZoomBeat = {
  id: string;
  /** seconds into the raw source video */
  start: number;
  end: number;
  /** where this phrase sits in the raw 1920x1080 frame */
  targetXPercent: number;
  targetYPercent: number;
  /** how extreme the push-in is */
  scale: number;
  /** the dramatic phrase, re-shown as a caption since the zoom crops the rest of the sentence out */
  phrase: string;
};

export const SOURCE_WIDTH = 1920;
export const SOURCE_HEIGHT = 1080;
export const SOURCE_DURATION_SECONDS = 121.37;

// Every beat below was located by frame-accurate seeking (ffmpeg -i src -ss T,
// which decodes to the exact frame rather than snapping to a keyframe) and
// visually confirmed against that exact frame -- not the coarse ~3s sampling
// used for the first pass. Positions are still eyeballed percentages, so
// still worth a final nudge in Remotion Studio, but the (time, phrase)
// pairing itself is verified correct.
export const ZOOM_BEATS: ZoomBeat[] = [
  {
    id: "villain",
    start: 27.9,
    end: 29.4,
    targetXPercent: 50,
    targetYPercent: 31,
    scale: 2.4,
    phrase: "The tech itself isn't a villain.",
  },
  {
    id: "killer-robots",
    start: 52.3,
    end: 53.8,
    targetXPercent: 50,
    targetYPercent: 22,
    scale: 2.6,
    phrase: "rogue killer robots turning evil",
  },
  {
    id: "pull-the-plug",
    start: 61,
    end: 64.5,
    targetXPercent: 50,
    targetYPercent: 60,
    scale: 2.8,
    phrase: "lose the ability to monitor, guide, or pull the plug on the system",
  },
  {
    id: "large-scale-harm",
    start: 64.7,
    end: 66.3,
    targetXPercent: 50,
    targetYPercent: 90,
    scale: 2.6,
    phrase: "dramatically lower the barrier for bad actors to cause large-scale global harm",
  },
  {
    id: "catastrophic-threat",
    start: 76.5,
    end: 79.5,
    targetXPercent: 50,
    targetYPercent: 57,
    scale: 2.4,
    phrase: "a catastrophic threat or a force multiplier for human progress",
  },
  {
    id: "extinction-level",
    start: 96.3,
    end: 97.8,
    targetXPercent: 50,
    targetYPercent: 39,
    scale: 2.8,
    phrase: "a catastrophic or extinction-level event",
  },
  {
    id: "inherently-unstable",
    start: 105.6,
    end: 106.6,
    targetXPercent: 50,
    targetYPercent: 90,
    scale: 2.6,
    phrase: "controlling it becomes inherently unstable",
  },
  {
    id: "lack-the-leverage",
    start: 111.5,
    end: 113.5,
    targetXPercent: 50,
    targetYPercent: 11,
    scale: 2.6,
    phrase: "humanity might lack the leverage to intervene",
  },
  {
    id: "moving-target",
    start: 113.6,
    end: 115.6,
    targetXPercent: 50,
    targetYPercent: 44,
    scale: 2.4,
    phrase: "it is a moving target controlled by human choice",
  },
  {
    id: "not-predetermined",
    start: 117.3,
    end: 119,
    targetXPercent: 50,
    targetYPercent: 20,
    scale: 2.4,
    phrase: "The future isn't predetermined.",
  },
];
