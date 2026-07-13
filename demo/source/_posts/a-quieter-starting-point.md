---
title: A quieter starting point
date: 2026-07-12 09:00:00
updated: 2026-07-13 09:00:00
description: A brief tour of the choices that make Still feel calm, readable, and fast.
categories:
  - Design notes
tags:
  - typography
  - design
---

Still begins with a simple premise: the writing should be the most vivid thing on the page. The layout gives every title, sentence, and pause enough room to do its work.

<!-- more -->

## One system, carefully tuned

The theme uses a single responsive grid and a system-font stack. There are no web fonts to wait for and no interface framework to ship. The result is small, direct, and comfortable on a phone or a wide screen.

> Restraint is not the absence of design. It is the decision to keep only what earns its place.

The default palette is equally compact:

| Token | Purpose |
| --- | --- |
| Canvas | A soft reading surface |
| Ink | High-contrast body text |
| Muted | Dates and supporting details |
| Accent | Links and focus states |

## Made for real writing

Long posts still need structure. Still includes complete styles for:

- headings, lists, and blockquotes;
- tables, footnotes, and inline code;
- highlighted code blocks;
- tags, archives, and previous or next navigation.

```css
:root {
  --canvas: #f7f7f4;
  --ink: #111214;
  --accent: #1f52d6;
}
```

Use the sun-and-moon control in the navigation to try the light and dark color modes.
