(function() {
  'use strict';

  MenuSearchService.$inject = ['$http', '$filter', '$q'];
  function MenuSearchService($http, $filter, $q) {
    var self = this;
    var URL = {
      GET: 'https://davids-restaurant.herokuapp.com'
    };
    var search = '';
    var allItems = [];
    var foundItems = [];

    self.getMatchedMenuItems = function(searchTerm) {
      search = searchTerm;
      var promise =  (allItems.length > 0) ? $q.when(allItems) : $http({ method: 'GET', url: (URL.GET + '/menu_items.json') }).then(cacheItems)
      return promise.then(filterItems);
    }

    function cacheItems(res) {
      allItems = res.data.menu_items;
      return allItems
    }

    function filterItems(items) {
      foundItems = $filter('filter')(items, { name: search });
      return foundItems;
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var self = this;
    self.data = {
      searchTerm: ''
    };
    self.searchMenu = function(searchTerm) {
      MenuSearchService.getMatchedMenuItems(searchTerm).then(function(items) {
        console.log(items);
      });
    };
  }

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService);
}());
