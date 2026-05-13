const LABEL_MAP: Record<string, string> = {
  Colors: "Tone",
};

/**
 * Maps raw skin-treat category labels to user-facing copy.
 * For example, "Colors" is renamed to "Tone" so the UI stays consistent
 * across tabs, toolbars, and search placeholders.
 */
export function mapSkinTreatLabel(label: string): string {
  return LABEL_MAP[label] ?? label;
}
