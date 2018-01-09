const Resource=function(resourceName){
  this.resourceName=resourceName;
};

Resource.prototype.getEncoding=function(){
  return encoding[getFileExtention(this.resourceName)];
};

Resource.prototype.getContentType=function(){
  return contentTypes[getFileExtention(this.resourceName)];
};

Resource.prototype.getFilePath=function(){
  return filePaths[this.resourceName];
};

const getFileExtention=function(resourceName){
  return resourceName.split('.')[1];
};

const filePaths={
  '/':'./webapp/public/doc/index.html',
  '/index.html':'./webapp/public/doc/index.html',
  '/animateFlowerPot.js':'./webapp/public/js/animateFlowerPot.js',
  '/index.css':'./webapp/public/css/index.css',
  '/freshorigins.jpg':'./webapp/public/img/freshorigins.jpg',
  '/animated-flower-image-0021.gif':'./webapp/public/img/animated-flower-image-0021.gif',
  '/guestBook.css':'./webapp/public/css/guestBook.css',
  '/abeliophyllum.html':'./webapp/public/doc/abeliophyllum.html',
  '/abeliophyllum.css':'./webapp/public/css/abeliophyllum.css',
  '/pbase-Abeliophyllum.jpg':'./webapp/public/img/pbase-Abeliophyllum.jpg',
  '/ageratum.html':'./webapp/public/doc/ageratum.html',
  '/pbase-agerantum.jpg':'./webapp/public/img/pbase-agerantum.jpg',
  '/Abeliophyllum.pdf':'./webapp/public/pdf/Abeliophyllum.pdf',
  '/Ageratum.pdf':'./webapp/public/pdf/Ageratum.pdf',
  '/login.html': './webapp/public/doc/login.html',
  '/login.css': './webapp/public/css/login.css',
  'comments.txt': './webapp/data/comments.txt'
};

const contentTypes={
  undefined:'text/html',
  'html':'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'gif': 'image/gif',
  'jpg': 'image/jpg',
  'ico': 'image/ico',
  'pdf': 'application/pdf'
};

const encoding={
  undefined:'utf8',
  'html':'utf8',
  'css': 'utf8',
  'js': 'utf8',
  'txt': 'utf8',
  'ico':undefined,
  'gif': undefined,
  'jpg': undefined,
  'pdf': undefined
};

module.exports=Resource;
