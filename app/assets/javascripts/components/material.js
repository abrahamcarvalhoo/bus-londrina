mdc.autoInit();

var toggleMenu = document.querySelector('.toggleMenu');
var menu = new mdc.menu.MDCSimpleMenu(document.querySelector('#menu'));

toggleMenu.addEventListener('click', function() {
  menu.open = !menu.open;
});

if (document.querySelector('.mat-toolbar--open-search') && document.querySelector('.mat-toolbar--exit-search')) {
  var searchIcon = document.querySelector('.mat-toolbar--open-search');
  document.querySelector('.mat-toolbar--open-search').addEventListener('click', function() {
    document.querySelector('.mat-toolbar--search').style = "visibility: visible; overflow: hidden; --mat-toolbar--search-location: " + (document.body.clientWidth - searchIcon.offsetLeft - 20) + "px;";
    document.querySelector('.mat-toolbar--search-container').style = "animation: mat-toolbar--open-search 0.7s forwards; -webkit-transform: translateZ(0);";
    setTimeout(function() {
      document.querySelector('.mat-toolbar--search-text').focus();
    }, 50);
  });
  document.querySelector('.mat-toolbar--exit-search').addEventListener('click', function() {
    document.querySelector('.mat-toolbar--search-container').style = "animation: mat-toolbar--close-search 0.5s forwards; -webkit-transform: translateZ(0);";
    setTimeout(function() {document.querySelector('.mat-toolbar--search').style = "visibility: hidden; --mat-toolbar--search-location: " + (document.body.clientWidth - searchIcon.offsetLeft - 20) + "px;";}, 500);
  });
}

document.querySelector('.mat-search--clean').addEventListener('click', function() {
  document.querySelector('.mat-search--desktop__input').focus();
});

document.querySelector('.mat-search--mobile__icon').addEventListener('click', function() {
  document.querySelector('.mat-toolbar--search-text').focus();
});
