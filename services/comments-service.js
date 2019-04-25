

var CommentEmailService=require('../services/comments-mail-service');
var CommentsDao = require("../persistence/comments-dao");
var AppConfig=require('../config/app-config')
//saving the comments into the database
exports.saveComments=function(comments,callback) {
     CommentsDao.saveComments(comments,function(err,data) {
        if(!err){
            let cdata = [
                {
                    username: "JavaHunk",
                    email: 'javahunk100@gmail.com',
                    taskid: comments.taskid,
                    cemail: AppConfig.cemail,
                    companyName: AppConfig.cname,
                    mobile: AppConfig.cmobile,
                    message:"updated"
                }];
            //code to send notification
            console.log("sending emails..............to the users");
            CommentEmailService.sendEmail(cdata);
            console.log("email has been sent");
        } 
        callback(err,data);
    });
};   

exports.findCommentsByCommentId=function(commentId,callback){
    CommentsDao.findCommentsByCommentId(commentId,function(err,ddata){
        callback(err,ddata);
    });
};

exports.findComments=function(callback){
    CommentsDao.findComments(function(err,ddata){
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
        if(!err){
            let cdata = [
                {
                    username: "JavaHunk",
                    email: 'javahunk100@gmail.com',
                    taskid: comments.taskid,
                    cemail: AppConfig.cemail,
                    companyName: AppConfig.cname,
                    mobile: AppConfig.cmobile,
                    message:"deleted"
                }];
            CommentEmailService.sendEmail(cdata);
        } 
        callback(err);
    });      
};

exports.updateComments=function(comments,callback){
    CommentsDao.updateComments(comments,function(err){
        if(!err){
            let cdata = [
                {
                    username: "JavaHunk",
                    email: 'javahunk100@gmail.com',
                    taskid: comments.taskid,
                    cemail: AppConfig.cemail,
                    companyName: AppConfig.cname,
                    mobile: AppConfig.cmobile,
                    message:"updated"
                }];
            //code to send notification
            CommentEmailService.sendEmail(cdata);
        } 
        callback(err);
    });      
};   