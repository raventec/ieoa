$.getJSON("data/equip-owners.json", function(json) {
	populateOwners(json);
});

function toggleDetails(div) {
	$('#'+div).slideToggle(200);
}

function populateOwners(owners){
	var container = $('#owner-container');
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
			details += "</li>"
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
