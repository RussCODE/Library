'use strict';

angular.module('libraryApp').controller('addBookCtrl', ['$rootScope', '$scope', '$state', function($scope, $state, $rootScope)
{

$scope.addBook = function addBook()
{
    const title = document.getElementById("titleForm").value;
    const status = document.getElementById("statusForm").value;
    var args = { "title": title, "status": status };
    args = JSON.stringify(args);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            swal("Book Added Successfully!", "", "success").then(function()
            {
                $scope.returnHome();
            });
        }
    };
    xmlhttp.open("POST", "database/databaseFunctions.php?fxn=addBookRemote&args="+args, true);
    xmlhttp.send();
};

}]);