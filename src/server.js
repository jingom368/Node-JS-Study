import express from 'express';
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req,res) => res.render("home"));
app.get("/*", (req,res) => res.redirect("/"));

const handelListen = () => console.log("연결 중 http://localhost:3000");
app.listen(3000, handelListen);

// import express from 'express'; : Express 모듈을 불러옵니다. Express는 Node.js를 위한 웹 애플리케이션 프레임워크입니다.
// const app = express(); : Express 인스턴스를 생성하여 app 변수에 저장합니다.

// app.set("view engine", "pug"); : Express 앱의 뷰 엔진을 Pug로 설정합니다. 뷰 엔진은 템플릿 파일을 렌더링하는 역할을 합니다.
// app.set("views", __dirname + "/views"); : Express 앱의 뷰(템플릿 파일)가 있는 디렉토리를 설정합니다. __dirname은 현재 파일의 경로를 나타내는 Node.js 전역 변수입니다.

// app.use() : Express 미들웨어를 등록하는 메서드입니다. 미들웨어는 요청과 응답 사이에 위치하여 요청이 들어올 때마다 실행되는 함수입니다.
// "public" : 이는 라우트의 경로를 지정합니다. 이 코드에서는 "/public" 경로로 들어오는 요청에 대해 미들웨어를 적용하겠다는 의미입니다.
// express.static(__dirname+"/public") : express.static은 Express가 제공하는 빌트인 미들웨어로, 정적 파일을 제공하는 역할을 합니다. 
// 이 코드에서는 __dirname+"/public" 경로에 있는 정적 파일(이미지, CSS 파일, JavaScript 파일 등)을 "/public" 경로로 접근할 수 있도록 설정하고 있습니다

// app.get("/", (req,res) => res.render("home")); : 루트 URL('/')에 GET 요청이 들어오면 home 템플릿을 렌더링하여 응답합니다. req는 요청 객체, res는 응답 객체를 나타냅니다.
// app.get("/*", (req,res) => res.redirect("/")) : 루트 URL('/')를 제외한 모든 URL에 GET 요청이 들어오면 루트 URL('/')로 리다이렉트합니다.

// const handelListen = () => console.log("듣고 있어 http://localhost:3000") : 서버가 3000번 포트에서 리스닝을 시작할 때 콘솔에 메시지를 출력하는 함수를 정의합니다.
// app.listen(3000, handelListen); : Express 앱을 3000번 포트에서 시작하고, 리스닝을 시작하면 handelListen 함수를 호출합니다.