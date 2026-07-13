'use strict';

function plainText(value) {
  return String(value || '')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

hexo.extend.generator.register('still-search', function generateStillSearch(locals) {
  const options = this.theme.config.search || {};
  if (options.enabled === false) return [];

  const indexPath = options.index_path || 'search.json';
  const pagePath = options.page_path || 'search/index.html';
  const records = locals.posts
    .sort('-date')
    .map((post) => ({
      title: post.title || 'Untitled',
      path: this.config.root + post.path,
      date: post.date ? post.date.format(this.theme.config.date_format || this.config.date_format) : '',
      isoDate: post.date ? post.date.toISOString() : '',
      excerpt: plainText(post.excerpt || post.content).slice(0, 260),
      content: plainText(post.content).slice(0, 5000),
      tags: post.tags ? post.tags.map((tag) => tag.name) : [],
    }));

  const routes = [
    {
      path: indexPath,
      data: JSON.stringify(records),
    },
  ];

  const existing = locals.pages.findOne({ path: pagePath });
  if (!existing) {
    routes.push({
      path: pagePath,
      layout: ['search', 'page'],
      data: {
        title: 'Search',
        path: pagePath,
      },
    });
  }

  return routes;
});
