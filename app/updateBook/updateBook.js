'use strict';

angular.module('libraryApp').controller('updateBookCtrl', ['$scope', '$rootScope', function($scope, $rootScope)
{
    var titleForm;
    var holderForm;
    var ownerForm;
    var statusForm;
    var checkoutDate;

$scope.onLoad = function onLoad()
{
    titleForm = document.getElementById("titleForm");
    titleForm.value = $rootScope.getCookie("title");
    holderForm = document.getElementById("holderName");
    holderForm.value = $rootScope.getCookie("holder").replace("NULL", "");
    ownerForm = document.getElementById("ownerName");
    ownerForm.value = $rootScope.getCookie("owner").replace("NULL", "");
    statusForm = document.getElementById("statusForm");
    statusForm.selectedIndex = $rootScope.getCookie("statusCode");
    checkoutDate = document.getElementById("checkoutDate");
    checkoutDate.value = $rootScope.getCookie("timestamp").replace("NULL", "");
    checkoutDate.addEventListener("click", function () {
        $("#checkoutDate").datepicker({ maxDate: new Date }).focus();
    }, false);

    statusForm.addEventListener("change", function ()
    {
        $scope.disableForms(checkoutDate, holderForm);
    }, false);

    $scope.disableForms();
};

$scope.disableForms = function disableForms() {
    if (statusForm.selectedIndex > 0 && statusForm.selectedIndex < 3) {
        checkoutDate.disabled = false;
        ownerForm.disabled = false;
        if (statusForm.selectedIndex == 2)
        {
            holderForm.disabled = true;
            holderForm.required = false;
            holderForm.value = "";
            ownerForm.required = true;
            checkoutDate.required = true;
        }
        else
        {
            holderForm.disabled = false;
            holderForm.required = true;
        }
    }
    else {
        holderForm.disabled = true;
        holderForm.required = false;
        holderForm.value = "";
        checkoutDate.disabled = true;
        checkoutDate.required = false;
        checkoutDate.value = "";
        ownerForm.disabled = true;
        ownerForm.required = false;
        ownerForm.value = "";
    }
};

$scope.updateBook = function updateBook()
{
    if (!validateForm())
    {
        return;
    }
    const title = document.getElementById("titleForm").value;
    //Index position on dropdown corresponds to status codes
    const status = document.getElementById("statusForm").selectedIndex;
    const holder = document.getElementById("holderName").value;
    const owner = document.getElementById("ownerName").value;
    const checkoutDate = document.getElementById("checkoutDate").value;
    const id = $rootScope.getCookie("id");

    var args = { "id": id, "title": title, "status": status, "holder" : holder, "day" : checkoutDate, "owner" : owner};
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

function validateForm()
{
    const statusCode = statusForm.selectedIndex;
    var isValid = titleForm != "";

    if (statusForm.selectedIndex > 0 && statusForm.selectedIndex < 3)
    {
        isValid = isValid && ownerForm.value != "" && checkoutDate.value != "";
        if (statusForm.selectedIndex == 1)
        {
            return isValid && holderForm.value != "";
        }
        else
        {
            return isValid;
        }
    }
    else
    {
        return isValid;
    }

}

}]);