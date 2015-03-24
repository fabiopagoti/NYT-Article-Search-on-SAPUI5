sap.ui.jsview("nyt-article-search.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf nyt-article-search.main
	*/ 
	getControllerName : function() {
		return "nyt-article-search.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf nyt-article-search.main
	*/ 
	createContent : function(oController) {
	
		this.createLayouts(oController);
		
		/*
		 * create all controls visible to users
		 */
		
		this.createHeader(oController);
		
		this.embedSidebar(oController);
		
		this.createResults(oController);
		
		this.embedGraphView(oController);
		
		this.addControlsToLayouts(oController);
		
		this.defineBindings(oController);
		
		this.attachEvents(oController);
		
		return this.lay_all;
	},
	

	createLayouts: function(oController){
		

		/*
		 * create all layouts
		 */
		this.lay_all = new sap.ui.commons.layout.VerticalLayout("layout_all");
		
		this.lay_content = new sap.ui.commons.layout.HorizontalLayout("layout_content");
		
		this.lay_results = new sap.ui.commons.layout.VerticalLayout("layout_results");

		this.lay_results_table = new sap.ui.commons.layout.VerticalLayout("layout_results_table");

		this.lay_results_table_footer = new sap.ui.commons.layout.HorizontalLayout("layout_results_table_footer");
		
		this.lay_results_article = new sap.ui.commons.layout.VerticalLayout("layout_results_article");
		
		this.lay_graphs = new sap.ui.commons.layout.HorizontalLayout("layout_graphs");
		
	},
	

	createHeader: function(oController){
		// Title text 
		this.txv_title = new sap.ui.commons.TextView("txv_title", 
				{
					text: "New York Times - Article Search",	
					design: sap.ui.commons.TextViewDesign.H1,
					textAlign: sap.ui.core.TextAlign.Center
				});

	},


	createResults: function(oController){

		// table - search results
		
		this.tab_articles = new sap.ui.table.Table("tab_articles", 
				{
					title: "Articles",
					selectionMode: sap.ui.table.SelectionMode.Single,
					visibleRowCount: 10,
					firstVisibleRow: 0,
					navigationMode: sap.ui.table.NavigationMode.Scrollbar,
				});
			
		this.tab_articles.addColumn(
				new sap.ui.table.Column("col_headline_main",{
					label: new sap.ui.commons.Label( {text: "Headline"} ),
					template: new sap.ui.commons.Link(
							{
									text: "{headline/main}",
									href: "{web_url}",
									target: "_blank"
							}),
					sortProperty: "headline_main",
					filterProperty: "headline_main"
				})
		);
		
		this.tab_articles.addColumn(
				new sap.ui.table.Column("col_type_of_material",{
					label: new sap.ui.commons.Label( {text: "Type of Material"} ),
					template: new sap.ui.commons.TextView().bindProperty("text", "type_of_material"),
					sortProperty: "type_of_material",
					filterProperty: "type_of_material"
				})
		);
		
		this.tab_articles.addColumn(
				new sap.ui.table.Column("col_pub_date",{
					label: new sap.ui.commons.Label( {text: "Pub Date"} ),
					template: new sap.ui.commons.TextView().bindProperty("text", 
							{
								path: "pub_date",
								//type: new sap.ui.model.type.Date(),
								formatter: function(date_time) { return oController.convertDateTimeToDate(date_time); },
							}
					),
					sortProperty: "pub_date",
					filterProperty: "pub_date"
				})
		);
		
		this.tab_articles.addColumn(
				new sap.ui.table.Column("col_pub_time",{
					label: new sap.ui.commons.Label( {text: "Pub Time"} ),
					template: new sap.ui.commons.TextView().bindProperty("text", 
							{
								path: "pub_date", // Yes! Time is extracted from path pub_date. Check the json
								formatter: function(date_time) { return oController.convertDateTimeToTime(date_time); },
							}
					),
					sortProperty: "pub_time",
					filterProperty: "pub_time"
				})
		);

		
//		tab_articles.addColumn(
//				new sap.ui.table.Column("col_document_type",{
//					label: new sap.ui.commons.Label( {text: "Document Type"} ),
//					template: new sap.ui.commons.TextView().bindProperty("text", "document_type")
//				})
//		);
		
//		tab_articles.addColumn(
//				new sap.ui.table.Column("col_id",{
//					label: new sap.ui.commons.Label( {text: "ID"} ),
//					template: new sap.ui.commons.TextView().bindProperty("text", "_id")
//				})
//		);
		
		this.tab_articles.addColumn(
				new sap.ui.table.Column("col_word_count",{
					label: new sap.ui.commons.Label( {text: "Word Count"} ),
					template: new sap.ui.commons.TextView().bindProperty("text", "word_count"),
					sortProperty: "word_count",
					filterProperty: "word_count"
				})
		);
		
		
		
		// Footer
		this.txv_copyright= new sap.ui.commons.TextView("txv_copyright",
				{
					text: "{/copyright}"
				});
		
		this.pag_page_number = new sap.ui.commons.Paginator("pag_page_number", 
				{
					currentPage: 1,
					numberOfPages: 1,
//						 / this.tab_articles.getVisibleRowCount(), // TODO: calculate based on number of hits from JSON
				});
		
		this.txv_hits = new sap.ui.commons.TextView("txv_hits");
		
		
		this.tab_articles.setFooter(this.lay_results_table_footer);
		
		
	},
	
	addControlsToLayouts: function(oController){
		/*
		 *  build screen layout
		 */
		this.lay_all.addContent(this.txv_title);
		this.lay_all.addContent(this.lay_content);
		
		this.lay_content.addContent(this.view_sidebar);
		this.lay_content.addContent(this.lay_results);
	
		this.lay_results.addContent(this.lay_results_table);
		
		this.lay_results_table.addContent(this.tab_articles);
		
		this.lay_results_table_footer.addContent(this.pag_page_number);
		this.lay_results_table_footer.addContent(this.txv_hits);
		this.lay_results_table_footer.addContent(this.txv_copyright);
		
		this.lay_results.addContent(this.lay_results_article);
		
		this.lay_results.addContent(this.view_graphs);
	},
	
	defineBindings: function(oController){
// Table rows
		this.tab_articles.bindRows("/response/docs");
	},
	
	
	attachEvents: function(oController){
		this.pag_page_number.attachPage(null, oController.onPage, oController);
	},
	
	embedGraphView: function(oController){
		 sap.ui.localResources("nyt-article-search");
		 this.view_graphs = sap.ui.view({id:"graph", viewName:"nyt-article-search.graphs", type:sap.ui.core.mvc.ViewType.JS});
	},
	
	embedSidebar: function(oController){
		 sap.ui.localResources("nyt-article-search");
		 this.view_sidebar = sap.ui.view({id:"sidebar", viewName:"nyt-article-search.sidebar", type:sap.ui.core.mvc.ViewType.JS});
	}
	
});
