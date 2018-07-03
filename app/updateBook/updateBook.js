'use strict';

angular.module('libraryApp').controller('updateBookCtrl', ['$scope', '$rootScope', function($scope, $rootScope)
{

$scope.onLoad = function onLoad()
{
    document.getElementById("titleForm").value = $rootScope.getCookie("title");
    var holderForm = document.getElementById("holderName");
    holderForm.value = $rootScope.getCookie("holder").replace("NULL", "");
    var statusForm = document.getElementById("statusForm");
    statusForm.selectedIndex = $rootScope.getCookie("statusCode");
    var checkoutDate = document.getElementById("checkoutDate");
    checkoutDate.value = $rootScope.getCookie("timestamp").replace("NULL", "");
    checkoutDate.addEventListener("click", function () {
        $("#checkoutDate").datepicker({ maxDate: new Date }).focus();
    }, false);

    statusForm.addEventListener("change", function ()
    {
        $scope.disableForms(checkoutDate, holderForm);
    }, false);

    $scope.disableForms(checkoutDate, holderForm);
};

$scope.disableForms = function disableForms(checkoutDate, holderForm) {
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
};

$scope.updateBook = function updateBook()
{
    const title = document.getElementById("titleForm").value;
    //Index position on dropdown corresponds to status codes
    const status = document.getElementById("statusForm").selectedIndex;
    const holder = document.getElementById("holderName").value;
    const checkoutDate = document.getElementById("checkoutDate").value;
    const id = $rootScope.getCookie("id");

    var args = { "id": id, "title": title, "status": status, "holder" : holder, "day" : checkoutDate};
    args = JSON.stringify(args);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            swal("Book Updated Successfully!", "", "success").then(function()
            {
                $rootScope.returnHome();
            });
        }
    };
    xmlhttp.open("POST", "database/databaseFunctions.php?fxn=updateBookRemote&args="+args, true);
    xmlhttp.send();
};

}]);