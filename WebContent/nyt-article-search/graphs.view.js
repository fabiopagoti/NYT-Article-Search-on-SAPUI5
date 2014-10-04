sap.ui.jsview("nyt-article-search.graphs", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf nyt-article-search.graphs
	*/ 
	getControllerName : function() {
		return "nyt-article-search.graphs";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf nyt-article-search.graphs
	*/ 
	createContent : function(oController) {
		
		var lay1 = new sap.ui.commons.layout.HorizontalLayout();
		
		var graph_title = sap.viz.ui5.types.Title("title", 
				{
					text: "Pie Graph",
					visible: true,
				});
		
		
		var example2 = new sap.ui.model.json.JSONModel("../examples/example2.json");
		
		var dat = new sap.viz.ui5.data.FlattenedDataset("dat", 
				{
			
					dimensions: [new sap.viz.ui5.data.DimensionDefinition(
					{
						axis: 1,
						value: "{term}",
						name: "Term",
					})],
					
					measures: [new sap.viz.ui5.data.MeasureDefinition(
							{
								value: "{count}",
								name: "Count",
							})],
							
					data : {
						path : "/response/facets/day_of_week/terms",
						factory : function() {
		                }
		
						}							
							
				});
		
		var pie =  new sap.viz.ui5.Pie("pie", 
				{
					title: graph_title,
			         width : "800px",
		             height : "400px",
                    // plotArea : { },
                    dataset: dat,
				});
		
		
		
		pie.setModel(example2);
		
		
		lay1.addContent(pie);
		
		return lay1; 
	}

});
