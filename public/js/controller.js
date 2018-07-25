var userControllers = angular.module('userControllers', []);

userControllers.controller('LoginController', ['$scope', '$http', '$location', 'userService', function ($scope, $http, $location, userService) {

    $scope.login = function() {
        userService.login(
            $scope.email, $scope.password,
            function(response){
            	//alert("success");
            	//console.log(response.data.success.token);
                $location.path('/');
            },
            function(response){
                alert('Something went wrong with the login process. Try again later!');
            }
        );
    }

    $scope.email = '';
    $scope.password = '';

    if(userService.checkIfLoggedIn())
        $location.path('/');

}]);

userControllers.controller('SignupController',['$scope', '$location', 'userService', function ($scope, $location, userService) {

    $scope.signup = function() {
        userService.signup(
            $scope.name, $scope.email, $scope.password,
            function(response){
                alert('Great! You are now signed in! Welcome, ' + $scope.name + '!');
                $location.path('/');
            },
            function(response){
                alert('Something went wrong with the signup process. Try again later.');
            }
        );
    }

    $scope.name = '';
    $scope.email = '';
    $scope.password = '';

    if(userService.checkIfLoggedIn())
        $location.path('/');

}]);

userControllers.controller('MainController', ['$scope', '$location', 'userService', 'menuService', function ($scope, $location, userService, menuService) {

    $scope.logout = function(){
        userService.logout();
        $location.path('/login');
    }
    $scope.me="";
    $scope.creatmenu=function(reponse,data,count){

        reponse.forEach(function (menu){
             if(menu.parent_id==count){
                
                var newName = menu.name ;
                var x={name: newName,nodes: [],id:menu.id,parent:data,show:true};
             	$scope.creatmenu(reponse,x,menu.id);
             	data.nodes.push(x);
             }
            
        });
      
    }
    $scope.refresh = function(){

        menuService.getAll(function(response){
            $scope.creatmenu(response,$scope.tree[0],0);
           
           
             

            $scope.menus = response;
            
        
        }, function(){
            
            alert('Some errors occurred while communicating with the service. Try again later.');
        
        });

    }
    $scope.d=[];
    $scope.loop=function(nodes){
      nodes.forEach(function(node){
         $scope.d.push(node.id);
         $scope.loop(node.nodes);
      });
    }
    $scope.delete = function(data) {
    	if (confirm("want to delete!")) {
    		$scope.d=[];
    		$scope.d.push(data.id);
    		$scope.loop(data.nodes);
    		var d={ids:$scope.d};
    		menuService.remove(d,function(response){
             
		        data.parent.nodes=data.parent.nodes.filter(function(element){
		        	
		           return element!=data;
		        });
	        }, function(){
	            
	            alert('Some errors occurred while communicating with the service. Try again later.');
	        
	        });
           
         
        }
    };
    $scope.add = function(data) {
    	var name = prompt("Please enter menu name", "");
        var newName="";
			if (name == null || name == "") {
			     return;
			} else {
			     newName = name;
			} 
			d={name:newName,parent_id:data.id}
         menuService.create(d,function(response){
             //console.log(response);
            var id = response;
             data.nodes.push({name: newName,nodes: [],id:id,parent:data});
             data.show=true;
        }, function(){
            
            alert('Some errors occurred while communicating with the service. Try again later.');
        
        });

       
    };
    $scope.update = function(data) {
    	var name = prompt("Please enter new name", data.name);
        var newName="";
			if (name == null || name == "") {
			  return;
			} else {
			     newName = name;
			} 
       d={name:newName,id:data.id}
         menuService.create(d,function(response){
             //console.log(response);
            var id = response;
              data.name=newName;
        
        }, function(){
            
            alert('Some errors occurred while communicating with the service. Try again later.');
        
        });
       
    }
    $scope.tree = [{name: "Root", nodes: [],id:0,parent:$scope.tree,show:true}];
    if(!userService.checkIfLoggedIn())
        $location.path('/login');

    $scope.menus = [];

    $scope.refresh();

}]);
userControllers.controller('FrontController', ['$scope', '$location', 'userService', 'menuService', function ($scope, $location, userService, menuService) {

  
    $scope.me="";
    $scope.creatmenu=function(reponse,data,count){
       var show=data.show+1;
        reponse.forEach(function (menu){
             if(menu.parent_id==count){
                
                var newName = menu.name ;
                var x={name: newName,nodes: [],id:menu.id,parent:data,show:show};
             	$scope.creatmenu(reponse,x,menu.id);
             	data.nodes.push(x);
             }
            
        });
      
    }
    $scope.refresh = function(){

        menuService.getAll(function(response){
            $scope.creatmenu(response,$scope.tree[0],0);
            console.log($scope.tree[0]);
           
             

            $scope.menus = response;
            
        
        }, function(){
            
            alert('Some errors occurred while communicating with the service. Try again later.');
        
        });

    }
    
    $scope.tree = [{name: "Root", nodes: [],id:0,parent:$scope.tree,show:0}];
    $scope.con=$scope.tree[0].nodes;

    $scope.refresh();

}]);
