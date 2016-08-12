// $(function(){
//     $('[rel="popover"]').popover({
//         container: 'body',
//         html: true,
//         content: function () {
//             var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
//             return clone;
//         }
//     }).click(function(e) {
//         e.preventDefault();
//     });
// });


function toggleDetails(div) {
	$('#'+div).toggle(500);
}

function populateOwners(owners){
	var parent = $('#owner-parent');
	owners.forEach(function(owner){
		var details = "";
		var equipment = "";
		owner.details.forEach(function(detail){
			var value = detail.value;
			if(detail.property === "Email"){
				value = "<a href='mailto:"+detail.value+"'>"+detail.value+"</a>";
			}
			details += "<li><span class='details-bold'>"+detail.property+": </span>"+value;
			if(detail.property === "Contact" && typeof(detail.cell) !== 'undefined'){
				details += " <span class='details-bold'>Cell: </span>"+detail.cell;
			}
			details += "</li>"
		});
		owner.equipment.forEach(function(equipmentItem){
			equipment += "<li>"+equipmentItem+"</li>";
		});
		html = `<div class="row"> <div class="col-sm-12"> <a href="javascript:void(0)" onclick="toggleDetails('${owner.id}');">${owner.name}</a> <div id="${owner.id}" class="owner-details"> Details: <ul> ${details} </ul> Equipment: <ul> ${equipment} </ul> </div> </div> </div>`;
		parent.append(html);
	});
}
populateOwners(json);
