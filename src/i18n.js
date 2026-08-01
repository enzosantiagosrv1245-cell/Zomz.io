(() => {
    const translate = (key) => key;

    window.translateLegacy = (text) => text;
    window.t = translate;
    window.setLanguage = () => {};

    document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.lang = 'en';
    });
})();
