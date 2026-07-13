# Still

Still is a quiet, typography-first theme for Hexo personal blogs. It uses one responsive grid, one system-font stack, one accent color, and a small amount of dependency-free JavaScript.

[Live demo](https://simple-is-awesome.github.io/hexo_theme_still/)

> [!NOTE]
> This is a work by GPT 5.6 Sol Max.

## Features

- Responsive journal, post, page, archive, category, and tag layouts
- Complete Markdown styling, including tables, blockquotes, footnotes, and highlighted code
- Local client-side search generated from your Hexo posts
- Light, dark, and system color modes with no flash on repeat visits
- Reading time and optional updated dates
- Previous/next post navigation and pagination
- RSS/Atom discovery metadata
- Optional Giscus comments
- English and Simplified Chinese interface strings
- Semantic HTML, skip link, keyboard focus styles, reduced-motion support, and print styles
- No web fonts, image library, front-end framework, or analytics dependency

## Requirements

- Hexo 7 or newer (tested with Hexo 8.1.2)
- Node.js supported by your installed Hexo version
- `hexo-renderer-ejs`

The standard Hexo generators for index, archive, category, and tag pages are recommended. Install the feed generator if you want `atom.xml`:

```bash
npm install hexo-renderer-ejs hexo-generator-index hexo-generator-archive \
  hexo-generator-category hexo-generator-tag hexo-generator-feed
```

## Install

1. Extract this folder to `themes/still` inside your Hexo site.
2. Set the theme in the site's `_config.yml`:

```yaml
theme: still
```

3. Copy any settings you want to change from `themes/still/_config.yml` into the site's `_config.still.yml`. Hexo merges that file over the theme defaults and keeps your configuration separate from theme updates.
4. Clean and generate:

```bash
hexo clean
hexo generate
hexo server
```

## Site configuration

A practical starting point for the main Hexo `_config.yml`:

```yaml
title: Still
subtitle: Notes on design, code, and the quiet details.
description: A personal blog about design, code, and careful work.
author: Your Name
language: en
url: https://example.com
permalink: journal/:title/
theme: still

highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: "  "
```

For Simplified Chinese interface text, use `language: zh-CN`.

## Navigation and pages

Edit `menu` in the theme configuration. Create an About page with:

```bash
hexo new page about
```

Then set its front matter:

```yaml
---
title: About
subtitle: About
description: A short introduction.
---
```

Still generates `/search/` and `search.json` automatically when local search is enabled. You do not need a separate search plugin.

## Excerpts

The home page is title-first by default. Set `home_excerpt: true` to show a short plain-text excerpt below each title. You can control an individual excerpt using Hexo's `<!-- more -->` marker.

## Comments

Comments are disabled by default. To enable Giscus, create a Giscus configuration for your repository and fill in:

```yaml
comments:
  provider: giscus
  giscus:
    repo: owner/repository
    repo_id: your-repo-id
    category: General
    category_id: your-category-id
    mapping: pathname
```

Set `comments: false` in a post's front matter to disable comments on that post.

## Color and typography

All design tokens are at the top of `source/css/style.css`:

```css
:root {
  --canvas: #f7f7f4;
  --ink: #111214;
  --muted: #656b74;
  --line: #d9dce1;
  --accent: #1f52d6;
}
```

The default font stack uses fonts already installed on the reader's device. This keeps the theme fast and avoids third-party requests.

## License

MIT
