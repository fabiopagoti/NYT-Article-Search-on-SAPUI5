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
NYT_Article_Search_app.url_generator = new NYT.article.URL_Generator("bn4Oil58pGPpRsEUPs24SBDGO5GH8Bqi"); // api-key,
NYT_Article_Search_app.articlesModel = new sap.ui.model.json.JSONModel(NYT_Article_Search_app.article_url);

NYT_Article_Search_app.article_url = function() {
	return NYT_Article_Search_app.url_generator.createQuery();
};

NYT_Article_Search_app.refreshArticlesModel = function() {
	NYT_Article_Search_app.articlesModel.loadData(NYT_Article_Search_app.article_url());
};
