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
		
//		lay1.addContent(new sap.ui.commons.TextField({
//			text: "Hello",
//		}));
//		
		
		var graph_title = sap.viz.ui5.types.Title("title", 
				{
					text: "Pie Graph",
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
		var column = new sap.viz.ui5.Column("col",
				{
					title: graph_title,
					width : "800px",
					height : "400px",
					// plotArea : { },
					dataset: dat,
				});
		
		var pie1 =  new sap.viz.ui5.Pie("pie2", 
				{
					title: graph_title,
			         width : "800px",
		             height : "400px",
                    // plotArea : { },
                    dataset: dat,
				});
		
		
		column.setModel(example2);
		pie1.setModel(example2);
		
		
//		var hello = new sap.ui.commons.TextView({
//			id: "id", // sap.ui.core.ID
//			text: 'Hello', // string
//		});
		
		lay1.addContent(column);
		lay1.addContent(pie1);
		
		return lay1; 
	}

});





//if (key == "wi_home_pie") {
//
//    var dataset = new sap.viz.ui5.data.FlattenedDataset({
//
//      dimensions : [ {
//        axis : 1,
//        name : 'Country',
//        value : "{Country}"
//      } ],
//
//      measures : [ {
//        name : 'Revenue',
//        value : { path : 'revenue', formatter : function($) { return 2*$; }}
//      } ],
//
//      data : {
//        path : "/businessData",
//        factory : function() {
//        }
//      }
//
//    });
//
//    var pie = new sap.viz.ui5.Pie({
//      width : "80%",
//      height : "400px",
//      plotArea : {
//      //'colorPalette' : d3.scale.category20().range()
//      },
//      /*
//      title : {
//        visible : true,
//        text : 'Revenue By Country'
//      },*/
//      dataset : dataset
//    });
//
//    // alternative way of setting configuration 
//    pie.getTitle().setVisible(true).setText("Revenue By Country");
//
//    mContent[key] = pie;
//
//  } 