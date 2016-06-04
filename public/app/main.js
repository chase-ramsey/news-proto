angular.module('proto', ['ngRoute'])
	.config(($routeProvider) => {
		$routeProvider
			.when('/', {
				templateUrl: 'app/partials/storyView.html',
				controller: 'StoryCtrl'
			})
	})
	.constant('NYT_API', 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=661baa76f11c4c7197d448b4ed508d1d')
	.factory('nytimesData', function($http, NYT_API){
		return {
			getNYT(userParams) {
				return $http
					.get(`${NYT_API}&${userParams}`)
			}
		}
	})
	.controller('StoryCtrl', function($scope, nytimesData) {

		$scope.stories = null;
		$scope.userInput = '';
		$scope.searchWithin = '';

		$scope.userSearch = function() {
			let searchText = $scope.userInput;
			let searchFormat = searchText.split(' ').join("+")
			console.log("searchFormat: ", searchFormat);
			nytimesData.getNYT(`&q=${searchText}`)
				.then(res => $scope.stories = res.data.response.docs)
				.then(console.log)
		}

	})
