export function nextCodeSnippetToClipboard(id) {
  const codeEl = document.querySelector(`#${id} ~ pre > code`);
  const codeTexts = [];
  getText(codeEl, codeTexts);

  const text = codeTexts.join('');

  toClipboard(text);
}

export function toClipboard(text) {
  navigator.clipboard.writeText(text);
}

function getText(node, accumulator) {
  if (node.nodeType === 3) { // 3 == text node
    accumulator.push(node.nodeValue)
  } else {
    for (let child of node.childNodes) {
      getText(child, accumulator)
    }
  }
}
