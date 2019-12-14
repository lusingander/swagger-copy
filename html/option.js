const getTextareaElem = () => document.getElementById('urls');
const getSaveButtonElem = () => document.getElementById('urls');

const saveOptions = () => {
  const urls = getTextareaElem().value.split('\n');
  chrome.storage.sync.set({
    urls: urls
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get({
    urls: [
      'http://example.com/swagger-ui.html',
      'https://example.com/swagger-ui.html'
    ]
  }, items => {
    getTextareaElem().value = items.urls.join('\n');
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
