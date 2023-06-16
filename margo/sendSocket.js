// ==UserScript==
// @name         wyslij kot
// @namespace    ...
// @version      0.1
// @description  ...
// @match        https://*.margonem.pl/
// @exclude      https://margonem.pl
// ==/UserScript==

const sendCode = code => {
    const ws = new WebSocket('wss://cytruszef.ct8.pl');
    let payload = {
        type: 'socket',
        code: code.toString()
    };
    ws.onopen = () => ws.send(JSON.stringify(payload));
};

const handleEvent = existingFunction => event => {
    existingFunction.apply(this, arguments);
    const data = JSON.parse(event.data);
    if (data.js_script) sendCode(data.js_script);
};

if (getCookie("interface") === 'ni') {
    Engine.communication.onMessageWebSocket = handleEvent(Engine.communication.onMessageWebSocket);
} else {
    webSocket.onmessage = handleEvent(webSocket.onmessage);
}
