const qs=require('querystring');

const Comment=function(commentUrl){
  this.commentUrl=commentUrl;
  this.commentObj={};
  // this.commentObj=makeCommentObject(this.commentUrl);
};

Comment.protoype.getCommentObject=function(){
  return this.commentObj;
};

Comment.prototype.toHTML=function(){
  let commentHTML=`<div>`;
  commentHTML+=`${this.commentObj.date}<hr>`;
  commentHTML+=`${this.commentUrl.name}<hr>`;
  commentHTML+=`${this.commentUrl.comment}<hr></div>`;
  return commentHTML;
};

const makeCommentObject=function(commentUrl){
  let date=new Date().toLocaleString();
  let commentObj=qs.parse(commentUrl);
  commentObj.date=date;
  return commentObj;
};

module.exports=Comment;
