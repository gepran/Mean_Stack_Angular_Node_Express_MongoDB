angular.module('app').controller('mvNavBarLoginCtrl',  function($scope, $http, $location, mvIdentity, mvNotifier, mvAuth){
	$scope.identity = mvIdentity;
	$scope.signin = function (username, password) {
		mvAuth.authenticateUser(username, password).then(function (success) {
			if (success) {				
				mvNotifier.notify('Loged in !!');
			} else {
				mvNotifier.notify ('Failed to log in !');
			}
		});		
	};

	$scope.signout = function (username, password) {
		mvAuth.logoutUser().then(function () {
			$scope.username = '';
			$scope.password = '';
			mvNotifier.notify('You Have Loged Out !!');
			$location.path('/');
		})
	};
	

});
