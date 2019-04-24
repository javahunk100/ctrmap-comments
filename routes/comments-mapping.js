
var CommentsController = require("../controllers/comments-controller");
//below is function expression where we are passing e
//instance of express framework as a parameter
module.exports=function(express){
    express.get("/tasks/comments/:tastid",CommentsController.findCommentsByTaskId);
    express.get("/comments/:cid",CommentsController.findCommentsByCommentId);
    express.delete("/comments/:cid",CommentsController.deleteCommentsByCid);
	express.post("/comments",CommentsController.saveComments);
    express.put("/comments",CommentsController.updateComments);
     
};