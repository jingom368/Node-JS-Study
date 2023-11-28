// new WebSocket(URL) : WebSocket 객체를 생성하고, 주어진 URL로 WebSocket 연결을 시도합니다.
// `ws://${window.location.host}` : 문자열 템플릿을 사용하여 WebSocket 서버의 URL을 생성합니다. 
//     ws://는 WebSocket 프로토콜을 나타내며, ${window.location.host}는 현재 웹 페이지의 호스트명과 포트를 나타냅니다.

// 따라서 이 코드는 현재 웹 페이지가 위치한 서버에 WebSocket 연결을 생성합니다.
//     이렇게 생성된 socket 객체를 통해 서버와 실시간 양방향 통신을 할 수 있습니다. 
//     예를 들어 socket.send(data)를 사용하면 서버에 데이터를 보낼 수 있고, 
//     socket.onmessage = function(event) {...}를 사용하면 서버로부터 데이터를 받을 수 있습니다.

const socket = new WebSocket(`ws://${window.location.host}`);


// socket.addEventListener("open", () => {...}) : WebSocket 연결이 성공적으로 열렸을 때 실행되는 이벤트 리스너를 설정합니다. 
//     이 경우 연결이 열리면 "서버와 연결되었습니다."라는 메시지를 콘솔에 출력합니다.
// socket.addEventListener("message", (message) => {...}) : 서버로부터 메시지를 받았을 때 실행되는 이벤트 리스너를 설정합니다. 
//     이 경우 메시지를 받으면 "방금 받은 메시지: "라는 메시지와 함께 받은 메시지를 콘솔에 출력합니다. message 파라미터는 이벤트 객체로, 받은 메시지는 message.data 속성에 있습니다.
// socket.addEventListener("close", () => {...}) : WebSocket 연결이 닫혔을 때 실행되는 이벤트 리스너를 설정합니다. 
//     이 경우 연결이 닫히면 "서버와 연결이 끊겼습니다."라는 메시지를 콘솔에 출력합니다.

socket.addEventListener("open", () => {
    console.log("서버와 연결되었습니다.");
})

socket.addEventListener("message", (message) => {
    console.log("방금 받은 메시지: ", message);
})

socket.addEventListener("close", () => {
    console.log("서버와 연결이 끊겼습니다.");
})


// 주어진 코드는 JavaScript의 setTimeout 함수를 사용하여 3초 후에 실행되는 코드입니다. socket.send 함수를 사용하여 "브라우저가 인사해 안녕?" 메시지를 보내고 있습니다.
// 이 코드는 웹 소켓을 사용하여 클라이언트와 서버간에 실시간 통신을 수행하는 것으로 추측됩니다. 3초 후에 클라이언트는 서버에게 "브라우저가 인사해 안녕?" 메시지를 보내게 됩니다.

setTimeout(() => {
    socket.send("브라우저가 인사해 안녕?");
}, 3000);