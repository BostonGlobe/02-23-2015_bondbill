(function() { globe.onDefine('window.jQuery && $(".article-graphic.chart").length', function() {

	require('./templates/templates.js');

	var masterSelector = '.article-graphic.chart';
	var master = $(masterSelector);


	require('./main.js');

}); }());