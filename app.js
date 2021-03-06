var express  	    =require("express"),
	app      	    =express();
	bodyParser		=require("body-parser"),
	mongoose  		=require("mongoose"),
	methodOverride	=require("method-override");


app.use(express.static("public"));
 mongoose.connect("mongodb://localhost/rest_app");
 app.set("view engine","ejs");
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(methodOverride("_method"));

//MONGOOSE SCHEMA
 var bodySchema=new mongoose.Schema({
 title: String,
 image: String,
 body : String,
	created : {type:Date,default:Date.now}
 });
 var Blog=mongoose.model("Blog",bodySchema);


 
app.get("/",function(req,res){
	res.redirect("/blogs");
});

//INDEX
app.get("/blogs",function(req,res){
	Blog.find({},function(error,blog){
		if(error)
		{
			res.send("eroor");
		}
		else
		{
		res.render("index",{blog:blog});
		}
	});
});

//NEW
app.get("/blogs/new",function(req,res){
res.render("new");});

//CREATE
app.post("/blogs",function(req,res){
	Blog.create(req.body.blog,function(err,newpost){
		if(err)
		{
			res.render("new");
		}
		else
		{
		res.redirect("/blogs");
		}
	});
});

//show
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show",{  blog:foundBlog});
		}
	});
});

//EDIT 
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("edit",{blog:foundBlog});
		}
	});
});

//UPDATE
app.put("/blogs/:id",function(req,res){
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedData){
		if(err){
			res.redirect("/blogs");}
	    else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
}) ;

//DELETE
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs");}
		else{
			res.redirect("/blogs");}
	});
});

//SERVER
app.listen(3000,function(){
console.log("Server is running!!");});