function log(s) {
	console.log(JSON.stringify(s, null, 4));
}

var master = $('.article-graphic.chart');

var data = _.chain(require('../../../data/data.json'))
	.groupBy('FUNDED')
	.map(function(projects, status) {
		return {
			status: status,
			projects: _.chain(projects)
				.map(function(project) {
					project['Total Cost'] = +project['Total Cost'];
					project.Committed = +project.Committed;

					if (status !== 'unk') {
						project.Delta = project['Total Cost'] - project.Committed;
					}
					return project;
				})
				.sortBy('Total Cost')
				.reverse()
				.value()
		};
	})
	.sortBy(function(v, i) {
		return _.indexOf(['partial', 'unfunded', 'fully', 'unk'], v.status);
	})
	.value();

var max = _.chain(data)
	.reject({status: 'unk'})
	.pluck('projects')
	.flatten()
	.pluck('Total Cost')
	.max()
	.value();

var html = data.map(function(v, i) {
	var html = _.templates.projects(_.extend(v, {max: max}));

	return html;
}).join('');

$('.content', master).html(html);