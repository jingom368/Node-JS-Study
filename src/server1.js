// import SocketIO from "socket.io" : Socket.IO 모듈을 임포트합니다. 이 모듈은 웹소켓 통신을 가능하게 해줍니다.

import http from "http";
import SocketIO from "socket.io";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from 'express';

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req,res) => res.render("home"));
app.get("/*", (req,res) => res.redirect("/"));

// const wsServer = SocketIO(httpServer); : 생성한 HTTP 서버 위에 웹소켓 서버를 생성합니다.
// wsServer.on("connection", (socket) => {...}); : 웹소켓 서버에 클라이언트가 연결되면 발생하는 'connection' 이벤트에 대한 핸들러를 등록합니다. 
// 이 핸들러는 클라이언트로부터의 각 연결에 대해 실행됩니다.

const httpServer = http.createServer(app);
// const wsServer = SocketIO(httpServer);
const wsServer = new Server(httpServer, {
    cors: {
        origin : ["https://admin.socket.io"],
        credentials: true
    }
});

instrument(wsServer, {
    auth: false
});

    // 이 부분은 ES6의 구조 분해 할당 문법을 사용하여 wsServer의 sockets.adapter 객체에서 sids와 rooms를 추출하는 코드입니다. 
    // sids는 각 소켓이 어떤 방에 들어가 있는지를 나타내는 Map 객체이며, rooms는 각 방에 어떤 소켓이 들어가 있는지를 나타내는 Map 객체입니다.

    // rooms Map 객체의 각 요소에 대해 반복을 수행하며, 각 방에 대한 정보를 가져와 해당 방이 공개된 채팅방인지를 판단합니다. 
    // 공개된 채팅방이라면 publicRooms 배열에 추가합니다. 여기서 공개된 채팅방이라 함은, 방 이름이 소켓 ID와 일치하지 않는 방을 말합니다. 
    // 소켓 ID와 방 이름이 일치하는 경우는 소켓이 생성될 때 각 소켓에 대해 자동으로 생성되는 개인방을 말합니다.

    // JavaScript의 Map 객체를 순회할 때, forEach() 메소드는 각 요소에 대해 콜백 함수를 호출하며, 이 콜백 함수는 첫 번째 인자로 요소의 value, 두 번째 인자로 요소의 key를 받습니다.
    //     JavaScript의 Map.forEach() 메서드의 인자 순서는 (value, key, map)입니다. 이 메서드는 각 항목에 대해 주어진 콜백 함수를 실행하며, 이 콜백 함수는 세 개의 인자를 받습니다.
    //     즉, rooms.forEach((value, key) => {...})는 rooms Map 객체의 각 요소를 순회하면서 value와 key를 차례대로 가져오는 것입니다.
    //     여기서 value는 각 방에 있는 사용자의 집합(Set)을 나타내고, key는 방의 이름을 나타냅니다.
    //     따라서 rooms.forEach((value, key) => {...})가 올바른 표현입니다. rooms.forEach((key, value) => {...})로 작성하게 되면, 
    //     key와 value의 순서가 바뀌어 원치 않는 결과를 가져올 수 있습니다.

        // 이 경우, value는 각 방에 있는 사용자의 집합(Set)을 나타내고, key는 방 이름을 나타냅니다.
        //     sids.get(key) === undefined는 해당 방이 공개 방인지 아닌지를 판별하는 조건입니다. 만약 sids.get(key)가 undefined라면, 
        //     그 방은 공개 방(public room)이라는 것이므로 publicRooms 배열에 추가합니다.
        //     따라서 이 함수는 서버의 모든 방을 순회하면서 공개 방만을 찾아내는 역할을 합니다. 이를 위해 forEach() 메소드에 전달된 콜백 함수는 value, key 순서로 인자를 받습니다.
    
function publicRooms() {
    // const sids = wsServer.sockets.adapter.sids;
    // const rooms = wsServer.sockets.adapter.rooms;

    const {
        sockets: {
            adapter:{sids, rooms},
        },
    } = wsServer;

    const publicRooms = []
    // rooms.forEach((value, key) => {
    rooms.forEach((value, key) => {
        console.log(key, value, sids.get(key))
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    
    return publicRooms;
}

function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

    // socket.onAny((event) => {...})
    // 이 메소드는 socket에서 발생하는 모든 이벤트를 감지합니다. 이벤트가 발생하면 해당 이벤트의 이름(event)이 콜백 함수의 매개변수로 전달됩니다. 
    //     콜백 함수 내부에서는 wsServer.sockets.adaptor와 발생한 이벤트의 이름을 콘솔에 출력하고 있습니다.
    // wsServer.sockets.adaptor는 Socket.IO 서버의 어댑터를 참조하는데, 어댑터는 Socket.IO 서버가 클라이언트와의 연결을 관리하는 방식을 결정합니다. 
    //     기본적으로는 in-memory 어댑터가 사용되며, 이는 모든 연결 정보를 메모리에 저장합니다.

    // socket.on("enter_room", (roomName,done) => {...}); : 클라이언트로부터 'enter_room' 이벤트가 오면 이를 처리하는 부분입니다. 
    // 클라이언트가 보낸 roomName을 출력하고, 5초 후에 done 콜백 함수를 실행합니다.
        // console.log(socket.id); : 연결된 클라이언트의 고유 ID를 콘솔에 출력합니다. 이 ID는 서버가 클라이언트를 식별하는 데 사용됩니다.
        // console.log(socket.rooms); : 클라이언트가 현재 속해 있는 방의 목록을 콘솔에 출력합니다. 초기에는 클라이언트가 속해 있는 방이 없으므로 빈 객체가 출력됩니다.
        // socket.join(roomName); : 클라이언트를 'roomName'이라는 이름의 방에 추가합니다. 이 방은 클라이언트가 메시지를 주고받을 수 있는 공간입니다.
        // console.log(socket.rooms); : 클라이언트가 현재 속해 있는 방의 목록을 다시 콘솔에 출력합니다. 이번에는 방에 추가된 후의 상태를 확인할 수 있습니다.

    // socket.on("disconnecting", () => {...}); : 클라이언트의 웹소켓 연결이 끊어질 때 실행되는 이벤트 핸들러입니다. 
    //     이 핸들러는 클라이언트가 모든 방에서 나가기 전에 실행됩니다. 
        // 여기서 'socket.rooms'는 클라이언트가 현재 속해 있는 방의 목록을 가리킵니다. 
        // 클라이언트가 속한 모든 방에 대해 'bye' 이벤트를 보냅니다. 이를 통해 다른 클라이언트들에게 해당 클라이언트가 방에서 나갔음을 알립니다.

    // socket.on("disconnecting", () => {...}) : "disconnecting" 이벤트는 클라이언트가 서버에서 연결이 끊어지기 직전에 발생합니다. 
    //     이 시점에는 클라이언트가 아직 종료되지 않았으며, 클라이언트의 상태 정보(예: 방 정보)는 여전히 유효합니다. 
    //     따라서 이 코드에서는 클라이언트가 속해 있던 모든 방에 'bye' 이벤트를 보내어, 다른 클라이언트들에게 이 클라이언트가 연결을 종료하려고 하고 있다는 사실을 알립니다.

    // socket.on("disconnect", () => {...}) : "disconnect" 이벤트는 클라이언트의 연결이 완전히 끊어진 후에 발생합니다. 
    //     이 시점에서는 클라이언트의 상태 정보가 더 이상 유효하지 않습니다. 따라서 이 코드에서는 공개된 채팅방 목록이 변경될 수 있음을 감지하고, 
    //     변경된 목록을 모든 클라이언트에게 'room_change' 이벤트로 보내어 각 클라이언트의 방 목록을 최신 상태로 유지하도록 합니다.

    // socket.on("new_message", (msg, room, done) => {...}); : 클라이언트로부터 'new_message' 이벤트를 받았을 때 실행되는 이벤트 핸들러입니다. 
    //     'msg'는 클라이언트가 보낸 메시지, 'room'은 메시지를 보낸 방의 이름, 'done'은 클라이언트가 전달한 콜백 함수입니다. 
    // 이 핸들러는 클라이언트가 보낸 메시지를 해당 방의 다른 클라이언트들에게 전송하고, 처리가 끝났음을 클라이언트에 알립니다.
        // socket.to(room).emit("new_message", ${socket.nickname} : ${msg});
        // 이 코드는 socket이 특정 방(room)에 있는 모든 클라이언트에게 "new_message" 이벤트를 보내는 역할을 합니다. 
        //      이때, 보내는 메시지는 클라이언트의 별명과 클라이언트가 보낸 메시지를 합친 문자열입니다.
        // 그러나, 이 코드는 메시지를 보낸 클라이언트 자신을 제외한 클라이언트에게만 메시지를 보냅니다. 

        // wsServer.in(room).emit("new_message", ${socket.nickname} : ${msg});
        // 이 코드는 서버가 특정 방(room)에 있는 모든 클라이언트에게 "new_message" 이벤트를 보내는 역할을 합니다. 
        //     이때, 보내는 메시지는 클라이언트의 별명과 클라이언트가 보낸 메시지를 합친 문자열입니다.
        // 이 코드를 사용하면 메시지를 보낸 클라이언트 자신도 이 이벤트를 받을 수 있습니다.

wsServer.on("connection", (socket) => {
    // console.log(socket);
    // socket.on("enter_room", (roomName) => console.log(roomName));
    socket["nickname"] = "익명";

    wsServer.sockets.emit("hello", publicRooms());

    socket.onAny((event) => {
        console.log(wsServer.sockets.adapter);
        console.log(`Socket Event : ${event}`);
    });

    socket.on("enter_room", (roomName,done) => {
        done();
        // setTimeout(() => {
        //     done();
        // }, 5000)
        // console.log(roomName);
        // console.log(socket.id);
        // console.log(socket.rooms);
        socket.join(roomName);
        // console.log(socket.rooms);
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName)); // 사용자의 방에 입장할 때
        wsServer.sockets.emit("room_change", publicRooms()); // 사용자에게 room_change 이름으로 publicRooms(공용 룸) 배열을 전달
    });

    socket.on("disconnecting", () => { // 사용자가 탈퇴해서 모든 방이 나가질 때 // "disconnecting" 이벤트는 클라이언트가 서버에서 연결이 끊어지기 직전에 발생합니다.
        // console.log(socket.rooms);
        socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname, countRoom(room)-1));
    });

    socket.on("disconnect", () => { // "disconnect" 이벤트는 클라이언트의 연결이 완전히 끊어진 후에 발생합니다.
        wsServer.sockets.emit("room_change", publicRooms());
    })

    socket.on("new_message", (msg, room, done) => {
        // socket.to(room).emit("new_message", msg);
        socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
        // wsServer.in(room).emit("new_message", `${socket.nickname} : ${msg}`); // 해당 방의 모든 클라이언트에게 메시지 보내기
        done();
    });

    socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

const handelListen = () => console.log("listening on http://localhost:3000");
httpServer.listen(3000, handelListen);

// 해당 방에서 나 뺴고 메세지 보내지는 이유?
// key, value 위치 바뀌는 이유?
// 바로 방이 안뜨는 이유?