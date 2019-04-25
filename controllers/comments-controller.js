var CommentsService = require("../services/comments-service");

//to generate unique id
var uniqid = require('uniqid');

var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '768819',
    key: 'c4f2c2977c698d3a9e2e',
    secret: 'c6986c861a76f2c19383',
    cluster: 'ap2',
    encrypted: true
  });
  

/**
 * This method is used to save comments
 * 
 * */
exports.saveComments=function(req,res) {
     //reading form data coming from request body
    var comments=req.body;
    console.log(comments);
    //setting unique commentid
    comments.commentId=uniqid();
    CommentsService.saveComments(comments,function(err,data){
        if(err){
            const response={status:"fail",message:err};
            res.status(500).json(response);
        }else{

            pusher.trigger('task-comments', 'new_comment', comments);
            console.log(data);
            const message={status:"success",message:"Comment is saved successfully",_id:data._id};
            return res.status(200).send(message);
        }
    });
};

exports.findCommentsByCommentId=function(req,res) {
        var commentId=req.query.commentId;
        CommentsService.findCommentsByCommentId(commentId,function(err,ddata){
                if(err){
                    var response={status:"fail",message:err};
                    res.json(response);
                }else{
                    var response={status:"success",data:ddata};
                    res.json(response);
                }
            });
        
};

//task id is coming as a part of URI
exports.findCommentsByTaskId=function(req,res) {
    var taskid=req.params.taskid;
    CommentsService.findCommentsByTaskId(taskid,function(err,comments){
        if(err){
            const response={status:"fail",message:err};
            res.status(500).json(response);
        }else{
            res.send(comments);         
        }
    });
};


//@PathVariable
///comments/3123123
//express.delete("/comments/:cid"
exports.deleteCommentsByCid=function(req,res) {
    var cid=req.params.cid;
    console.log("cid = "+cid);
     if(cid==undefined){
        const response={status:"fail",message:"cid cannot be empty"};
        res.status(500).json(response);
    }
    CommentsService.deleteCommentsByCommentId(cid,function(err){
        if(err){
            const response={status:"fail",message:err};
            res.status(500).json(response);
        }else{
            const response = {
                message: "comment is deleted successfully with comment id "+cid,
                status: "success"
            };
            return res.status(200).send(response);
        }
    });
};

exports.updateComments=function(req,res){
    //reading  data coming from request body
    var comments=req.body;
    CommentsService.updateComments(comments,function(err){
        if(err){
            var message={status:"fail",message:err};
            res.json(message);
        }else{
            var message={status:"success",message:"Comments is updated successfully"};
            res.json(message);
        }
    });
}


exports.findComments=function(req,res) {
    CommentsService.findComments(function(err,ddata){
            if(err){
                var response={status:"fail",message:err};
                res.json(response);
            }else{
                var response={status:"success",data:ddata};
                res.json(response);
            }
        });
    
};
