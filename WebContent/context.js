/**
 * 
 */

/**
 * 
 */

(function(context){ // self-invoking function
	console.log("Context was loaded");
})(this);

var NYT_Article_Search_app = {};

//NYT_Article_Search_app.parameters = function(){
//		this.query = "";
//		this.begin_date = ""; // YYYYMMDD
//		this.end_date = ""; // YYYYMMDD
//		this.sort = ""; // newest | oldest
//};



/*
 * References to APIs and models
 */
NYT_Article_Search_app.url_generator = new NYT.article.URL_Generator("9753c12656e96dca754d7b875494dc9c:14:68901588"); // api-key,
