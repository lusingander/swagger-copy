const getTextareaElem = () => document.getElementById('urls');
const getSaveButtonElem = () => document.getElementById('urls');

const save_options = () => {
  const urls = getTextareaElem().value.split('\n');
  chrome.storage.sync.set({
    urls: urls
  });
};

const restore_options = () => {
  chrome.storage.sync.get({
    urls: [
      'http://example.com/swagger-ui.html',
      'https://example.com/swagger-ui.html'
    ]
  }, items => {
    getTextareaElem().value = items.urls.join('\n');
  });
};

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
