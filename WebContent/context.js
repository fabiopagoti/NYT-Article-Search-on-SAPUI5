/**
 * 
 */

/**
 * 
 */

(function(context) { // self-invoking function
	console.log("Context was loaded");
})(this);

NYT_Article_Search_app = function() {

};

/*
 * References to APIs and models
 */
NYT_Article_Search_app.url_generator = new NYT.article.URL_Generator("9753c12656e96dca754d7b875494dc9c:14:68901588"); // api-key,
NYT_Article_Search_app.articlesModel = new sap.ui.model.json.JSONModel(NYT_Article_Search_app.article_url);

NYT_Article_Search_app.article_url = function() {
	return NYT_Article_Search_app.url_generator.createQuery();
};

NYT_Article_Search_app.refreshArticlesModel = function() {
	NYT_Article_Search_app.articlesModel.loadData(NYT_Article_Search_app.article_url());
};
