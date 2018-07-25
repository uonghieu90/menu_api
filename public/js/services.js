var userServices = angular.module('userServices', [
    'LocalStorageModule'
]);

userServices.factory('userService', ['$http', 'localStorageService', function($http, localStorageService) {

    function checkIfLoggedIn() {

        if(localStorageService.get('token'))
            return true;
        else
            return false;

    }

    function signup(name, email, password, onSuccess, onError) {

        $http.post('api/register', 
        {
            name: name,
            email: email,
            password: password,
            c_password:password
        }).
        then(function(response) {

            localStorageService.set('token', response.data.success.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function login(email, password, onSuccess, onError){

        $http.post('api/login', 
        {
            email: email,
            password: password
        }).
        then(function(response) {

            localStorageService.set('token', response.data.success.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function logout(){

        localStorageService.remove('token');

    }

    function getCurrentToken(){
        return localStorageService.get('token');
    }

    return {
        checkIfLoggedIn: checkIfLoggedIn,
        signup: signup,
        login: login,
        logout: logout,
        getCurrentToken: getCurrentToken
    }

}]);

userServices.factory('menuService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/menu/index').getList().then(function(response){

            onSuccess(response);
        
        }, function(){

            onError(response);

        });
    }

    function getById(menuId, onSuccess, onError){

        Restangular.one('api/menus', menuId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function create(data, onSuccess, onError){

        Restangular.all('api/menu/store').post(data).then(function(response){

            onSuccess(response);
        
        }, function(response){
            
            onError(response);
        
        });

    }

    function update(menuId, data, onSuccess, onError){

        Restangular.one("api/menu/store").post(data, menuId).then(function(response) {
                
                onSuccess(response);

            }, function(response){
                
                onError(response);
            
            }
        );

    }

    function remove(menuId, onSuccess, onError){
        Restangular.all("api/menu/destroys").post( menuId).then(function(response) {
                
                onSuccess(response);

            }, function(response){
                
                onError(response);
            
            }
        );
    }

    Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });
    Restangular.setBaseUrl(baseUrl);
    Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;

        extractedData = data.success;
     
      return extractedData;
    });
    return {
        getAll: getAll,
        getById: getById,
        create: create,
        update: update,
        remove: remove
    }

}]);
