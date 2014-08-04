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

function render(resumeObject) {

	resumeObject.basics.capitalName = resumeObject.basics.name.toUpperCase();

	_.each(resumeObject.basics.profiles, function(p){
		switch(p.network.toLowerCase()) {
			case "facebook":
				p.iconClass = "fa fa-facebook-square";
				break;
			case "github":
				p.iconClass = "fa fa-github-square";
				break;
			case "twitter":
				p.iconClass = "fa fa-twitter-square";
				break;
			case "googleplus":
				p.iconClass = "fa fa-google-plus-square";
				break;
			case "youtube":
				p.iconClass = "fa fa-youtube-square";
				break;
			case "vimeo":
				p.iconClass = "fa fa-vimeo-square";
				break;
			case "linkedin":
				p.iconClass = "fa fa-linkedin-square";
				break;
			case "pinterest":
				p.iconClass = "fa fa-pinterest-square";
				break;
			case "flickr":
				p.iconClass = "fa fa-flickr";
				break;
			case "behance":
				p.iconClass = "fa fa-behance-square";
				break;
			case "codepen":
				p.iconClass = "fa fa-codepen-square";
				break;
			case "soundcloud":
				p.iconClass = "fa fa-soundcloud";
				break;
			case "steam":
				p.iconClass = "fa fa-steam";
				break;
			case "reddit":
				p.iconClass = "fa fa-reddit";
				break;
			case "blog":
				p.iconClass = "fa fa-rss-square";
				break;
		}

		if (p.url) {
			p.text = p.url;
		} else {
			p.text = p.network + ": " + p.username;
		}
	});

	if (resumeObject.work) {
		resumeObject.workBool = true;
		_.each(resumeObject.work, function(w){
			if (w.startDate) {
				w.startDateYear = (w.startDate || "").substr(0,4);
				w.startDateMonth = getMonth(w.startDate || "");
				
			}
			if(w.endDate) {
				w.endDateYear = (w.endDate || "").substr(0,4);
				w.endDateMonth = getMonth(w.endDate || "");
			} else { 
				w.endDateYear = 'Present'
			}
			if (w.highlights) {
				if (w.highlights[0]) {
					if (w.highlights[0] != "") {
						w.boolHighlights = true;
					}
				}
			}
		});
	}

	if (resumeObject.volunteer) {
		resumeObject.volunteerBool = true;
		_.each(resumeObject.volunteer, function(w){
			if (w.startDate) {
				w.startDateYear = (w.startDate || "").substr(0,4);
				w.startDateMonth = getMonth(w.startDate || "");
				
			}
			if(w.endDate) {
				w.endDateYear = (w.endDate || "").substr(0,4);
				w.endDateMonth = getMonth(w.endDate || "");
			} else { 
				w.endDateYear = 'Present'
			}
			if (w.highlights) {
				if (w.highlights[0]) {
					if (w.highlights[0] != "") {
						w.boolHighlights = true;
					}
				}
			}
		});
	}

	if (resumeObject.education) {
		if (resumeObject.education[0].institution) {
			resumeObject.educationBool = true;
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

	if (resumeObject.skills) {
		if (resumeObject.skills[0].name) {
			resumeObject.skillsBool = true;
		}
	}

	if (resumeObject.references) {
		if (resumeObject.references[0].name) {
			resumeObject.referencesBool = true;
		}
	}

	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);
	

	return resumeHTML;
};
module.exports = {
	render: render
}