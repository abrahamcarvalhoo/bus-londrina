mdc.autoInit();

var toggle = document.querySelector('.toggle');
var menu = new mdc.menu.MDCSimpleMenu(document.querySelector('#menu'));

toggle.addEventListener('click', function() {
  menu.open = !menu.open;
});
