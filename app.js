const APP_META = {
    name: 'Echo-Matrica Design Icons',
    version: '0.1.3',
    isBeta: true
};

if (typeof window !== 'undefined') {
    window.APP_META = APP_META;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APP_META };
}