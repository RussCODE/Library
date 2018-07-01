'use strict';

angular.module('libraryApp').controller('homeCtrl', ['$scope', '$window', function($scope, $window)
{

$scope.books = [];

$scope.onLoad = function onLoad()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            $scope.books = JSON.parse(this.responseText);
            $scope.loadTable();
        }
    };
    xmlhttp.open("GET", "database/databaseFunctions.php?fxn=getBooks&args=''", true);
    xmlhttp.send();
};

$scope.loadTable = function loadTable() {

    $scope.table = $('#booksTable').DataTable(
    {
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Add book',
                className: 'button button1',
                action: function ( e, dt, node, config ) {
                    $window.location.href = "../app/#!/addBook";
                }
            }
        ]
    });

    var book;
    var btnId;
    var updateBtn;
    var status;
    for (var i = 0; i < $scope.books.length; i++)
    {
        book = $scope.books[i];
        status = getStatus(book.statusCode);
        btnId = "btn" + book.id;
        updateBtn = book.statusCode != 4 ? "<button id=" + btnId + " class='button button1'>Update Book</button>" : "";
        $scope.table.row.add([book.id, book.title, status, book.statusCode,
            book.book_holder.replace("NULL", ""), book.date_check_out.replace("NULL", ""), updateBtn]).draw(false);

        if (updateBtn !== "")
        {
            document.getElementById(btnId).addEventListener("click", function buttonClicked()
            {
                const id = this.id;
                var index = $scope.table.rows().eq(0).filter(function (rowIdx)
                {
                    return $scope.table.cell(rowIdx, 0).data() === id.substring(3) ? true : false;
                });
                var bookInfo = $scope.table.rows(index).data()[0];
                setCookies(bookInfo);
                $window.location.href = "../app/#!/updateBook";
            }, false);
        }
    }
};

function setCookies(bookInfo)
{
    document.cookie = "id" + "=" + bookInfo[0];
    document.cookie = "title" + "=" + bookInfo[1];
    document.cookie = "statusCode" + "=" + bookInfo[3];
    document.cookie = "holder" + "=" + bookInfo[4];
    document.cookie = "timestamp" + "=" + bookInfo[5];
}

function getStatus(statusCode)
{
    if (statusCode == 0)
    {
        return "Available";
    }
    else if (statusCode == 1)
    {
        return "On Hold";
    }
    else if (statusCode == 2)
    {
        return "Checked Out";
    }
    else if (statusCode == 3)
    {
        return "Book Suspended (Temporary)";
    }
    else if (statusCode == 4)
    {
        return "Book Suspended (Permanent)";
    }
}


}]);