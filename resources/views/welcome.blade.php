<!doctype html>
<html lang="{{ app()->getLocale() }}" ng-app="menuApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
       <link rel="stylesheet" href="css/main.css">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="css/styles.css" rel="stylesheet">
        <link rel="stylesheet" href="css/linearicons.css">             
            
       <script src="bower_components/jquery/dist/jquery.min.js"></script>
        <script src="bower_components/angular/angular.min.js"></script>
        <script src="bower_components/lodash/lodash.js"></script>
        <script src="bower_components/angular-route/angular-route.min.js"></script>
        <script src="bower_components/angular-local-storage/dist/angular-local-storage.min.js"></script>
        <script src="bower_components/restangular/dist/restangular.min.js"></script>
        <script src="js/app.js"></script>
        <script src="js/controller.js"></script>
        <script src="js/services.js"></script>
        <link href="{{ asset('css/Style.css') }}" rel="stylesheet">
        
    </head>
    <body>
       

            <div ng-view></div>
      

        
        <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script type="text/javascript">
            var baseUrl="{{url()->current()}}";
        </script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
</html>
