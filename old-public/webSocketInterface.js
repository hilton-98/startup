import ClientStorage from '../src/clientStorage.js';

export default class WebSocketInterface {

    static SCHOOL_ADDED = 'schoolAdded';
    static SCHOOL_REMOVED = 'removedSchool';

    static socket;


    static isConnectionOpen() {

        if (WebSocketInterface.getWebSocket().readyState === WebSocket.CLOSED) {
            return false;
        } else if (WebSocketInterface.getWebSocket().readyState === WebSocket.CONNECTING) {
            return false;
        } else {
            return true;
        }
    }

    static broadcastEvent(from, type, value) {
    
        if (!WebSocketInterface.isConnectionOpen()) {
            return;
        }

        const event = {
            from: from,
            type: type,
            value: value,
        };
        
        WebSocketInterface.getWebSocket().send(JSON.stringify(event));
    }

    static getProtocol() {
        const protocol = window.location.protocol;
        if (protocol === 'http:') {
            return 'ws';
        } else {
            return 'wss';
        }

    }

    static init() {
        
        if (WebSocketInterface.socket) {
            return;
        }

        const protocol = WebSocketInterface.getProtocol();

        WebSocketInterface.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        WebSocketInterface.socket.onopen = (event) => {};
        
        WebSocketInterface.socket.onclose = (event) => {};

        WebSocketInterface.socket.onmessage = async (event) => {

          const msg = JSON.parse(await event.data.text());

          if (msg.type === WebSocketInterface.SCHOOL_ADDED) {
            WebSocketInterface.addMessage(msg.from + ' added ' + msg.value + '!');
          } else if (msg.type === WebSocketInterface.SCHOOL_REMOVED) {
            WebSocketInterface.addMessage(msg.from + ' removed ' + msg.value + '!');
          }
        };
      }

    static configureWebSocket() {
        if (!WebSocketInterface.socket) {
            WebSocketInterface.init();
        }
    }

    static getWebSocket() {
        
        WebSocketInterface.configureWebSocket();
        return WebSocketInterface.socket;
    }

    static schoolAdded(schoolName) {
        const username = ClientStorage.getUsername();
        WebSocketInterface.broadcastEvent(username, WebSocketInterface.SCHOOL_ADDED, schoolName);
    }

    static schoolRemoved(schoolName) {
        const username = ClientStorage.getUsername();
        WebSocketInterface.broadcastEvent(username, WebSocketInterface.SCHOOL_REMOVED, schoolName);
    }

    static addMessage(msg) {
        console.log("Displaying msg: " + msg);
        ClientStorage.addMessage(msg);
    }
}