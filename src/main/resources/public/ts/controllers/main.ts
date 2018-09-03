import { ng, template, idiom } from "entcore";

import { Resources } from "../model";

/**
	Wrapper controller
	------------------
	Main controller.
**/
export const mainController = ng.controller("MainController", [
  "$scope",
  "route",
  ($scope, route) => {
    $scope.lang = idiom;
    $scope.limitTo = 20;
    $scope.filteredResources = [];
    $scope.loaders = {
      resources: false
    };
    $scope.openers = {
      filters: false
    };

    $scope.labels = {
      deselectAll: idiom.translate("mediacentre.combo.deselectAll"),
      options: idiom.translate("mediacentre.combo.options"),
      searchPlaceholder: idiom.translate("mediacentre.combo.searchPlaceholder"),
      selectAll: idiom.translate("mediacentre.combo.selectAll")
    };

    $scope.search = {
      text: "",
      levels: [],
      teachingFields: [],
      educationalTypes: [],
      typologies: []
    };

    $scope.resources = new Resources();
    $scope.resources.eventer.on("loading", data => {
      $scope.loaders.resources = data.loading;
      $scope.resetFilters();
      $scope.filteredResources = $scope.resources.all;
      $scope.$apply();
    });

    $scope.resetFilters = () => {
      $scope.search = {
        text: "",
        levels: [],
        teachingFields: [],
        educationalTypes: [],
        typologies: []
      };
      $scope.filteredResources = $scope.resources.all;
      $scope.$apply();
    };

    $scope.filter = () => {
      $scope.filteredResources = $scope.resources.filter($scope.search);
      $scope.$apply();
    };

    template.open("main", "main");
    $scope.resources.sync();
  }
]);
