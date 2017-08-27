(function() {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var self = this;

  var URL = {
    GET: 'https://davids-restaurant.herokuapp.com'
  }

  self.getAllCategories = function() {
    return $http({ method: 'GET', url: (URL.GET + '/categories.json') });
  };

  self.getItemsForCategory = function(categoryShortName) {
    return $http({
      method: 'GET',
      url: (URL.GET + '/menu_items.json'),
      params: { category: categoryShortName }
    });
  };
}
})();
