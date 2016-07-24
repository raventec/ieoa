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

function myFunc(name) {
	alert("hi "+name);
}

function toggleDetails(div) {
  document.getElementById(div).style.display = 'block';
  e.preventDefault();
}
