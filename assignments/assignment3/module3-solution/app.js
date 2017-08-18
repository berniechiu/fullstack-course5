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

    self.removeItem = function(itemIndex) {
      return foundItems.splice(itemIndex, 1);
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
    self.state = {
      submitting: false
    };
    self.data = {
      searchTerm: '',
      foundItems: []
    };
    self.searchMenu = function(searchTerm) {
      self.state.submitting = true
      MenuSearchService.getMatchedMenuItems(searchTerm).then(function(items) {
        self.data.foundItems = items;
        self.state.submitting = false;
      });
    };
    self.removeMenu = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    }
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'itemList.html',
      scope: {
        items: '<',
        searchTerm: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    }

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var self = this;

    self.founItemsInList = function () {
      return (self.items <= 0);
    };
  }

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);
}());
