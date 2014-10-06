sap.ui.controller("nyt-article-search.main", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf nyt-article-search.main
	 */

	article_url : function() {
		return NYT_Article_Search_app.url_generator.createQuery();
	},

	articlesModel : {},

	onInit : function() {
		jQuery.sap.registerModulePath("app", "context");
		jQuery.sap.require("app");

		
		this.getView().view_sidebar.attachEvent("search", null, this.reactOnSearch, this); // search event comes from sidebar view
		
		this.articlesModel = new sap.ui.model.json.JSONModel(this.article_url()),

		this.articlesModel.attachRequestCompleted(null, this.bindPaginator, this);

		this.articlesModel.attachRequestCompleted(null, this.bindNumberOfHits, this);

		this.setModels();

	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf nyt-article-search.main
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf nyt-article-search.main
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf nyt-article-search.main
	 */
	// onExit: function() {
	//
	// }
	
	onPage : function(oControlEvent) {
		NYT_Article_Search_app.url_generator.page = this.getView().pag_page_number.getCurrentPage() - 1; // page on API starts with zero
		this.refreshArticlesModel();
	},

	reactOnSearch: function(oEvent){
		this.refreshArticlesModel();
		this.buildGraphs();
		this.resetPaginator();
	},
	
	/*
	 * UI Handling
	 */
	resetPaginator : function() {
//		this.url_generator.page = 0;
		NYT_Article_Search_app.url_generator.page = 0;
		this.getView().pag_page_number.setCurrentPage(1);
	},

	buildGraphs : function() {
		// Graphs on/off
		if (this.getView().chk_facet_show_graphs.getChecked() == true) {
			NYT_Article_Search_app.url_generator.setAllFacets();
		} else {
			NYT_Article_Search_app.url_generator.removeAllFacets();
		}

		// facet filter

		NYT_Article_Search_app.url_generator.facet_filter = this.getView().chk_facet_filter.getChecked();
	},

	/*
	 * Bindings
	 */
	bindPaginator : function() {
		var v_hits = this.getFromModelNumberOfHits();
		if (v_hits >= 1000) {
			this.getView().pag_page_number.setNumberOfPages(100); 
//			API has a limit of 100 pages, so there is no point of binding a page which cannot be displayed
		} else {
			this.getView().pag_page_number.bindProperty("numberOfPages", {
				path : "/response/meta/hits",
				formatter : this.calculateNumberOfPages,
				parameters : {
					"rows" : this.getView().tab_articles.getVisibleRowCount()
				},
			});
		}

	},

	bindNumberOfHits : function() {
		this.getView().txv_hits.bindText("/response/meta/hits", function(_hits) {
			return _hits + " results" + "\r\r"; // while there is no CSS... sorry about that
		});
	},

	/*
	 * Model util
	 */

	refreshArticlesModel : function() {
		this.articlesModel.loadData(this.article_url());
	},

	setModels : function() {
		this.getView().tab_articles.setModel(this.articlesModel);
		this.getView().pag_page_number.setModel(this.articlesModel);
		this.getView().txv_hits.setModel(this.articlesModel);
		this.getView().txv_copyright.setModel(this.articlesModel);
	},

	getFromModelNumberOfHits : function() {
		return this.articlesModel.getProperty("/response/meta/hits");
	},

	/*
	 * Formatters
	 */

	convertDateTimeToDate : function(date_time) {
		if (date_time != null) {
			// var formattedDate = new sap.ui.model.type.Date();
			return date_time.toString().substring(0, 10);
		}

	},

	convertDateTimeToTime : function(date_time) {
		if (date_time != null) {
			// var formattedTime = new sap.ui.model.type.Time();
			return date_time.toString().substring(11, 19);
		}

	},

	calculateNumberOfPages : function(_hits) {
		var param_rows = this.getBindingInfo("numberOfPages").parameters.rows;
		return Math.ceil(_hits / param_rows);
	},

});