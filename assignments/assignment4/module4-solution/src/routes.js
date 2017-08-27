(function () {

'use strict';

angular.module('MenuApp').config(RoutesConfig);
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuApp/templates/home.template.html'
  })
  // Categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuApp/templates/categories.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      items: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories().then(function(res) { return res.data; });
      }]
    }
  })
  // Category items
  .state('categoryItems', {
    url: '/catgories/{categoryShortName}/items',
    templateUrl: 'src/menuApp/templates/categoryItems.template.html',
    controller: 'CategoryItemsController as itemsCtrl',
    resolve: {
      detail: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return (
          MenuDataService
            .getItemsForCategory($stateParams.categoryShortName)
            .then(function(res) { return res.data; })
        );
      }]
    }
  });
}
})();
