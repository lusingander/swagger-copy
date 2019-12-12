const copyToClipboard = (str) => {
  const tmp = document.createElement('textarea');
  tmp.value = str;
  document.body.appendChild(tmp);
  tmp.select();
  const success = document.execCommand('copy');
  tmp.parentElement.removeChild(tmp);
  return success;
}

$(function() {
  const target = '.highlight-code pre';
  const elemId = 'swagger-copy-ext-copy-button';
  const elem = `<div id="${elemId}">Copy to Clipboard</div>`;

  $(document).on({
    mouseenter: e => $(e.target).append(elem),
    mouseleave: e => $(`${target} div`).remove(),
  }, target);

  $(document).on('click', `#${elemId}`, evt => {
    const $pre = $(evt.target).parent();
    const $children = $pre.find('span');
    if ($children.length) {
      // <pre><span>foo...</span><span>bar...</span>...<div>Copy...</div></pre>
      const text = $children.toArray().map(e => e.innerHTML).join('');
      copyToClipboard(text);
    } else {
      // <pre>{json...}<div>Copy...</div></pre>
      const textNode = $pre.contents().toArray().filter(c => c.nodeType == 3); // text node
      if (textNode) {
        copyToClipboard(textNode[0].nodeValue);
      }
    }
  });
});
