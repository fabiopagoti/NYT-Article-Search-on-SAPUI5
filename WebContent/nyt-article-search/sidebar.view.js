sap.ui.jsview("nyt-article-search.sidebar", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf nyt-article-search.sidebar
	*/ 
	getControllerName : function() {
		return "nyt-article-search.sidebar";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf nyt-article-search.sidebar
	*/ 
	createContent : function(oController) {
		
		this.createLayouts(oController);
		
		this.createPanels(oController);
		
		this.createSearchParameters(oController);

		this.createGraphParametes(oController);
		
		this.createSearchButton(oController);
		
		this.addControlsToLayouts(oController);
		
		this.attachEvents(oController);
		
		return this.lay_sidebar;

	},

	createLayouts: function(oController){
		this.lay_sidebar = new sap.ui.commons.layout.VerticalLayout("lay_sidebar");
		this.lay_parameters = new sap.ui.commons.layout.VerticalLayout("lay_parameters");
		this.lay_options_graphs = new sap.ui.commons.layout.VerticalLayout("lay_options_graphs");
	},
	
	createPanels: function(oController){
		

		this.pan_parameters = new sap.ui.commons.Panel("pan_parameters", 
				{
					text: "Search Parameters"
				});
		
		this.pan_facet_graph = new sap.ui.commons.Panel("pan_facet_graph", 
				{
					text: "Graphs Options"
				});
		
	},
	
	createSearchParameters: function(oController){
		

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
		
	},
	
	createGraphParametes: function(oController){
		
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
		
	},
	
	createSearchButton: function(oController){

		this.but_search = new sap.ui.commons.Button("but_search", 
				{
					text: "Search Articles"
				});
		
	},
	
	addControlsToLayouts: function(oController){
		this.lay_sidebar.addContent(this.pan_parameters);
		this.lay_sidebar.addContent(this.pan_facet_graph);
		
		this.pan_parameters.addContent(this.lay_parameters);
		
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

		this.pan_facet_graph.addContent(this.lay_options_graphs);
		
		this.lay_options_graphs.addContent(this.chk_facet_show_graphs);
		this.lay_options_graphs.addContent(this.chk_facet_filter);
		
		this.lay_parameters.addContent(this.but_search);
	},
	
	attachEvents: function(oController){
		this.but_search.attachPress(null, oController.onSearch, oController);
	},
	
	
});
