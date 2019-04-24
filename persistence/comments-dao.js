
//Importing schema..
var CommentsEntity=require('../odm/comments-entity');


//saving the comments into the database
exports.saveComments=function(comments,callback) {
    var commentsEntity=new CommentsEntity();
    //movie data we have to copy inside movieEntity
    commentsEntity.commentBody=comments.commentBody;
    commentsEntity.userid=comments.userid;
    commentsEntity.taskid=comments.taskid;
    commentsEntity.commentId=comments.commentId;
    commentsEntity.save(function(err,data){
        callback(err,data);
    });
}

exports.findCommentsByTaskId=function(taskid,callback) {
    if(taskId) {
        CommentsEntity.find({taskid:taskid}.sort({createdTimeStamp: 'desc'}),function(err,data){
            callback(err,data);
    });
    }else{
        CommentsEntity.find({},function(err,data){
            callback(err,data);
    });
    }
}  


/**
 * _mid is  mongodb id
 */
exports.findCommentsById=function(_mid,callback) {
    CommentsEntity.findById(_mid,function(err,data){
        callback(err,data);
          });
        
}  


exports.findCommentsByCommentId=function(commentId,callback) {
    CommentsEntity.findOneAndRemove({commentId: commentId}, function(err){
        callback(err);
    });    
}  

exports.findComments=function(callback) {
    CommentsEntity.find({}, function(err,data){
        callback(err,data);
    });    
} 



exports.deleteCommentsByCommentId=function(commentId,callback) {
    CommentsEntity.findOneAndRemove({commentId: commentId}, function(err){
        callback(err);
    });    
}  

exports.deleteCommentsByMid=function(pmid,callback) {
    CommentsEntity.findOneAndRemove({mid: pmid}, function(err){
        callback(err);
    });    
}  

exports.updateComments=function(comments,callback){
    console.log('updateing');
    if(comments.commentId!=undefined){
        CommentsEntity.updateOne({commentId:comments.commentId},{
            commentBody:comments.commentBody,
            userid:comments.userid,
            taskid:comments.taskid
        },(err)=>{
            callback(err);
        });
    }
    else{
        callback("invalid update operation");
    }
}