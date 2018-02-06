function materialInit() {
  mdc.autoInit();

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

  if (document.querySelector('.mat-search--clean')) {
    document.querySelector('.mat-search--clean').addEventListener('click', function() {
      document.querySelector('.mat-search--desktop__input').focus();
    });
  }

  if (document.querySelector('.mat-search--mobile__icon')) {
    document.querySelector('.mat-search--mobile__icon').addEventListener('click', function() {
      document.querySelector('.mat-toolbar--search-text').focus();
    });
  }
}
