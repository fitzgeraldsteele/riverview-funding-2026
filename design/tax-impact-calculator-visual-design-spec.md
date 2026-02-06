
# Tax Impact Calculator — Visual Design Spec

## Design Goal

Users must immediately understand:

**“These proposition checkboxes control the numbers and the chart below.”**

The interface should clearly communicate:

**Controls → Results → Visualization**

If this relationship isn’t obvious without explanation, the design has failed.

---

# Layout Structure

## Desktop Layout

HEADER

Controls panel on the left, results on the right, chart below.

Controls → Results → Chart

## Mobile Layout

Stack vertically in this order:

1. Controls
2. Proposition cards
3. Net total
4. Chart

Never mix controls between results.

---

# Visual Hierarchy Rules

Priority order:

1. Net total (most important)
2. Proposition cards
3. Controls
4. Chart (supporting info)

Users want their number first, explanation second.

---

# Controls Panel

## Purpose
Clearly indicate: “These settings change everything below.”

## Styling
- Enclosed panel
- Slightly tinted background
- Rounded corners
- Subtle border or elevation
- Comfortable padding

## Layout

Home Value  
[ slider ]  
$ value input  

Include Propositions  
☑ Prop 1  
☑ Prop 2  
☑ Prop 3  

Helper text: Results update automatically

## Behavior
- Toggles feel interactive and primary
- Colored indicators beside each prop
- Hovering highlights related card

---

# Proposition Cards

## Purpose
Show the impact of each individual proposition.

## Structure

Prop name  
+$X / year  
+$Y / month  

## Styling
- Card surface distinct from background
- Subtle shadow
- Rounded corners
- Strong typography for numbers
- Colored accent stripe or top border

## Color Mapping (consistent everywhere)

Prop 1 → Blue  
Prop 2 → Purple  
Prop 3 → Orange  

Use the same color for:
- Checkbox indicators
- Card accents
- Chart bars
- Legend

This visual linking makes relationships obvious.

## Disabled State
When unchecked:
- Reduced opacity
- Muted text
- Label “Excluded”

Users must instantly see what is active vs inactive.

---

# Net Total Card (Hero Component)

## Purpose
Primary answer users care about.

## Styling
- Larger than other cards
- Strong contrast
- Bold typography
- Centered layout

## Structure

Net Change  
+$XXX / year  
+$YY / month  

This should visually anchor the page.

---

# Chart

## Purpose
Explain distribution, not calculate.

## Rules
- Placed below results
- Visually secondary
- Uses same proposition colors
- Stacked visualization
- Segments disappear when unchecked

Removing segments reinforces filtering behavior better than zeroing.

---

# Interaction Behavior

These behaviors reinforce cause-and-effect.

## Toggle ON
- Card brightens
- Chart segment appears
- Numbers animate upward

## Toggle OFF
- Card fades
- Chart segment disappears
- Net number animates down

Users should clearly feel: “I changed something → the math updated.”

---

# Spacing & Rhythm

- Generous whitespace between sections
- Even spacing between cards
- Avoid cramped stacking
- Never mix control elements inside results

Whitespace communicates grouping better than borders.

---

# Copy Cues

Under controls include:

“Select propositions to include in your tax estimate.”

Do not rely solely on visual inference.

---

# Design Acceptance Checklist

Before shipping:

- Controls visually grouped
- Consistent color linking across toggle/card/chart
- Cards show enabled vs disabled clearly
- Net total visually dominant
- Layout flows Controls → Results → Chart
- Toggling visibly updates everything

If any of these fail, users may distrust the math.

---

End of specification.
