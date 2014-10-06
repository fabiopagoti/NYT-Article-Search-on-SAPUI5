sap.ui.controller("nyt-article-search.graphs", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf nyt-article-search.graphs
	 */

//	dataset_graph : new sap.viz.ui5.data.FlattenedDataset("dataset_graph", {
//
//		dimensions : [ new sap.viz.ui5.data.DimensionDefinition({
//			axis : 1,
//			value : "{term}",
//			name : "Term",
//		}) ],
//
//		measures : [ new sap.viz.ui5.data.MeasureDefinition({
//			value : "{count}",
//			name : "Count",
//		}) ],
//
//		data : {
//			path : "/response/facets/" + "day_of_week" + "/terms",
//		},
//
//	}),
	dataset_graph2 : function(facet_name){
		return new sap.viz.ui5.data.FlattenedDataset({
	
		
		dimensions : [ new sap.viz.ui5.data.DimensionDefinition({
			axis : 1,
			value : "{term}",
			name : "Term",
		}) ],
		
		measures : [ new sap.viz.ui5.data.MeasureDefinition({
			value : "{count}",
			name : "Count",
		}) ],
		
		data : {
			path : "/response/facets/" + facet_name + "/terms",
		},
		
	});
	},
	

	setFacetDataPath : function(facet_name) {
		this.dataset_graph.removeAllData();
		this.dataset_graph.insertData({path : "/response/facets/" + facet_name + "/terms", });
	},

	onInit : function() {
		jQuery.sap.registerModulePath("app", "context");
		jQuery.sap.require("app");

		this.updateChartBasedOnFacetName();
		sap.ui.getCore().byId("graph_facet").setModel(NYT_Article_Search_app.articlesModel);

		sap.ui.getCore().byId("cob_facet").attachChange(null, this.onFacetChange, this);
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf nyt-article-search.graphs
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf nyt-article-search.graphs
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf nyt-article-search.graphs
	 */
	// onExit: function() {
	//
	// }


	onFacetChange : function(oEvent) {
		this.updateChartBasedOnFacetName();
	},
	
	updateChartBasedOnFacetName: function(){
		sap.ui.getCore().byId("graph_facet").setDataset(this.dataset_graph2(sap.ui.getCore().byId("cob_facet").getSelectedKey()));
	}

});