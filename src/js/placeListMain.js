requirejs.config({
  paths: {
    jquery: './lib/jquery.min',
    bootstrap: './lib/bootstrap.min',
    dataTables_bootstrap: './lib/dataTables.bootstrap.min',
    dataTables_responsive: './lib/dataTables.responsive',
    jquery_dataTables: './lib/jquery.dataTables.min',
    metisMenu: './lib/metisMenu.min',
    sbAdmin2: './lib/sb-admin-2.min',
    getPlace: './data/placeList'
  }
});

requirejs(['jquery', 'getPlace'], function ($, getPlace) {
  
});