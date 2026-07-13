(function () {
  'use strict';

  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');

  function isDark() {
    return root.dataset.theme === 'dark';
  }

  function syncToggle() {
    if (!toggle) return;
    const dark = isDark();
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? toggle.dataset.lightLabel : toggle.dataset.darkLabel);
  }

  if (toggle) {
    syncToggle();
    toggle.addEventListener('click', function () {
      const mode = isDark() ? 'light' : 'dark';
      root.dataset.theme = mode;
      try { localStorage.setItem('still-color-mode', mode); } catch {}
      syncToggle();
    });
  }

  const searchRoot = document.querySelector('[data-search-root]');
  if (!searchRoot) return;

  const input = searchRoot.querySelector('[data-search-input]');
  const form = searchRoot.querySelector('[data-search-form]');
  const clear = searchRoot.querySelector('[data-search-clear]');
  const meta = searchRoot.querySelector('[data-search-meta]');
  const list = searchRoot.querySelector('[data-search-results]');
  const empty = searchRoot.querySelector('[data-search-empty]');
  const limit = Number(searchRoot.dataset.limit) || 20;
  let index = [];

  function makeResult(post) {
    const item = document.createElement('li');
    item.className = 'search-result';
    const body = document.createElement('div');
    const heading = document.createElement('h2');
    const link = document.createElement('a');
    const excerpt = document.createElement('p');
    const time = document.createElement('time');
    link.href = post.path;
    link.textContent = post.title;
    excerpt.textContent = post.excerpt;
    time.dateTime = post.isoDate;
    time.textContent = post.date;
    heading.appendChild(link);
    body.append(heading, excerpt);
    item.append(body, time);
    return item;
  }

  function render() {
    const query = input.value.trim().toLowerCase();
    list.replaceChildren();
    clear.hidden = !query;
    if (!query) {
      meta.textContent = searchRoot.dataset.labelPrompt;
      empty.hidden = true;
      return;
    }
    const terms = query.split(/\s+/).filter(Boolean);
    const matches = index.filter(function (post) {
      const haystack = [post.title, post.excerpt, post.content, ...(post.tags || [])]
        .join(' ')
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    }).slice(0, limit);
    const label = matches.length === 1 ? searchRoot.dataset.labelResult : searchRoot.dataset.labelResults;
    meta.textContent = `${matches.length} ${label} — “${input.value.trim()}”`;
    matches.forEach((post) => list.appendChild(makeResult(post)));
    empty.hidden = matches.length > 0;
  }

  form.addEventListener('submit', function (event) { event.preventDefault(); });
  input.addEventListener('input', render);
  clear.addEventListener('click', function () { input.value = ''; input.focus(); render(); });

  document.addEventListener('keydown', function (event) {
    if (event.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
      event.preventDefault();
      input.focus();
    }
  });

  fetch(searchRoot.dataset.index)
    .then((response) => {
      if (!response.ok) throw new Error('Search index unavailable');
      return response.json();
    })
    .then((records) => {
      index = Array.isArray(records) ? records : [];
      const query = new URLSearchParams(location.search).get('q');
      if (query) { input.value = query; render(); }
    })
    .catch(() => {
      meta.textContent = searchRoot.dataset.labelUnavailable;
    });
})();
