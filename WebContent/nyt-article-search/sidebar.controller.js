sap.ui.controller("nyt-article-search.sidebar", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf nyt-article-search.sidebar
	 */
	onInit : function() {
		jQuery.sap.registerModulePath("app", "context");
		jQuery.sap.require("app");
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf nyt-article-search.sidebar
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf nyt-article-search.sidebar
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf nyt-article-search.sidebar
	 */
	// onExit: function() {
	//
	// }

	/*
	 * User actions
	 */

	onSearch : function(event) {
		NYT_Article_Search_app.url_generator.q = this.getView().txf_query.getValue();
		NYT_Article_Search_app.url_generator.begin_date = this.getView().dtp_begin_date.getYyyymmdd();
		NYT_Article_Search_app.url_generator.end_date = this.getView().dtp_end_date.getYyyymmdd();
		NYT_Article_Search_app.url_generator.sort = this.getView().cob_sort.getSelectedKey();

		// Graphs on/off
		if (this.getView().chk_facet_show_graphs.getChecked() == true) {
			NYT_Article_Search_app.url_generator.setAllFacets();
		} else {
			NYT_Article_Search_app.url_generator.removeAllFacets();
		}

		// facet filter
		NYT_Article_Search_app.url_generator.facet_filter = this.getView().chk_facet_filter.getChecked();
		NYT_Article_Search_app.url_generator.page = 0;
		
		NYT_Article_Search_app.refreshArticlesModel();
		
		this.getView().fireEvent("search", null);
	},

});