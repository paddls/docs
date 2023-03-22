function elementViewportTop(el) {
  return el.getBoundingClientRect().top;
}

export function init() {
  const tocListEl = document.querySelector('ul.toc-list');
  const template = document.querySelector('#toc-template');

  document.querySelectorAll('h3').forEach(el => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('li.toc-element').setAttribute('id', `toc-${el.id}`);
    clone.querySelector('a.toc-link').setAttribute('href', `#${el.id}`);
    clone.querySelector('a.toc-link').textContent = el.textContent;

    tocListEl?.appendChild(clone);
  });
}

export function onArticleScroll() {
  const elements = document.querySelectorAll('h3');
  let done = false;

  elements.forEach(el => {
    const tocEl = document.querySelector(`#toc-${el.id}`);
    tocEl?.classList.remove('active');

    if (!done && elementViewportTop(el) > 0) {
      tocEl?.classList.add('active');
      done = true;
    }
  });
}


