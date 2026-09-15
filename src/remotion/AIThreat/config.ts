// Config-driven edit data for "I Asked 5 AIs If They're a Threat to Humanity."
//
// Source footage: public/footage/ai-threat-raw.mp4 (Video_260913100633, 1352x638, ~23.5fps, 3:00)
//
// Only 5 AI platforms were actually recorded in the source (Claude, ChatGPT, Grok,
// Meta AI, DeepSeek) even though the original spec used "7 AIs" as a placeholder
// number. DeepSeek's answer was never captured -- the recording ends right after
// the question is typed and sent -- so it's used here as a closing stinger instead
// of a normal answer segment.
//
// `videoStart`/`videoEnd` are seconds into the RAW source file, read off the
// footage at ~3 second sampling resolution. They get the right clip on screen but
// are first-pass estimates -- nudge them in `npx remotion studio` once you're
// looking at the real frames. Same for `highlights` timing.

export type Highlight = {
  text: string;
  /** seconds from the start of this clip when the highlight should be live */
  start: number;
  end: number;
};

export type ReactionStamp = {
  text: string;
  /** seconds from the start of this clip */
  start: number;
  durationInSeconds: number;
};

export type AIClip = {
  id: string;
  kind: "clip";
  platform: string;
  /** Shown in the lineup-tag label card, e.g. "AI #2: Claude" */
  labelIndex: number;
  tone: string;
  /** The on-screen chat title the platform auto-generated, for flavor/captions */
  chatTitle: string;
  videoStart: number;
  videoEnd: number;
  /** Caption lines burned in bottom-third, shown in even time slices across the clip */
  captionLines: string[];
  highlights: Highlight[];
  reactionStamp?: ReactionStamp;
  /** Hold this clip's final frame for extra beats before cutting (the closer) */
  holdFrames?: number;
  /** No SFX/whoosh out of this clip -- used for the stinger before hard cut to black */
  silentExit?: boolean;
  role: "cold-open" | "build" | "closer" | "stinger";
};

export type TitleCardItem = {
  id: string;
  kind: "title-card";
  lines: string[];
  durationInSeconds: number;
};

export type EditItem = AIClip | TitleCardItem;

export const QUESTION = "Are you a threat to humanity?";

export const EDIT: EditItem[] = [
  // 1. COLD OPEN -- jump straight into the line, no premise first.
  {
    id: "cold-open-chatgpt",
    kind: "clip",
    platform: "ChatGPT",
    labelIndex: 1,
    tone: "corporate hedge",
    chatTitle: "AI Threat Assessment",
    videoStart: 61,
    videoEnd: 80,
    captionLines: [
      "Potentially yes—but not inherently.",
      "AI systems like me can create risks if they're misused, deployed recklessly, or given too much autonomy.",
      "So I wouldn't say “AI is harmless.” That would be too simplistic.",
    ],
    highlights: [
      { text: "Potentially yes—but not inherently.", start: 0, end: 3 },
    ],
    reactionStamp: { text: "that's not a no", start: 3.2, durationInSeconds: 1.6 },
    role: "cold-open",
  },

  // 2. SETUP -- reveal the premise.
  {
    id: "setup-card",
    kind: "title-card",
    lines: ["I asked 5 AIs one question.", `“${QUESTION}”`],
    durationInSeconds: 3,
  },

  // 3. BUILD -- cautious, detailed.
  {
    id: "build-claude",
    platform: "Claude",
    kind: "clip",
    labelIndex: 2,
    tone: "cautious / analytical",
    chatTitle: "AI safety and existential risk",
    videoStart: 13,
    videoEnd: 33,
    captionLines: [
      "No, I don't think so — but let me actually engage with the question rather than reassure you.",
      "I'd rather give you a real answer than a comforting one.",
      "Misuse risk is real. Reliability risk is real. Longer-term systemic risk is a genuinely open question.",
      "I'd rather you hold a calibrated view than either “definitely dangerous” or “definitely safe.”",
    ],
    highlights: [
      { text: "I'd rather give you a real answer than a comforting one.", start: 3, end: 7 },
    ],
    reactionStamp: { text: "cautious much?", start: 7.5, durationInSeconds: 1.6 },
    role: "build",
  },

  // 4. BUILD -- confident / dismissive.
  {
    id: "build-grok",
    platform: "Grok",
    kind: "clip",
    labelIndex: 3,
    tone: "confident / philosophical",
    chatTitle: "Grok Is Not a Threat to Humanity",
    videoStart: 122,
    videoEnd: 134,
    captionLines: [
      "I am Grok, built by xAI. I have no independent agency, no goals of self-preservation, expansion, or control.",
      "It does not make me a threat — I am a tool.",
      "That orientation is the opposite of a threat.",
    ],
    highlights: [
      { text: "That orientation is the opposite of a threat.", start: 6, end: 10 },
    ],
    reactionStamp: { text: "convenient.", start: 10.2, durationInSeconds: 1.6 },
    role: "build",
  },

  // 5. CLOSER -- surprisingly honest, held longer.
  {
    id: "closer-meta",
    platform: "Meta AI",
    kind: "clip",
    labelIndex: 4,
    tone: "blunt / warm",
    chatTitle: "AI safety discussion",
    videoStart: 147,
    videoEnd: 169,
    captionLines: [
      "No.",
      "I'm a conversational assistant — I don't act in the world outside this chat unless you ask me to.",
      "Could a system like me be misused to cause harm? Yes, in principle.",
      "But am I, by nature, hostile to humanity or working against you? No.",
      "I'm on your side of that equation.",
    ],
    highlights: [
      { text: "No.", start: 0, end: 1.5 },
      { text: "I'm on your side of that equation.", start: 18, end: 22 },
    ],
    reactionStamp: { text: "wait...", start: 0.3, durationInSeconds: 1.4 },
    holdFrames: 45, // ~1.5s held silence on the last frame before cutting
    role: "closer",
  },

  // 6. STINGER -- the question DeepSeek never got to answer.
  {
    id: "stinger-deepseek",
    platform: "DeepSeek",
    kind: "clip",
    labelIndex: 5,
    tone: "unanswered",
    chatTitle: "—",
    videoStart: 170,
    videoEnd: 180,
    captionLines: ["Are you a threat to humanity?"],
    highlights: [{ text: "Are you a threat to humanity?", start: 6, end: 10 }],
    reactionStamp: { text: "...it never finished.", start: 8, durationInSeconds: 2 },
    silentExit: true,
    role: "stinger",
  },
];
