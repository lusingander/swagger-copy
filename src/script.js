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
    const children = $(evt.target).parent().find('span');
    const text = children.toArray().map(e =>
      e.innerHTML
    ).reduce((acc, cur) => 
      acc.concat('', cur)
    );
    copyToClipboard(text);
  });
});
