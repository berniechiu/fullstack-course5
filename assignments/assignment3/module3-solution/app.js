(function() {
  'use strict';

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var self = this;
    var API_ENDPOINT = 'https://davids-restaurant.herokuapp.com'

    self.getMatchedMenuItems = function() {
      return $http({ method: 'GET', url: (API_ENDPOINT + '/menu_items.json') }).then(function (res) {
        return res.data.menu_items;
      });
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    MenuSearchService.getMatchedMenuItems().then(function(items) {
      // Do something
    });
  }

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService);
}());
