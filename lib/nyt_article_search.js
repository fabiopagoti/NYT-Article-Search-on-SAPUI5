/**
 * 
 */

(function(context){ // self-invoking function
	console.log("Lib was loaded");
})(this);


var NYT = {};

NYT.article = {};

NYT.article.URL_Generator = function (_api_key) 	
	{
	
		this.base_url = function (){
			return "http://api.nytimes.com/svc/search/v2/articlesearch.json?";
		};
		
		// Query parameters
		this.api_key = _api_key;
		
		this.q = "";
		this.fq = {};
		this.begin_date = ""; // YYYYMMDD
		this.end_date = ""; // YYYYMMDD
		this.sort = ""; // newest | oldest
		
		this.fl = [];
		
		/* 'fl' possible values
		 * 	web_url
			snippet
			lead_paragraph
			abstract
			print_page
			blog
			source
			multimedia
			headline
			keywords
			pub_date
			document_type
			news_desk
			byline
			type_of_material
			_id
			word_count
		 */
		
		this.hl = false;
		this.page = 0;
		
		/*
		 * Facet Field Possible Values
		 * section_name
		 * subsection_name
		 * document_type 
		 * type_of_material 
		 * source 
		 * day_of_week 
		 * pub_year
		 * pub_month
		 */
		this.facet_fields = [];
		
		this.facet_filter = false;
		
		this.callback = "svc_search_v2_articlesearch";
		this.response_format = "json"; // jsonp
			
	};

	
	NYT.article.URL_Generator.prototype.createQueryParam = function(property, param){
		if (property != "") {
			return "&" + param + "=" + property;
		} else {
			return "";
		}
	};
	
	NYT.article.URL_Generator.prototype.createQueryArrayParam = function(arrayProperty, param){
		if (arrayProperty == null || arrayProperty == undefined || arrayProperty.length == 0) {
			return "";
		}
		var url_param = "&" + param + "=";		
		for (var i_property = 0; i_property < arrayProperty.length; i_property++) {
			if (i_property == 0) {
				url_param = url_param + arrayProperty[i_property];				
			} else {
				url_param = url_param + "," + arrayProperty[i_property];				
			}
		}
		return url_param;
	};
	
		
	
	NYT.article.URL_Generator.prototype.createQuery = function createQuery(){
		
		var url = 
			this.base_url() +
			this.createQueryParam(this.q, "q") +
			this.createQueryParam(this.begin_date, "begin_date") +
			this.createQueryParam(this.end_date, "end_date") +
			this.createQueryParam(this.sort, "sort") +
			this.createQueryParam(this.page, "page") +
			this.createQueryArrayParam(this.facet_fields, "facet_field") +
			this.createQueryParam(this.api_key, "api-key");
		
		return url;

	};
	
	
	NYT.article.URL_Generator.prototype.removeAllFacets = function(){
		this.facet_fields = [];
	};
	
	NYT.article.URL_Generator.prototype.setAllFacets = function(){
		this.facet_fields = [
		                    "section_name",
		                    "subsection_name",
		                    "document_type",
		                    "type_of_material",
		                    "source",
		                    "day_of_week",
		                    "pub_year",
		                    "pub_month"];
	};
