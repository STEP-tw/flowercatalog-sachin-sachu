const Comment=require('./comment.js');
const fs=require('fs');

const Comments=function(commentsArray){
  console.log('here');
  this.comments=commentsArray;
}

Comments.prototype.addComment=function(commentUrl){
  this.comments.push(new Comment(commentUrl));
};

Comments.prototype.getCommentList=function(){
  return this.comments;
};

Comments.protorype.commentToHTML=function(){
  let commentsInHTML='<div>';
  commentsInHTML+=this.comments.map((commentObj)=>{
    let commentInHTML='<div>';
    commentInHTML+=commentObj.toHTML();
    commentInHTML='</div>';
  }).join('');
  commentsInHTML+='</div>'
};


module.exports=Comments;
