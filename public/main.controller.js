var app = angular.module('flashCards', []);

app.factory('FlashCardFactory', function($http) {
	return {
		getFlashCards: function(category) {
			var url = '/cards';
			if (category){
				url += '?category=' + category;
			}

			return $http.get(url)
				.then(function(res) {
					return res.data;
			})
		}
	}
});

app.controller('MainController', function ($scope, FlashCardFactory, ScoreFactory) {
	
	$scope.categories = [
		'MongoDB',
		'Express',
		'Angular',
		'Node'
	];

	$scope.currentCategory = "";
	
	$scope.getCategoryCards = function (category) {
		$scope.currentCategory = category;
		FlashCardFactory.getFlashCards(category).then(function(data) {
			$scope.flashCards = data;
		})
	}
	
	FlashCardFactory.getFlashCards().then(function(data) {
		$scope.flashCards = data;
	})

	$scope.answerQuestion = function(answer, flashCard) {
		ScoreFactory.update(answer.correct);
	}
});

app.factory('ScoreFactory', function() {
	var get = {correct: 0, incorrect: 0};

	return {
		get: get,
		update: function(boolVar) {
			(boolVar) ? get.correct++: get.incorrect++;
		}
	}
});


//app.factory('ScoreFactory', function () {
//	return {
//		correct: 0,
//		incorrect: 0 
//	}
//});
//

app.controller('StatsController', function($scope, ScoreFactory) {
	// $scope.scores = ScoreFactory;
	$scope.scores = ScoreFactory.get;
});
