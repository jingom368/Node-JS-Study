// import http from "http"; : Node.js의 내장 모듈인 http를 불러옵니다. 이 모듈은 HTTP 서버를 생성하는 데 사용됩니다.
// import WebSocket from 'ws'; : WebSocket 프로토콜을 구현한 ws 모듈을 불러옵니다. WebSocket은 클라이언트와 서버 간에 실시간 양방향 통신을 가능하게 하는 프로토콜입니다.
// import express from 'express'; : Express 모듈을 불러옵니다. Express는 Node.js를 위한 웹 애플리케이션 프레임워크입니다.
import http from "http";
import WebSocket from 'ws';
import express from 'express';

// const app = express(); : Express 인스턴스를 생성하여 app 변수에 저장합니다.
const app = express();


// app.set("view engine", "pug"); : Express 앱의 뷰 엔진을 Pug로 설정합니다. 뷰 엔진은 템플릿 파일을 렌더링하는 역할을 합니다.
// app.set("views", __dirname + "/views"); : Express 앱의 뷰(템플릿 파일)가 있는 디렉토리를 설정합니다. __dirname은 현재 파일의 경로를 나타내는 Node.js 전역 변수입니다.

// app.use() : Express 미들웨어를 등록하는 메서드입니다. 미들웨어는 요청과 응답 사이에 위치하여 요청이 들어올 때마다 실행되는 함수입니다.
//     "/public" : 이는 라우트의 경로를 지정합니다. 이 코드에서는 "/public" 경로로 들어오는 요청에 대해 미들웨어를 적용하겠다는 의미입니다.
// express.static(__dirname+"/public") : express.static은 Express가 제공하는 빌트인 미들웨어로, 정적 파일을 제공하는 역할을 합니다. 
//     이 코드에서는 __dirname+"/public" 경로에 있는 정적 파일(이미지, CSS 파일, JavaScript 파일 등)을 "/public" 경로로 접근할 수 있도록 설정하고 있습니다

// app.get("/", (req,res) => res.render("home")); : 루트 URL('/')에 GET 요청이 들어오면 home 템플릿을 렌더링하여 응답합니다. req는 요청 객체, res는 응답 객체를 나타냅니다.
// app.get("/*", (req,res) => res.redirect("/")) : 루트 URL('/')를 제외한 모든 URL에 GET 요청이 들어오면 루트 URL('/')로 리다이렉트합니다.

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req,res) => res.render("home"));
app.get("/*", (req,res) => res.redirect("/"));


// const handelListen = () => console.log("듣고 있어 http://localhost:3000") : 서버가 3000번 포트에서 리스닝을 시작할 때 콘솔에 메시지를 출력하는 함수를 정의합니다.
// app.listen(3000, handelListen); : Express 앱을 3000번 포트에서 시작하고, 리스닝을 시작하면 handelListen 함수를 호출합니다.

// const server = http.createServer(app); : http 모듈의 createServer 메서드를 사용해 HTTP 서버를 생성하고, 이전에 정의한 Express 앱(app)을 서버에 연결합니다.
// const wss = new  WebSocket.Server({server}); : ws 모듈의 Server 클래스를 사용해 WebSocket 서버를 생성하고, 이를 HTTP 서버에 연결합니다. 
// 이로써 HTTP와 WebSocket 요청을 동일한 포트에서 처리할 수 있게 됩니다.

const handelListen = () => console.log("연결 중 http://localhost:3000");
// app.listen(3000, handelListen);
const server = http.createServer(app);
const wss = new WebSocket.Server({server});


// function handelConnection(socket) { console.log(socket); } : 클라이언트가 WebSocket 서버에 연결되었을 때 실행되는 콜백 함수를 정의합니다. 
//     이 함수는 연결된 클라이언트의 소켓 객체(socket)를 파라미터로 받아서 그 정보를 콘솔에 출력합니다. 이 socket 객체를 통해 연결된 클라이언트와 데이터를 주고받을 수 있습니다.

// wss.on("connection", handelConnection); : wss WebSocket 서버에서 "connection" 이벤트가 발생했을 때, 즉 클라이언트가 서버에 연결되었을 때 handelConnection 함수를 실행하도록 설정합니다.

// 따라서 클라이언트가 이 WebSocket 서버에 연결을 시도하면, 서버는 이를 감지하고 handelConnection 함수를 실행하여 클라이언트 소켓의 정보를 콘솔에 출력합니다. 
//     이렇게 함으로써 서버는 어떤 클라이언트가 연결되었는지 확인할 수 있습니다.

/* 
    function handelConnection(socket) {
        console.log(socket);
    } 

    wss.on("connection", handelConnection);
*/


// wss.on("connection", (socket) => {...}); : 이 부분은 wss WebSocket 서버에서 "connection" 이벤트가 발생했을 때, 
// 즉 클라이언트가 서버에 연결되었을 때 실행되는 콜백 함수를 설정하는 부분입니다. 연결된 클라이언트의 소켓 객체는 socket 파라미터로 전달됩니다.
    // "console.log("socket", socket)"는 "socket"라는 문자열과 socket 객체를 별개로 출력합니다. 이 방식을 사용하면 socket 객체의 내용을 자세히 볼 수 있습니다.
    // "console.log("socket" + socket)"는 "socket"라는 문자열과 socket 객체를 문자열 연결 연산자(+)를 사용하여 하나의 문자열로 만들어 출력합니다. 
    //     이 경우, socket 객체가 문자열로 변환되어 출력되므로, [object Object]와 같이 출력될 수 있습니다.
    // 따라서, 객체의 내용을 자세히 보고 싶다면 "console.log("socke", socket)" 방식을, 객체를 문자열과 함께 한 줄로 출력하고 싶다면 "console.log("socke" + socket)" 방식을 사용하면 됩니다.
    // sockets.push(socket): 새로 연결된 웹소켓을 sockets 배열에 추가합니다.
    // console.log("브라우저와 연결되었습니다."); : 클라이언트와 연결이 성공하면 콘솔에 "브라우저와 연결되었습니다."라는 메시지를 출력합니다.
    // socket.on("close", () => console.log("서버 > 서버와 연결이 끊겼습니다.")); : 클라이언트와의 연결이 닫혔을 때 실행되는 콜백 함수를 설정합니다. 
    //     이 경우 연결이 닫히면 콘솔에 "서버 > 서버와 연결이 끊겼습니다."라는 메시지를 출력합니다.
    // socket.on("message", (message) => {...}) : 클라이언트로부터 메시지를 받았을 때 실행되는 콜백 함수를 설정합니다. 이 경우 메시지를 받으면 받은 메시지를 콘솔에 출력합니다.
        // const message = JSON.parse(msg): 클라이언트에서 보낸 메시지를 JSON형식으로 파싱합니다.
        // console.log([서버] : ${message});: 이 코드는 서버 측에서 실행되며, 서버의 콘솔에 "[서버] : "라는 문자열과 함께 클라이언트로부터 받은 메시지를 출력합니다. 
        // 이는 주로 개발자가 서버에서 클라이언트로부터 어떤 메시지를 받았는지 확인하기 위해 사용됩니다.
        // socket.send([서버] : ${message});: 이 코드는 서버가 클라이언트로 메시지를 보내는 코드입니다. "[서버] : "라는 문자열과 함께 클라이언트로부터 받은 메시지를 그대로 클라이언트에게 보냅니다. 
        // 이는 웹소켓을 통해 실시간으로 서버와 클라이언트 간의 데이터를 주고받는 데 사용됩니다.
        // sockets.forEach(aSocket => aSocket.send(${message})): sockets 배열에 있는 모든 웹소켓에 메시지를 보냅니다. 이를 통해 서버는 받은 메시지를 모든 클라이언트에게 브로드캐스팅합니다.

        // switch(message.type) {...} : message.type의 값에 따라 다른 코드 블록이 실행됩니다. message는 클라이언트에서 서버로 보낸 메시지를 JSON 형태로 파싱한 객체입니다.
        // case "new_message": : 메시지의 타입이 "new_message"인 경우 다음 코드를 실행합니다.
        // sockets.forEach(aSocket => aSocket.send(${socket.nickname}:${message.payload})); : 현재 연결된 모든 소켓에 메시지를 전송합니다. 
        // 메시지는 보낸 사람의 닉네임과 메시지 내용을 합쳐서 전송됩니다. 여기서 socket.nickname은 메시지를 보낸 사람의 닉네임이고, message.payload는 메시지 내용입니다.
        // case "nickname": : 메시지의 타입이 "nickname"인 경우 다음 코드를 실행합니다.
        // socket["nickname"] = message.payload; : 메시지를 보낸 사람의 닉네임을 message.payload로 변경합니다.
        // break; : switch 문을 빠져나옵니다. 이 키워드가 없으면, 해당 case 블록 이후의 코드도 실행됩니다.
        // 즉, 클라이언트에서 메시지 타입이 "new_message"로 보내면, 해당 메시지를 서버에 연결된 모든 클라이언트에게 전송하고, 
        // 메시지 타입이 "nickname"인 경우, 메시지를 보낸 사람의 닉네임을 변경하는 작업을 수행합니다.
   
    // socket.send("안녕?"); : 클라이언트와 연결이 성공하면 클라이언트에게 "안녕?" 메시지를 보냅니다. 

// server.listen(3000, handelListen); : HTTP 서버를 3000번 포트에서 시작하고, 리스닝을 시작하면 handelListen 함수를 호출합니다.

const sockets = [];

wss.on("connection", (socket) => {
    console.log("socket", socket);
    console.log("socket" + socket);
    sockets.push(socket);
    socket["nickname"] = "익명"; 
    console.log("브라우저와 연결되었습니다.");
    socket.on("close", () => console.log("서버 > 서버와 연결이 끊겼습니다."));
    socket.on("message", (msg) => { 
        const message = JSON.parse(msg);
        console.log(message.type, message.payload); // 클라이언트에서 받은 JSON 타입의 key값을 받아서 value를 반환
        // console.log(`[서버] : ${message}`); // 클라이언트에서 받은 메세지
        // socket.send(`[서버] : ${message}`); // 클라이언트에서 받은 메세지를 클라이언트로 보내는 메시지
        // sockets.forEach(aSocket => aSocket.send(`${message}`)); // 클라이언트에서 받은 메세지를 소켓에 연결된 모든 클라이언트로 보내는 메세지

        switch(message.type) {
            case "new_message":
                // sockets.forEach(aSocket => aSocket.send(`${message.payload}`));
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}:${message.payload}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload
                break;                
        }
    })
    // socket.send("안녕?"); // 클라이언트로 보내는 메세지
});

server.listen(3000, handelListen);