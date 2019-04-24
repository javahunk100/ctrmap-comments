/**
 *  Define schema for comments sections
 *  connection to the database
 *  This file is known as module
 */
//creating mongoose to define schema
//This mongoose is ORM for 
var mongoose = require('mongoose');
var CommentsSchema  = new mongoose.Schema({
    commentId : { type: String,required: true, unique: true },
    commentBody : { type: String},
    userid : { type: String},
    taskid: { type: String},
    createdTimeStamp : {type: Date},
    updatedTimeStamp: {type: Date},
    },{collection: 'task_comments'});

            //on every save, add the date
    CommentsSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updatedTimeStamp = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.createdTimeStamp){
      this.createdTimeStamp = currentDate;
    } 
    next(); //means go ahead and save it into db now
});

//Here we are registering CommentsSchema as model in mongoose
var CommentsEntity=mongoose.model('task_comments', CommentsSchema);
//exporting object CommentsEntity
module.exports=CommentsEntity;

