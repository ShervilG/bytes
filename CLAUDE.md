# bytes

Personal micro-blogging site and catalog. Plain static files (HTML, CSS, JS), no build step, served from GitHub Pages on `main`.

## Structure

- `index.html` — page shell: header, nav, empty `<main id="content">`.
- `js/main.js` — hash router (`#bookshelf`, `#bytes`, `#bytes/<slug>`, `#about`) that renders each section into `<main>`.
- `css/main.css` — all styles.
- `blogs/*.md` — blog posts, rendered in the browser with markdown-it (loaded from a CDN).
- `blogs/index.json` — manifest of posts; the Bytes card list is built from it.

## Rules

### 1. The site must be responsive
- Every change must work from ~320px phone widths up to desktop. Mobile-first; use fluid layout (`clamp()`, `flex-wrap`, CSS grid with `auto-fill`/`minmax`), never fixed pixel widths that can overflow.
- Keep the viewport meta tag in `index.html`.
- Respect `prefers-color-scheme` (styles use CSS variables for light/dark).
- New content (images, code blocks, tables) must not cause horizontal page scroll.

### 2. Blog changes must update `blogs/index.json`
Whenever a post in `blogs/` is added, renamed, deleted, or its title/description/date changes, update `blogs/index.json` in the same commit. Each entry:

```json
{
  "file": "my-post.md",
  "title": "My Post",
  "description": "One-sentence summary shown on the card.",
  "date": "2026-11-05"
}
```

- `file` is the exact filename in `blogs/`, kebab-case, ending in `.md`. The URL slug is the filename without `.md`.
- `date` is the creation date, ISO `YYYY-MM-DD`.
- Keep the array sorted newest first.
- `title` and `description` must match the post's content.
- Every `.md` file in `blogs/` must have exactly one entry and every entry must point to an existing file.

## Conventions

- Never insert untrusted text with `innerHTML`; build elements with `textContent` (see `renderBytes`). markdown-it runs with raw HTML disabled; keep it that way.
- Test locally with `python3 -m http.server` (`fetch` does not work from `file://`). Hard refresh after changes to bypass cache.
- Only commit or push when asked.
