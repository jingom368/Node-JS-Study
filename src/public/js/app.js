// new WebSocket(URL) : WebSocket 객체를 생성하고, 주어진 URL로 WebSocket 연결을 시도합니다.
// `ws://${window.location.host}` : 문자열 템플릿을 사용하여 WebSocket 서버의 URL을 생성합니다. 
//     ws://는 WebSocket 프로토콜을 나타내며, ${window.location.host}는 현재 웹 페이지의 호스트명과 포트를 나타냅니다.

// 따라서 이 코드는 현재 웹 페이지가 위치한 서버에 WebSocket 연결을 생성합니다.
//     이렇게 생성된 socket 객체를 통해 서버와 실시간 양방향 통신을 할 수 있습니다. 
//     예를 들어 socket.send(data)를 사용하면 서버에 데이터를 보낼 수 있고, 
//     socket.onmessage = function(event) {...}를 사용하면 서버로부터 데이터를 받을 수 있습니다.

const nickForm = document.querySelector("#nick")
const messageForm = document.querySelector("#message");
const messageList = document.querySelector("ul")

const socket = new WebSocket(`ws://${window.location.host}`);


// function makeMessage(type, payload) {...}: makeMessage라는 이름의 함수를 선언하고, 이 함수는 type과 payload라는 두 개의 매개변수를 받습니다.
// const msg = {type, payload};: msg라는 이름의 상수를 선언하고, 이 상수에는 type과 payload로 구성된 객체를 할당합니다. 
//     이 때, 객체의 속성 이름과 값이 같은 변수의 경우, ES6 문법에서는 속성 이름을 생략하고 변수만 적을 수 있습니다. 따라서 {type: type, payload: payload}를 {type, payload}로 줄여 쓴 것입니다.
// return JSON.stringify(msg);: msg 객체를 JSON 문자열로 변환한 후, 그 결과를 반환합니다. JSON.stringify는 자바스크립트 객체를 JSON 형식의 문자열로 변환하는 메서드입니다.
// 따라서 이 함수는 type과 payload라는 두 개의 값을 받아서, 이 두 값으로 구성된 객체를 JSON 문자열로 변환한 후 반환하는 역할을 합니다. 
//     주로 서버와 클라이언트 간에 데이터를 주고받을 때, 데이터를 JSON 형식으로 변환해서 보내는 데 사용됩니다.

function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}


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
    // console.log("방금 받은 메시지: ", message); // 서버에서 받은 메세지
    // console.log("방금 받은 메시지: ", message.data); // 서버에서 받은 메세지 "안녕?"
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.appendChild(li);
})

socket.addEventListener("close", () => {
    console.log("서버와 연결이 끊겼습니다.");
})


// 주어진 코드는 JavaScript의 setTimeout 함수를 사용하여 3초 후에 실행되는 코드입니다. socket.send 함수를 사용하여 "브라우저가 인사해 안녕?" 메시지를 보내고 있습니다.
// 이 코드는 웹 소켓을 사용하여 클라이언트와 서버간에 실시간 통신을 수행하는 것으로 추측됩니다. 3초 후에 클라이언트는 서버에게 "브라우저가 인사해 안녕?" 메시지를 보내게 됩니다.

// 시간차로 메세지 주고 받기
/*
    setTimeout(() => {
        socket.send("브라우저가 인사해 안녕?"); // 서버로 보내는 메세지
    }, 3000);
*/


// handleSubmit(event) 함수 & handleNickSubmit(event) 함수
// 이 함수는 메시지 전송 폼에서 'submit' 이벤트가 발생했을 때 실행됩니다.
// event.preventDefault()는 폼 제출에 의한 페이지 새로고침을 방지합니다.
// messageForm.querySelector("input")을 통해 메시지 입력창의 값을 가져옵니다.
// socket.send(makeMessage("new_message", input.value))를 통해 웹소켓을 통해 서버에 메시지를 전송합니다. "new_message"는 메시지 타입을 나타냅니다.
// &
// socket.send(makeMessage("nickname", input.value))를 통해 웹소켓을 통해 서버에 닉네임 변경 요청을 전송합니다. "nickname"은 메시지 타입을 나타냅니다.
// 마지막으로 input.value = ""를 통해 닉네임 입력창을 비웁니다.

// messageForm.addEventListener("submit", handleSubmit)와 nickForm.addEventListener("submit", handleNickSubmit)는 각각 메시지 전송 폼과 닉네임 변경 폼에서 
// 'submit' 이벤트가 발생하면 위에서 설명한 함수들이 실행되도록 이벤트 리스너를 등록하는 코드입니다.

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    // socket.send(input.value);
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    // socket.send(input.value);
    // socket.send({
    //     type: "nickname",
    //     payload: input.value
    // });
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);