'use strict';

hexo.extend.helper.register('reading_time', function readingTime(content, speed) {
  const text = String(content || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const cjk = (text.match(/[\u3400-\u9fff\uf900-\ufaff]/g) || []).length;
  const latin = text.replace(/[\u3400-\u9fff\uf900-\ufaff]/g, ' ').trim();
  const words = latin ? latin.split(/\s+/).length : 0;
  const wordsPerMinute = Number(speed) || 220;
  return Math.max(1, Math.ceil(words / wordsPerMinute + cjk / 500));
});
