var getJson = function getJson(file, callback){
	$.getJSON("data/"+file, function(json) {
		callback(json);
	});
};

function getUrlParam(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
		}
  }
}

function toggleDetails(div) {
	$('#'+div).slideToggle(200);
}

function populateProjects(projects) {
	var year = getUrlParam('year');
	if(typeof(year) === 'undefined' || typeof(projects[year]) === 'undefined') return;

	var container = $('#projects-container');
	var carousel = $('#projects-carousel');
	projects[year].forEach(function(project){
		// Text details
		var thanks = "";
		var details = "";
		project.details.forEach(function(detail){
			details += "<p>"+detail+"</p>";
		});
		project.thanks.forEach(function(thanksItem){
			var donators = "";
			thanksItem.donators.forEach(function(donator){
				donators += "<li>"+donator+"</li>";
			});
			thanks += "<strong>"+thanksItem.equipment+"</strong><ul>"+donators+"</ul>";
		});
		html = "\
			<div class='row'>\
				<div class='col-xs-12'>\
					<h3 class='project-title'>"+project.title+"</h3>"+details+"\
					<p>Thank you so much to the following members who helped with this project:</p>"+thanks+"\
				</div>\
			</div>\
		";
		container.append(html);

		// Carousel images
		var images = "";
		project.images.forEach(function(image, index){
			images += "<div class='item"+(index == 0 ? " active" : "")+"' style='background-image: url(\"images/"+year+"project/"+image+"\");'></div>";
		});
		carousel.append("<div class='carousel-inner'>"+images+"</div>");
	});
}

function populateOwners(owners){
	var container = $('#owners-container');
	owners.forEach(function(owner){
		var details = "";
		var equipment = "";
		owner.details.forEach(function(detail){
			var value = detail.value;
			if(detail.property === "Email"){
				value = "<a href='mailto:"+detail.value+"'>"+detail.value+"</a>";
			}else if(detail.property === "Web"){
				value = "<a href='http://"+detail.value+"'>"+detail.value+"</a>";
			}
			details += "<li><strong>"+detail.property+": </strong>"+value;
			if(detail.property === "Contact" && typeof(detail.cell) !== 'undefined'){
				details += " <strong>Cell: </strong>"+detail.cell;
			}
			details += "</li>";
		});
		owner.equipment.forEach(function(equipmentItem){
			equipment += "<li>"+equipmentItem+"</li>";
		});
		html = "\
			<div class='row'>\
				<div class='col-xs-12'>\
					<a class='owner-title' href='javascript:void(0)' onclick='toggleDetails(\""+owner.id+"\");'>"+owner.name+"</a>\
					<div id='"+owner.id+"' class='owner-details'>\
						Details: <ul>"+details+"</ul>\
						Equipment: <ul>"+equipment+"</ul>\
					</div>\
				</div>\
			</div>\
		";
		container.append(html);
	});
}

function populateRates(rates){
	console.log(rates);
	var container = $('#rates-container');
	rates.forEach(function(category){
		var tableHeaderContent = "";
		var tableBodyRows = "";
		category.table.columns.forEach(function(column){
			tableHeaderContent += "<td>"+column+"</td>";
		});
		category.table.rows.forEach(function(row){
			tableBodyRows += "<tr>";
			row.forEach(function(value){
				tableBodyRows += "<td>"+value+"</td>";
			});
			tableBodyRows += "</tr>";
		});
		html = "\
			<div class='row'>\
				<div class='col-xs-12'>\
					<div class='rates-category'>\
						<p><strong>"+category.title+"</strong></p>\
						<p>"+category.subheading+"</p>\
						<a class='dealer-title' href='javascript:void(0)' onclick='toggleDetails(\""+category.id+"\");'>Show rates table</a>\
						<div id='"+category.id+"' class='rates-category-details'>\
							<table class='rates-table'><thead><tr>"+tableHeaderContent+"</tr></thead><tbody>"+tableBodyRows+"</tbody></table>\
						</div>\
					</div>\
				</div>\
			</div>\
		";
		container.append(html);
	});
}

function populateDealers(dealers){
	var container = $('#dealers-container');
	dealers.forEach(function(dealer){
		var details = "";
		var equipment = "";
		dealer.details.forEach(function(detail){
			var value = detail.value;
			if(detail.property === "Email"){
				value = "<a href='mailto:"+detail.value+"'>"+detail.value+"</a>";
			}else if(detail.property === "Web"){
				value = "<a href='http://"+detail.value+"'>"+detail.value+"</a>";
			}
			details += "<li><strong>"+detail.property+": </strong>"+value;
			if(detail.property === "Contact" && typeof(detail.cell) !== 'undefined'){
				details += " <strong>Cell: </strong>"+detail.cell;
			}
			details += "</li>";
		});
		html = "\
			<div class='row'>\
				<div class='col-xs-12'>\
					<a class='dealer-title' href='javascript:void(0)' onclick='toggleDetails(\""+dealer.id+"\");'>"+dealer.name+"</a>\
					<div id='"+dealer.id+"' class='dealer-details'>\
						Details: <ul>"+details+"</ul>\
					</div>\
				</div>\
			</div>\
		";
		container.append(html);
	});
}
