# Catalog Update

How to read, append, and maintain preset entries in the centralized preset catalog skill file.

## Catalog Location

Single centralized catalog: `.opencode/skills/preset-catalog/SKILL.md`

This replaces the previous per-category `CATALOG.md` files. All preset metadata, triggers, persona, and selection guidance lives in one file.

## Reading Existing Catalog

Before adding new preset:

1. Read `.opencode/skills/preset-catalog/SKILL.md` (entire file)
2. Note existing presets in the target category, their metadata, trigger patterns
3. Find the correct category section (`### Backgrounds`, `### Texts`, `### Data Visualizations`, `### Lists`, `### Lower Thirds`, `### Misc`)
4. Ensure new preset name doesn't conflict
5. Match formatting style exactly

## Entry Schema

Append new preset entry within the appropriate category section with this exact structure:

```markdown
#### [PresetName]
- **Tone**: [comma-separated mood adjectives]
- **Condition**: [1-2 sentences describing ideal use context]
- **NotWhen**: [situations where this preset should NOT be used]
- **Persona**: [1-line creative persona embodying the aesthetic]
- **Trigger**: [space-separated trigger phrases in quotes]
- **Props**: [comma-separated list of key configurable props]
```

### Field Guidelines

**Tone:** 3-7 adjectives capturing the emotional quality. Be precise and evocative.

**Condition:** Describe the video context, audience, and intent. Be specific about the type of content this works for.

**NotWhen:** As important as Condition — prevents wrong usage. List script types, tones, or technical constraints where this preset fails.

**Persona:** Creative role identity. Pattern: "[Role]" — "[what they do, aesthetic philosophy]". One sentence.

**Trigger:** Keywords and phrases that auto-match this preset. Use exact user language patterns. Quote each trigger phrase. Include variations users might say.

**Props:** Comma-separated, alphabetized. Use backtick formatting for prop names. List the most important/unique props users will configure.

### Trigger Pattern Best Practices

Triggers should cover all common phrasings a user might use:

```markdown
- **Trigger**: "shadowing practice" "language learning" "pronunciation drill" "listen and repeat" "english shadowing" "engineering english" "professional english" "british RP" "describe your role in english" "engineering interview" "english speaking practice" "introduce yourself engineer" "workplace english" "remote job english" "engineering vocabulary" "english shadowing drill" "karaoke overlay"
```

Include: primary terms, variations, related concepts, and domain-specific language.

## Preset Catalog Structure

The catalog has this layout:

```
# preset-catalog

## Selection Workflow
## Quick Selection Matrix
  ### Backgrounds (table)
  ### Texts (table)
  ### Data Visualizations (table)
  ### Lists (table)
  ### Lower Thirds (table)
  ### Misc (table)

## Presets
  ### Backgrounds
    #### PresetName
    ...
  ### Texts
    #### PresetName
    ...
  ### Data Visualizations
    ...
  ### Lists
    ...
  ### Lower Thirds
    ...
  ### Misc
    ...

## Import Paths (table)
```

## Update Algorithm

When creating new preset:

1. Read `.opencode/skills/preset-catalog/SKILL.md`
2. If target category section doesn't exist, create it following the structure above
3. Add row to Quick Selection Matrix table for the category
4. Append new preset entry at end of the category's `####` entries
5. Add entry to the appropriate `### Category` section
6. Update Import Paths table if new category
7. If new category, update `categories.md` and `AGENTS.md`/`CLAUDE.md`

## Quick Selection Matrix Row

Add a row to the appropriate category's table:

```markdown
| [Tone] | [Mood] | [Energy] | [Color] | [Formal] | `[PresetName]` |
```

Match existing table format exactly. If multiple rows for different contexts, add them all.

## Context Naming Convention

Use kebab-case for context descriptors in the Condition/NotWhen fields:

- `corporate/formal`
- `tech/futuristic`
- `playful/creative`
- `nightlife/entertainment`
- `educational/instructional`
- `emotional/warm`
- `luxury/premium`
- `energetic/sporty`
- `calm/wellness`
- `engineering/professional`
- `language-learning`
- `shadowing/pronunciation`

Add new contexts as needed. Be descriptive.

## Example Complete Entry

```markdown
#### ShadowingScene
- **Tone**: focused calm motivating structured instructional
- **Condition**: language learning listen-and-repeat, pronunciation drills, echo repetition exercises, karaoke sing-alongs, engineering English practice, professional English shadowing, meditative mantras
- **NotWhen**: all-at-once text reveals (use text preset), non-audio contexts where progress bar is meaningless, static content without voiceover
- **Persona**: Language education designer — staggered word reveal, mic pulse with scale breathing, echo trails, waveform bars, phonetic guides
- **Trigger**: "shadowing practice" "language learning" "pronunciation drill" "listen and repeat" "english shadowing" "engineering english" "professional english" "british RP" "describe your role in english" "engineering interview" "english speaking practice" "introduce yourself engineer" "workplace english" "remote job english" "karaoke overlay"
- **Props**: `accentColor, audioSrc, durationInFrames, echoCount, enablePhonetics, enableWaveform, idleColor, micIconUrl, phrase, phraseIndex, phraseTotal, pronunciations, pulseNotSpeakingColor, pulseSpeakingColor, rippleStyle, sceneTitle, voDurationInFrames, waveformBars`
```

## Catalog Maintenance

- Update trigger phrases as new user language patterns emerge
- Add new contexts when new use cases discovered
- If preset props change, sync the **Props** field
- Remove deprecated presets (move to a `### Deprecated` section)
- Keep Quick Selection Matrix and detailed entries in sync — a preset in the matrix must have a detailed entry

## Auto-Load Triggers

The preset-catalog skill's auto-load keywords live in the AGENTS.md and the skill's own metadata. When adding presets for new domains, update these locations:

1. `.opencode/skills/preset-catalog/SKILL.md` header auto-load description
2. `AGENTS.md` `## Preset Catalog Skill` section
3. `CLAUDE.md` corresponding section
