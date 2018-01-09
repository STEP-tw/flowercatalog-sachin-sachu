const fs = require('fs');
const http = require('http');
const queryString=require('querystring');
const PORT = 8888;

const timeStamp = require('./webapp/lib/time.js').timeStamp;
const WebApp = require('./webapp/lib/webapp.js');
const Resource=require('./webapp/lib/resourceMetaData.js');
const addCommentsToGuestPage=require('./webapp/lib/addCommentsToGuestPage.js').addCommentsToGuestPage;

let registered_users = [{userName:'a',name:'AAA'},{userName:'bhanutv',name:'Bhanu Teja Verma'},{userName:'harshab',name:'Harsha Vardhana'}];
let staticResources=[
  '/',
  '/index.html',
  '/animateFlowerPot.js',
  '/index.css',
  '/freshorigins.jpg',
  '/animated-flower-image-0021.gif',
  '/guestBook.css',
  '/abeliophyllum.html',
  '/abeliophyllum.css',
  '/pbase-Abeliophyllum.jpg',
  '/ageratum.html',
  '/pbase-agerantum.jpg',
  '/Abeliophyllum.pdf',
  '/Ageratum.pdf',
  '/login.css'
];

const makeCommentObject=(querystring, dateAndTime)=>{
  console.log(querystring);
  let commentObj=queryString.parse(querystring);
  commentObj.date=dateAndTime;
  return commentObj;
};

const saveCommmments=function(req){
  console.log('saving comments');
  let dateAndTime=new Date().toLocaleString();
  let commentObj=new Resource('comments.txt');
  let comments=JSON.parse(fs.readFileSync(commentObj.getFilePath(),commentObj.getEncoding()));
  comments.push(makeCommentObject(req.queryString,dateAndTime));
  fs.writeFileSync(commentObj.getFilePath(),JSON.stringify(comments));
};

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
  `${timeStamp()}`,
  `${req.method} ${req.url}`,
  `HEADERS=> ${toS(req.headers)}`,
  `COOKIES=> ${toS(req.cookies)}`,
  `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/inputComment']) && !req.user) res.redirect('/login.html');
}

let redirectLoggedOutUserToGuest= (req,res)=>{
  if(req.urlIsOneOf(['/logout']) && !req.user) res.redirect('/guestBook.html');
}

let app = WebApp.create();

const addHandlerForStaticResource=function(){
  staticResources.map((staticResource)=>{
    let resource=new Resource(staticResource);
    app.get(staticResource,(req,res)=>{
      res.setHeader('Content-type',resource.getContentType());
      let content=fs.readFileSync(resource.getFilePath(),resource.getEncoding());
      res.write(content);
      res.end();
    });
  });
};

app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedOutUserToGuest);
app.use(redirectLoggedOutUserToLogin);
addHandlerForStaticResource();
app.get('/login.html',(req,res)=>{
  res.setHeader('Content-type','text/html');
  if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  let login=new Resource('/login.html');
  res.write(fs.readFileSync(login.getFilePath(),login.getEncoding()));
  res.end();
});
app.post('/login.html',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/guestBook.html');
});
app.post('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/guestBook.html');
});

const insertLogoutButton=function(pageTemplate,textToreplace){
  let logoutButton=`<form action="logout" method="post"><button type="submit">Logout</button></form>`;
  return pageTemplate.replace(textToreplace,logoutButton);
}

const addUserName=function(pageTemplate, textToreplace, userName){
  let userNameText=`User: ${userName}`;
  return pageTemplate.replace(textToreplace, userNameText);
}

app.get('/guestBook.html',(req,res)=>{
  res.setHeader('Content-type','text/html');
  let comments=fs.readFileSync('./webapp/data/comments.txt','utf8');
  let guestTemplate=fs.readFileSync('./webapp/public/template/guestBook.html.template','utf8');
  guestPageSrc=addCommentsToGuestPage(guestTemplate,comments);
  if(!req.user){
    guestPageSrc=guestPageSrc.replace('${logout}','');
    guestPageSrc=guestPageSrc.replace('${userName}','');
  }else{
    guestPageSrc=addUserName(guestPageSrc,'${userName}',req.user.userName);
    guestPageSrc=insertLogoutButton(guestPageSrc, '${logout}');
  }
  res.write(guestPageSrc);
  res.end();
});

app.post('/inputComment',(req,res)=>{
  saveCommmments(req);
  res.redirect('/guestBook.html');
});

let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
