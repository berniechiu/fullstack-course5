(function() {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuApp/templates/itemList.template.html',
  bindings: {
    detail: '<'
  }
})
.controller('CategoryItemsController', CategoryItemsController);

CategoryItemsController.$inject = ['detail'];
function CategoryItemsController(detail) {
  var self = this;
  self.detail = detail;
}
})();
