// 23.11.29
// const socket1 = io() 부분은 서버와의 소켓 연결을 초기화하는 부분입니다. 이것은 클라이언트가 서버와 실시간으로 데이터를 주고받을 수 있게 만듭니다.

const socket = io()

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul")
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

    // socket.emit("new_message", value, roomName, () => { addMessage(Me: ${value}); }); : 'new_message'라는 이벤트를 서버에 보냅니다. 
    // 이 이벤트에는 사용자가 입력한 메시지 값, 방 이름, 그리고 콜백 함수가 함께 보내집니다. 콜백 함수는 서버가 이벤트를 처리한 후 실행되며, 
    // 이 경우에는 사용자의 메시지를 화면에 추가하는 addMessage 함수를 호출합니다.

function handleNicknameSubmit() {
    event.preventDefault();
    const input = room.querySelector("#name input");
    const value = input.value;
    socket.emit("nickname", value);
    input.value = "";
}

function handleMessageSubmit() {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", value, roomName, () => {
        console.log("1")
        addMessage(`Me: ${value}`);
    });
    input.value = "";
}
 
function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `이 방의 이름은 ${roomName}`;
    const msgform = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgform.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
}

    // socket1.emit("enter_room", {payload : input.value}); 이 부분은 클라이언트에서 서버로 "enter_room"이라는 이벤트를 보내는 부분입니다. 
    // {payload : input.value}는 이벤트와 함께 보내는 데이터로, input.value에 있는 값을 페이로드로 서버에 보내게 됩니다.

    // "enter_room": 이벤트의 이름입니다. 클라이언트와 서버 사이에서 이벤트를 식별하는 데 사용됩니다.
    // input.value: 이벤트와 함께 서버로 보내는 데이터입니다. 이 경우, form에서 입력한 값을 서버로 보냅니다.
    // () => { console.log("server is done!"); }: 이부분은 콜백 함수입니다. 서버에서 이벤트를 처리한 후에 실행됩니다. 
    //     이 경우, 서버에서 이벤트 처리가 완료되면 "server is done!"이라는 메시지를 콘솔에 출력합니다.

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    // socket.emit("enter_room", {payload : input.value});
    // socket.emit("enter_room", input.value, () => {
    //     console.log("server is done!");
    // })
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (userNickname, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}(${newCount})`;
    addMessage(`${userNickname}이(가) 입장했습니다.`);
})

socket.on("bye", (userNickname, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}(${newCount})`;
    addMessage(`${userNickname}이(가) 퇴장했습니다.`);
})

socket.on("new_message", (msg) => {
    console.log("2")
    addMessage(msg);
})

socket.on("room_change", (rooms) => {
    console.log(rooms);

    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    if (rooms.length === 0) {
        return;
    } 
    rooms.forEach((room) => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    })
})

socket.on("hello", (rooms) => {
    console.log(rooms);

    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    if (rooms.length === 0) {
        return;
    } 
    rooms.forEach((room) => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    })
})