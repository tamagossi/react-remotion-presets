# Proposal Template — Conversational Format

This file defines the exact format for presenting audit findings to the user. Every finding becomes a conversational item with an approve/deny/modify action.

## Core Format

```
[SEVERITY_EMOJI] [SEVERITY_LABEL]: [Short Finding Title]
  Current:  "[What's there now — 1 sentence]"
  Proposed: "[What to change — concrete, with values]"
  Rationale: "[Why this improves quality — reference design principle]"
  👉 [Approve] | [Deny] | [Modify: describe your preferred approach]
```

## Severity Levels

| Label | Emoji | Meaning | When Used |
|---|---|---|---|
| CRITICAL | 🔴 | Broken/missing — degrades output quality | Missing exit, unreadable text, broken contrast, font not loaded |
| ENHANCEMENT | 🟡 | Working but not professional | Wrong easing, missing stagger, too fast/slow, no willChange |
| POLISH | 🟢 | Subtle refinement — the final 10% | Shadow depth, grain amount, secondary motion, gradient refinement |
| REFACTOR | 🔵 | Code quality — doesn't change visuals | Unused imports, ordering, missing schema, type improvements |

## Examples

### Critical Example

```
🔴 CRITICAL: Missing exit animation — elements vanish at last frame
  Current:  "Characters appear with blur-reveal but snap to opacity 0 on frame 150 
             with no transition"
  Proposed: "Add exitDuration prop (default 25). At frame [exitStart, exitEnd], stagger 
             each char's opacity 1→0 and scale 1→0.9 with Easing.in(Easing.quad). 
             Reverse the entry stagger order so first-char-in is last-char-out."
  Rationale: "Every preset must have a designed exit per animation principles rule #3 
              (Follow Through). Abrupt disappearance looks like a render error. 
              ExitDuration gives users control for sequencing."
  👉 [Approve] | [Deny] | [Modify: ...]
```

### Enhancement Example

```
🟡 ENHANCEMENT: Entry uses linear easing — feels robotic
  Current:  "Bar chart bars animate from height 0 to full height with no easing 
             parameter in interpolate()"
  Proposed: "Add easing prop (default Easing.out(Easing.back(1.2))). Apply to 
             height interpolation. Back easing gives bars that satisfying overshoot 
             and settle feel."
  Rationale: "Linear easing violates animation principle #6 (Slow In and Slow Out). 
              Back easing gives bars physical weight — they hit their target with 
              energy then settle. Much more professional feel."
  👉 [Approve] | [Deny] | [Modify: use Easing.out(Easing.quad) instead]
```

### Polish Example

```
🟢 POLISH: Shadow feels disconnected from animated text
  Current:  "textShadow at static offset (4px, 4px) while text scales from 0.85 to 1.0"
  Proposed: "Animate textShadow offset proportionally to scale. At scale 0.85 → 
             offset (3px, 3px). At scale 1.0 → offset (8px, 8px). Use same easing 
             as text scale."
  Rationale: "Animation principle #11 (Solid Drawing): shadows imply height. A 
              scaling element should have a shadow that shrinks when the element 
              is small and grows when it's big. This creates spatial awareness."
  👉 [Approve] | [Deny] | [Modify: ...]
```

### Refactor Example

```
🔵 REFACTOR: Unused import and alphabetical ordering violation
  Current:  "Imports `Easing` from 'remotion' but only uses `spring`. Props in 
             interface are not alphabetically sorted."
  Proposed: "Remove unused `Easing` import. Reorder interface props alphabetically: 
             animationDuration, blurAmount, easing, exitDuration, fontFamily, 
             fontSize, fontWeight, ..."
  Rationale: "ESLint unused-imports rule fails build. Alphabetical ordering is 
             a mandatory project convention (perfectionist/sort-interfaces)."
  👉 [Approve] | [Deny] | [Modify: ...]
```

## Grouping Rules

Findings must be presented in this order:

1. 🔴 CRITICAL first (sorted by impact, highest first)
2. 🟡 ENHANCEMENT second (sorted by impact)
3. 🟢 POLISH third (sorted by impact)
4. 🔵 REFACTOR last (sorted by category: imports, ordering, types, exports)

Within each severity group, bundle related findings. Example:

```
🔴 CRITICAL: Exit handling issues (2 findings)
  Finding 1: Missing exit animation for title text
  Finding 2: Accent line exit staggers before text — reversed
```

## Batch Approval Rules

User can approve per-item, per-batch, or all. Accept:

- `approve 1` — approve finding #1
- `approve 1,3,5` — approve those items
- `approve all Critical` — approve all 🔴 items
- `approve all` — approve everything
- `deny 2` — skip finding #2
- `modify 4: use 15 frames instead of 20` — modify finding #4

If user approves a batch, execute ALL items in that batch. Don't re-ask.

## Post-Approval Format

After approval, present a concise execution summary:

```
Applying 4 changes:
  1. ✅ Added exit animation (15 lines in MyTitle.tsx)
  2. ✅ Changed easing to Easing.out(Easing.quad)
  3. ✅ Added willChange to animated elements
  4. ✅ Fixed alphabetical ordering

Running lint... ✅ Passed
```

## No Findings Case

If the preset is exceptional and has no meaningful issues:

```
🎉 No issues found. This preset meets professional quality standards.

Minor observations (no action needed):
  - Consider adding a grainOverlay background variant option for dark mode
  - The easing choice [0.22, 1, 0.36, 1] is excellent for the mood
  
If you'd like me to suggest creative variations on this preset, let me know.
```
