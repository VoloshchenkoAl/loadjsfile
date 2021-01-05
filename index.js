/**
 * @param {string} url
 * @param {Object.<string, any>} attributes
 */
const loadJsFile = (url, attributes = {}) =>
  new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
        return reject(new Error('loadjsfile: can not execute code from non browser environment'));
    }

    const isScriptExists = Boolean(document.querySelector(`script[src="${url}"]`));

    if (isScriptExists) {
      return resolve();
    }

    const script = document.createElement('script');
    script.src = url;

    Object.entries(attributes).forEach(([attribute, value]) => {
        script.setAttribute(attribute, value);
      });

    script.onload = () => {
      resolve();
    };

    script.onerror = (error) => {
      reject(error);
    };

    document.head.appendChild(script);
  });

module.exports = loadJsFile;
