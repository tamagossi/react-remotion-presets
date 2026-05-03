# Execution Guide — Safe Editing Procedures

How to apply approved refinements safely and verifiably.

## Pre-Execution Checklist

Before touching any file:

1. [ ] User has explicitly approved the specific item(s) to execute
2. [ ] You have re-read every file that will be modified (do NOT rely on memory)
3. [ ] You understand the full scope of each change
4. [ ] You have identified all files that will be touched

## Editing Rules

### Rule 1: Read Before Edit

Always re-read a file immediately before editing it, even if you read it during audit. The file may have changed, or your memory may be stale.

### Rule 2: Minimal Diffs

Make the smallest possible change to achieve the goal. Don't reorder unrelated things. Don't refactor adjacent code. Stay focused on the approved items.

Exception: if fixing an alphabetical ordering issue, reorder the entire interface/props as needed — this is technically a large diff but functionally minimal.

### Rule 3: One File Group at a Time

If changes span multiple files, group them logically:

- Schema + Component: edit both together (schema must match component)
- Component + Composition: edit component first, then update composition defaults if needed
- Component + Root.tsx: edit component first, then register if needed

### Rule 4: Preserve Backward Compatibility

Unless the user explicitly approves a breaking change:

- Add new props with sensible defaults (not required)
- Don't remove existing props
- Don't rename props (add the new one, deprecate the old via comment)
- Don't change default values unless the current ones produce bad output

### Rule 5: Never Commit

This skill NEVER commits changes. The user decides when to commit.

## Post-Edit Verification

### Step 1: Consistency Check

After editing, verify:

- [ ] Component file: props destructured match interface
- [ ] Schema file: schema matches interface (same names, types, defaults)
- [ ] Composition file: defaultProps match new defaults
- [ ] CATALOG.md: entry reflects changes (if visual behavior changed)
- [ ] Barrel export: component still included

### Step 2: Lint Check

Run immediately after all edits:

```bash
npm run lint
```

If lint fails:
1. Read the error output
2. Fix the issues
3. Re-run lint
4. Repeat until clean

Do NOT proceed to diff summary until lint passes.

### Step 3: Diff Summary

Present a clean summary of what changed:

```
Changes applied to 2 files:

src/shared/presets/texts/BlurRevealText.tsx:
  + Added exitDuration prop (line 12)
  + Added exit animation block (lines 93-115)
  ~ Changed blend easing from linear to Easing.out(Easing.quad) (line 72)
  ~ Reordered interface properties alphabetically (lines 6-22)

src/shared/presets/texts/schemas/BlurRevealTextSchema.ts:
  + Added exitDuration to schema (line 15)

Lint: ✅ Passed
```

## Common Edit Patterns

### Adding Exit Animation

```tsx
// 1. Add prop
exitDuration?: number;

// 2. Add exit timing calculations
const exitStart = startFrame + animationDuration + holdDuration;
const exitEnd = exitStart + exitDuration;

// 3. Add exit interpolation
const exitOpacity = interpolate(frame, [exitStart, exitEnd], [1, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.in(Easing.quad),
});

// 4. Apply to elements
// For container:
opacity: exitOpacity
// For individual items, stagger:
const itemExitStart = exitStart + i * exitStagger;
```

### Adding willChange

```tsx
// Before:
style={{ opacity, transform: `scale(${s})` }}

// After:
style={{ opacity, transform: `scale(${s})`, willChange: "opacity, transform" }}
```

Only include properties that actually animate. If only opacity changes, don't include `"transform"`.

### Fixing Alphabetical Order

Sort interface properties, exports, and JSX props alphabetically. Use existing files in the same category as reference for the exact ordering convention.

### Adding Easing Prop

```tsx
// Add to props:
easing?: [number, number, number, number];

// Default:
easing = [0.22, 1, 0.36, 1], // Apple-style

// Apply:
const value = interpolate(frame, [0, 30], [0, 1], {
  easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

## Handling Edge Cases

### Conflicting Changes

If two approved items conflict (e.g., one says add `exitDuration` prop, another says remove all timing props), flag the conflict to the user before executing either. Don't guess.

### User Asks for Variation

If the user says "do X but use Y instead", honor that. The user's modified instruction overrides the original proposal.

### Lint Reveals Pre-Existing Issues

If lint fails due to a pre-existing issue in a different file, note it but don't fix it unless the user asks. Focus on making your changes lint-clean.

### Schema Generation

If adding new props to a component, also add them to the Zod schema file. Follow the existing schema patterns in the same category.

## Rollback

If a change doesn't work or the user doesn't like it:

1. Note what was changed
2. Use `git diff` to see the exact changes
3. Revert specific hunks or the entire file
4. Re-run lint to verify clean state again
