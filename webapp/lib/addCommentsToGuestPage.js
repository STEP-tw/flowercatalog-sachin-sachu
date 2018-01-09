const addCommentsToGuestPage=function(guestPageSrc, commentFileContent){
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
    let newGuestPage=guestPageSrc.replace('${comments}',pageSource);
    return newGuestPage;
};
exports.addCommentsToGuestPage=addCommentsToGuestPage;
