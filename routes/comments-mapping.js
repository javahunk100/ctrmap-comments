
var CommentsController = require("../controllers/comments-controller");
//below is function expression where we are passing e
//instance of express framework as a parameter
module.exports=function(express){
    
    express.post("/tasks/comments",CommentsController.saveComments);
    express.put("/tasks/comments",CommentsController.updateComments);
    
    //find comments by taskid by date in chronological order
    express.get("/tasks/:tastid/comments/",CommentsController.findCommentsByTaskId);
    express.get("/tasks/:tastid/comments/:cid",CommentsController.findCommentsByCommentId);
    express.delete("/tasks/:tastid/comments/:cid",CommentsController.deleteCommentsByCid);
	
    //find all comments
    express.get("/comments",CommentsController.findComments);
     
};