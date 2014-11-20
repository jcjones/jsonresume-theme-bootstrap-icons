var fs = require('fs');
var _ = require('lodash')
var Mustache = require('mustache');

var d = new Date();
var curyear = d.getFullYear();

function getMonth(startDateStr) {
	switch (startDateStr.substr(5,2)) {
	case '01':
		return "January ";
	case '02':
		return "February ";
	case '03':
		return "March ";
	case '04':
		return "April ";
	case '05':
		return "May ";
	case '06':
		return "June ";
	case '07':
		return "July ";
	case '08':
		return "August ";
	case '09':
		return "September ";
	case '10': 
		return "October ";
	case '11':
		return "November ";
	case '12':
		return "December ";
	}
}

var profileIcon = {
	"twitter": "fa-twitter-square",
	"facebook": "fa-facebook-square",
	"github": "fa-github-square",
	"google-plus": "fa-google-plus-square",
	"youtube": "fa-youtube-square",
	"vimeo": "fa-vimeo-square",
	"linkedin": "fa-linkedin-square",
	"pinterest": "fa-pinterest-square",
	"angellist": "fa-angellist",
	"flickr": "fa-flickr",
	"behance": "fa-behance-square",
	"codepen": "fa-codepen",
	"blog": "fa-rss-square"
};

function render(resumeObject) {

	_.each(resumeObject.basics.profiles, function(prof){
		if (profileIcon[prof.network]) {
			prof.icon = profileIcon[prof.network]
		}
	});

	if (resumeObject.work) {
		if (resumeObject.work[0].company) {
			resumeObject.workBool = true;
			_.each(resumeObject.work, function(w){
				if (w.startDate) {
					w.startDateYear = (w.startDate || "").substr(0,4);
					switch (w.startDate.substr(5,2)) {
						case '01':
							w.startDateMonth = "January ";
							break;
						case '02':
							w.startDateMonth = "February ";
							break;
						case '03':
							w.startDateMonth = "March ";
							break;
						case '04':
							w.startDateMonth = "April ";
							break;
						case '05':
							w.startDateMonth = "May ";
							break;
						case '06':
							w.startDateMonth = "June ";
							break;
						case '07':
							w.startDateMonth = "July ";
							break;
						case '08':
							w.startDateMonth = "August ";
							break;
						case '09':
							w.startDateMonth = "September ";
							break;
						case '10': 
							w.startDateMonth = "October ";
							break;
						case '11':
							w.startDateMonth = "November ";
							break;
						case '12':
							w.startDateMonth = "December ";
							break;
						}
				}
				if(w.endDate) {
					w.endDateYear = (w.endDate || "").substr(0,4);
					switch ((w.endDate || "").substr(5,2)) {
						case '01':
							w.endDateMonth = "January ";
							break;
						case '02':
							w.endDateMonth = "February ";
							break;
						case '03':
							w.endDateMonth = "March ";
							break;
						case '04':
							w.endDateMonth = "April ";
							break;
						case '05':
							w.endDateMonth = "May ";
							break;
						case '06':
							w.endDateMonth = "June ";
							break;
						case '07':
							w.endDateMonth = "July ";
							break;
						case '08':
							w.endDateMonth = "August ";
							break;
						case '09':
							w.endDateMonth = "September ";
							break;
						case '10': 
							w.endDateMonth = "October ";
							break;
						case '11':
							w.endDateMonth = "November ";
							break;
						case '12':
							w.endDateMonth = "December ";
							break;
						}
				} else { 
					w.endDateYear = 'Present'
				}
			});
		}
	}

	if (resumeObject.education) {
		if (resumeObject.education[0].institution) {
			_.each(resumeObject.education, function(e){
			    if( !e.area || !e.studyType ){
			      e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
			    } else {
			      e.educationDetail = e.area + ", "+ e.studyType;
			    }
				if (e.startDate) {
					e.startDateYear = e.startDate.substr(0,4);
					e.startDateMonth = getMonth(e.startDate || "");
				} else {
					e.endDateMonth = "";
				}
				if (e.endDate) {
					e.endDateYear = e.endDate.substr(0,4);
					e.endDateMonth = getMonth(e.endDate || "")
				
					if (e.endDateYear > curyear) {
						e.endDateYear += " (expected)";
					}
				} else { 
					e.endDateYear = 'Present'
					e.endDateMonth = '';
				}
				if (e.courses) {
					if (e.courses[0]) {
						if (e.courses[0] != "") {
							e.educationCourses = true;
						}
					}
				}
			});
		}
	}

	if (resumeObject.awards) {
		if (resumeObject.awards[0].title) {
			resumeObject.awardsBool = true;
			_.each(resumeObject.awards, function(a){
				a.year = (a.date || "").substr(0,4);
				a.day = (a.date || "").substr(8,2);
				a.month = getMonth(a.date || "");
			});
		}
	}

	if (resumeObject.publications) {
		if (resumeObject.publications[0].name) {
			resumeObject.publicationsBool = true;
			_.each(resumeObject.publications, function(a){
				a.year = (a.releaseDate || "").substr(0,4);
				a.day = (a.releaseDate || "").substr(8,2);
				a.month = getMonth(a.releaseDate || "");
			});
		}
	}

	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);

	return resumeHTML;
};
module.exports = {
	render: render
}