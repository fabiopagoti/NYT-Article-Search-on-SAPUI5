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
		
		this.createParameters(oController);
		
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
		
		this.lay_parameters = new sap.ui.commons.layout.VerticalLayout("layout_parameters");

		this.lay_parameter_graphs = new sap.ui.commons.layout.VerticalLayout("layout_parameters_graphs");
		
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


	createParameters: function(oController){
				
		// Parameter bar
		
		// Query term
		
		this.lab_query = new sap.ui.commons.Label("lab_query", 
				{
					text: "Seach Term",
					labelFor: "txf_query"
				}
		);
		
		// Search field
		
		this.txf_query = new sap.ui.commons.TextField("txf_query", {
			value: "",
			maxLength: 30,
			// liveChange: TODO: why not create an "instant New york times"?
		});
		
		
		// Date pickers (begin/end date)
		
		this.lab_begin_date = new sap.ui.commons.Label("lab_begin_date", 
				{
					text: "Begin Date",
					labelFor: "dtp_begin_date"
				}
		);
		
		this.dtp_begin_date = new sap.ui.commons.DatePicker("dtp_begin_date", 
				{
					yyyymmdd: "18510918"
				});
		
		
		this.lab_end_date = new sap.ui.commons.Label("lab_end_date", 
				{
					text: "End Date",
					labelFor: "dtp_end_date"
				}
		);
		
		this.dtp_end_date = new sap.ui.commons.DatePicker("dtp_end_date", 
				{
					yyyymmdd: "20141231"
				});
		
		
		// Sort
		
		this.lab_sort = new sap.ui.commons.Label("lab_sort", 
				{
					text: "Sort",
					labelFor: "cob_sort"
				}
		);
		
		this.lsi_sort_newest = new sap.ui.core.ListItem("lsi_sort_newest");
		this.lsi_sort_newest.setText("Newest");
		this.lsi_sort_newest.setKey("newest");
		

		this.lsi_sort_oldest = new sap.ui.core.ListItem("lsi_sort_oldest");
		this.lsi_sort_oldest.setText("Oldest");
		this.lsi_sort_oldest.setKey("oldest");
		
		this.cob_sort = new sap.ui.commons.ComboBox("cob_sort",
				{
					selectedKey: this.lsi_sort_newest.getKey(),
					items: [ this.lsi_sort_oldest, this.lsi_sort_newest ]
				});
		
		// show graphs
		this.pan_facet_graph = new sap.ui.commons.Panel("pan_facet_graph", 
				{
					text: "Graphs Options"
				});
		
		this.chk_facet_show_graphs = new sap.ui.commons.CheckBox("chk_facet_show_graphs", 
				{
					selected: true,
					name: "chk_facet_show_graphs",
					text: "Show Graphs"
				});
		
		this.chk_facet_filter = new sap.ui.commons.CheckBox("chk_facet_filter", 
				{
					selected: true,
					name: "chk_facet_filter",
					text: "Graphs based on filter"
				});
		
		
		// api-key
		
		this.lab_api_key = new sap.ui.commons.Label("lab_api_key", 
				{
					text: "API-Key",
					labelFor: "txf_api_key"
				}
		);
		
		this.txf_api_key = new sap.ui.commons.TextField("txf_api_key", 
				{
					value: "9753c12656e96dca754d7b875494dc9c:14:68901588",
					required: true,
					editable: false
				});
		
		
		this.but_search = new sap.ui.commons.Button("but_search", 
				{
					text: "Search Articles"
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
		
		this.lay_content.addContent(this.lay_parameters);
		
		this.lay_parameters.addContent(this.lab_query);
		this.lay_parameters.addContent(this.txf_query);
		
		this.lay_parameters.addContent(this.lab_begin_date);
		this.lay_parameters.addContent(this.dtp_begin_date);
		
		this.lay_parameters.addContent(this.lab_end_date);
		this.lay_parameters.addContent(this.dtp_end_date);

		this.lay_parameters.addContent(this.lab_sort);
		this.lay_parameters.addContent(this.cob_sort);
		
		this.lay_parameters.addContent(this.lab_api_key);
		this.lay_parameters.addContent(this.txf_api_key);

		this.lay_parameters.addContent(this.pan_facet_graph);
		
		this.pan_facet_graph.addContent(this.lay_parameter_graphs);
		
		this.lay_parameter_graphs.addContent(this.chk_facet_show_graphs);
		this.lay_parameter_graphs.addContent(this.chk_facet_filter);
		
		this.lay_parameters.addContent(this.but_search);
		
		this.lay_content.addContent(this.lay_results);
		
		this.lay_results.addContent(this.lay_results_table);
		
		this.lay_results_table.addContent(this.tab_articles);
		
		this.lay_results_table_footer.addContent(this.pag_page_number);
		this.lay_results_table_footer.addContent(this.txv_hits);
		this.lay_results_table_footer.addContent(this.txv_copyright);
		
		this.lay_results.addContent(this.lay_results_article);
		
		this.lay_results.addContent(this.lay_graphs);
	},
	
	defineBindings: function(oController){
// Table rows
		
		this.tab_articles.bindRows("/response/docs");
		
	},
	
	
	attachEvents: function(oController){
		this.but_search.attachPress(null, oController.onSearch, oController);
		this.pag_page_number.attachPage(null, oController.onPage, oController);
	},
	
	embedGraphView: function(oController){
		 //debugger;
		 sap.ui.localResources("nyt-article-search");
		 var view_hello = sap.ui.view({id:"graph", viewName:"nyt-article-search.graphs", type:sap.ui.core.mvc.ViewType.JS});
		 view_hello.placeAt(this.lay_graphs);
	}
	
	
});
