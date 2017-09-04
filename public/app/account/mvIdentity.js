angular.module('app').factory('mvIdentity',  function(mvToaster){
	return {
		currentUser: undefined,
		isAuthenticated: function () {
			return !!this.currentUser;
		}
	}
});
