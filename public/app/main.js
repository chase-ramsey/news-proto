angular.module('proto', ['ngRoute'])
	.config(($routeProvider) => {
		$routeProvider
			.when('/', {
				templateUrl: 'app/partials/storyView.html',
				controller: 'StoryCtrl'
			})
	})
	.constant('NYT_API', 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=661baa76f11c4c7197d448b4ed508d1d')
	.factory('nytimesData', function($http){
		return {
			getNYT(userParams) {
				return $http
					.get(`${NYT_API}&${userParams}`)
			}
		}
	})
	.controller('StoryCtrl', function($scope) {

		let stories = null;

		$scope.userInput = '';

		$scope.userSearch = function() {
			let searchText = $scope.userInput;
			searchText.split(' ').join('+');
			console.log("searchText: ", searchText);
			getNYT(`&q=${searchText}`)
				.then(response => stories = response.docs);
				.then(console.log)
		}

	})
