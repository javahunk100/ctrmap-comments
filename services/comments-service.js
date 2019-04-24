
var CommentsDao = require("../persistence/comments-dao");

//saving the comments into the database
exports.saveComments=function(comments,callback) {
     CommentsDao.saveComments(comments,function(err,data) {
        callback(err,data);
    });
};   

exports.findCommentsByCommentId=function(commentId,callback){
    CommentsDao.findCommentsByCommentId(commentId,function(err,ddata){
        callback(err,ddata);
    });
};

exports.findCommentsByTaskId=function(taskid,callback) {
    CommentsDao.findCommentsByTaskId(taskid,function(err,comments){
        callback(err,comments);
    });   
};  

exports.deleteCommentsByCid=function(commentid,callback) {
    CommentsDao.deleteCommentsByCommentId(commentid,function(err){
        callback(err);
    });      
};

exports.updateComments=function(comments,callback){
    CommentsDao.updateComments(comments,function(err){
        callback(err);
    });      
};   