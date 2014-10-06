/**
 * 
 */

/**
 * 
 */

(function(context){ // self-invoking function
	console.log("Context was loaded");
})(this);

var NYT_Article_Search = {};

NYT_Article_Search.parameters = function(){
		this.query = "";
		this.begin_date = ""; // YYYYMMDD
		this.end_date = ""; // YYYYMMDD
		this.sort = ""; // newest | oldest
};

