// ==UserScript==
// @name         wyslij kot
// @namespace    ...
// @version      0.1
// @description  ...
// @match        https://*.margonem.pl/
// @exclude      https://margonem.pl
// @grant        unsafeWindow
// ==/UserScript==
const sendCode = code => {
    const ws = new WebSocket('wss://cytruszef.ct8.pl')
    let e = {
     type: 'socket',
     code: code.toString()
    }
    ws.onopen = () => {
        ws.send(JSON.stringify(e));
    }
    console.log('wyslaned :)')
}
const orgPI = unsafeWindow.parseInput;
unsafeWindow.parseInput = async data => {
    if(data.js_script) sendCode(data.js_script);
    return orgPI.apply(this, arguments);
};
