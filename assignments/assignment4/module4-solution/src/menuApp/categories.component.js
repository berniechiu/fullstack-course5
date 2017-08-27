(function() {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuApp/templates/categoryList.template.html',
  bindings: {
    items: '<'
  }
})
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['items'];
function CategoriesController(items) {
  var self = this;
  self.items = items;
}
})();
