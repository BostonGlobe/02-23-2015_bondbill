var master = $('.article-graphic.chart');

// Prepare data
var data = _.chain(require('../../../data/data.json')) // read the JSON
	.groupBy('FUNDED') // group by funded status, since we'll be creating categories of projects
	.map(function(projects, status) {
		return {
			status: status, // we need the status
			projects: _.chain(projects)
				.map(function(project) {
					project['Total Cost'] = +project['Total Cost']; // cast strings to number
					project.Committed = +project.Committed;

					// only calculate Delta (i.e. Gap) if project status is not unknown
					if (status !== 'unk') {
						project.Delta = project['Total Cost'] - project.Committed;
					}
					return project;
				})
				// sort by alpha
				.sortBy('Project')
				.reverse()
				// but really, sort by total cost
				.sortBy('Total Cost')
				.reverse()
				.value()
		};
	})
	// sort the project groups
	.sortBy(function(v, i) {
		return _.indexOf(['partial', 'unfunded', 'fully', 'unk'], v.status);
	})
	.value();

// calculate the project with highest cost, we use this to determine bar widths
var max = _.chain(data)
	.reject({status: 'unk'})
	.pluck('projects')
	.flatten()
	.pluck('Total Cost')
	.max()
	.value();

var html = data.map(function(v, i) {

	// feed a group of projects to the lodash template
	var html = _.templates.projects(_.extend(v, {max: max}));

	return html;
}).join('');

// populate html
$('.content', master).html(html);

// on button click,
$('button', master).click(function(e) {

	// toggle this button class,
	$(this).toggleClass('expanded');

	// and toggle the projects
	$('.projects-category.rest', master).toggle();
});