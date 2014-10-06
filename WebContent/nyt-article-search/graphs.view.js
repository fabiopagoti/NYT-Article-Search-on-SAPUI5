sap.ui.jsview("nyt-article-search.graphs", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf nyt-article-search.graphs
	 */
	getControllerName : function() {
		return "nyt-article-search.graphs";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf nyt-article-search.graphs
	 */
	createContent : function(oController) {

		var lay_graphs = new sap.ui.commons.layout.VerticalLayout("lay_graphs");
		
		var lay_options = new sap.ui.commons.layout.HorizontalLayout();

		var lab_facet = new sap.ui.commons.Label("lab_facet", {
			text : "Facet",
			labelFor : "cob_facet",
		});

		var cob_facet = new sap.ui.commons.ComboBox("cob_facet", {
			selectedKey : "secion_name",

			items : [ new sap.ui.core.ListItem("lsi_facet_section_name", {
				text : "Section Name",
				key : "section_name",
			}),

			new sap.ui.core.ListItem("lsi_facet_subsection_name", {
				text : "Subsection Name",
				key : "subsection_name",
			}),

			new sap.ui.core.ListItem("lsi_facet_document_type", {
				text : "Document Type",
				key : "document_type",
			}),

			new sap.ui.core.ListItem("lsi_facet_type_of_material", {
				text : "Type of Material",
				key : "type_of_material",
			}),

			new sap.ui.core.ListItem("lsi_facet_source", {
				text : "Source",
				key : "source",
			}), new sap.ui.core.ListItem("lsi_facet_day_of_week", {
				text : "Day of Week",
				key : "day_of_week",
			}), new sap.ui.core.ListItem("lsi_facet_pub_year", {
				text : "Pub Year",
				key : "pub_year",
			}), new sap.ui.core.ListItem("lsi_facet_pub_month", {
				text : "Pub Month",
				key : "pub_month",
			}),

			],

		});

		var graph_title = sap.viz.ui5.types.Title("title", {
			text : "Pie Graph",
			visible : true,
		});

		var example2 = new sap.ui.model.json.JSONModel("../examples/example2.json");

		var dat = new sap.viz.ui5.data.FlattenedDataset("dat", {

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
				path : "/response/facets/day_of_week/terms",
				factory : function() {
				}

			}

		});

		var pie = new sap.viz.ui5.Pie("pie", {
			title : graph_title,
			width : "800px",
			height : "400px",
			// plotArea : { },
			dataset : dat,
		});

		pie.setModel(example2);

		lay_graphs.addContent(lay_options);
		lay_graphs.addContent(pie);

		lay_options.addContent(lab_facet);
		lay_options.addContent(cob_facet);

		return lay_graphs;
	}

});
