"use strict";

// Functions for updating and setting up the views for all tools
function ToolController($scope) {

  // The mode, representing the current tool. Each tool has a string name that
  // the mode can be set to.
  $scope.mode = undefined;

  // Displays the given tool results data on the page. Renders the data using
  // the template for the appropriate mode, represented in the data argument
  // under the "mode" key. Animates any transitions between results and tools as
  // needed.
  $scope.render = function (mode, data) {
    // Update the current mode
    $scope.mode = mode;

    // Render the data with the appropriate template
    var results = _.template($("#" + mode + "-template").html(), data);

    // Set the result HTML on the page
    if ($(".results").is(":visible")) {
      $(".results").html(results);
    } else {
      $("#welcome").hide();
      $(".results").html(results);
      $(".results, .reload-button, .options").show();
    }

    // Animate tool transitions
    $scope.runTransitions();
  };

  // Animates tool transitions based on the current mode
  $scope.runTransitions = function () {
    if ($scope.mode === "from_list" || $scope.mode === "sort_list") {
      $(".options-header").show();
      $(".number-options").hide();
      $(".list-options").show();
    } else if ($scope.mode === "number") {
      $(".options-header").show();
      $(".list-options").hide();
      $(".number-options").show();
    } else {
      $(".list-options, .number-options, .options-header").hide();
    }
    $("#results-header").show();
  };

  // Repeats running the current tool with its current settings
  $scope.reload = function () {
    var result = Tools[$scope.mode]();
    $scope.render($scope.mode, result);
  };

  // Set up the page
  $(".navbar-nav > li > a").click(function (event) {
    var mode = event.currentTarget.dataset.tool;
    $scope.render(mode, Tools[mode]());
  });
  $(".reload-button").click($scope.reload);
  

}
Preloader.preload();
