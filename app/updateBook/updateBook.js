'use strict';

angular.module('libraryApp').controller('updateBookCtrl', ['$scope', '$window', function($scope, $window)
{

$scope.returnHome = function returnHome()
{
    $window.location.href = "../app/#!/";
    return false;
};

$scope.onLoad = function onLoad()
{
    document.getElementById("titleForm").value = $scope.getCookie("title");
    var holderForm = document.getElementById("holderName");
    holderForm.value = $scope.getCookie("holder").replace("NULL", "");
    var statusForm = document.getElementById("statusForm");
    statusForm.selectedIndex = $scope.getCookie("statusCode");
    var checkoutDate = document.getElementById("checkoutDate");
    checkoutDate.value = $scope.getCookie("timestamp").replace("NULL", "");
    checkoutDate.addEventListener("click", function () {
        $("#checkoutDate").datepicker().focus();
    }, false);

    statusForm.addEventListener("change", function ()
    {
        if (statusForm.selectedIndex == 1 || statusForm.selectedIndex == 2) {
            holderForm.disabled = false;
            checkoutDate.disabled = false;
        }
        else {
            holderForm.disabled = true;
            holderForm.value = "";
            checkoutDate.disabled = true;
            checkoutDate.value = "";
        }
    }, false);
};


$scope.updateBook = function updateBook()
{
    const title = document.getElementById("titleForm").value;
    //Index position on dropdown corresponds to status codes
    const status = document.getElementById("statusForm").selectedIndex;
    const holder = document.getElementById("holderName").value;
    const checkoutDate = document.getElementById("checkoutDate").value;
    const id = $scope.getCookie("id");

    var args = { "id": id, "title": title, "status": status, "holder" : holder, "day" : checkoutDate};
    args = JSON.stringify(args);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            swal("Book Updated Successfully!", "", "success").then(function()
            {
                $scope.returnHome();
            });
        }
    };
    xmlhttp.open("POST", "database/databaseFunctions.php?fxn=updateBookRemote&args="+args, true);
    xmlhttp.send();
};

$scope.getCookie = function(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

}]);