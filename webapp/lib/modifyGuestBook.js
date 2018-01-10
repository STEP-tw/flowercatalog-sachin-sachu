let modifyGuestbook=function(){
}

modifyGuestbook.prototype={
  insertLogoutButton:function(guestPageTemplate,textToreplace){
    let logoutButton=`<form action="logout" method="post"><button type="submit">Logout</button></form>`;
    return guestPageTemplate.replace(textToreplace,logoutButton);
  },

  removeText:function(guestPageTemplate,textToremove){
    return guestPageTemplate.replace(textToremove,'');
  },

  insertLoginButton:function(guestPageTemplate,textToreplace){
    let loginButton= `<button onclick="window.location.href='/login.html'">Login</button>`;
    return guestPageTemplate.replace(textToreplace,loginButton);
  },

  addUserName:function(guestPageTemplate,textToreplace, userName){
    let userNameText=`User: ${userName}`;
    return guestPageTemplate.replace(textToreplace, userNameText);
  },

  addCommentTextbox:function(guestPageTemplate,textToreplace){
    let commentTextbox=`<h1>Leave a comment</h1>
    <form action="inputComment" name="commentForm" method="POST">
    Name:
    <input type="text" name="name" required></input>
    <br />
    Comment:
    <textarea rows="10" cols="60" name="comment" required></textarea>
    <br />
    <input type="submit" id="submitButton" value="submit" />
    </form>`;
    return guestPageTemplate.replace(textToreplace, commentTextbox);
  },

  addCommentsToGuestPage:function(guestPageTemplate,textToreplace,commentFileContent){
    let comments=JSON.parse(commentFileContent);
    let pageSource='';
    pageSource+=comments.reverse().reduce((acc,comment)=>{
      let commentRow=`<div>`;
      commentRow+=`Date: ${comment.date}<br>`;
      commentRow+=`Name: ${comment.name}<br>`;
      commentRow+=`Comment: ${comment.comment}<br><br></div>`;
      acc+=commentRow;
      return acc;
    },'');
    return guestPageTemplate.replace(textToreplace,pageSource);
  }
}

module.exports=modifyGuestbook;
