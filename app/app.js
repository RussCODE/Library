'use strict';

angular.module('libraryApp', [
  'ngRoute',
  'ui.router'
]).
config(['$locationProvider', '$routeProvider', '$stateProvider', function($locationProvider, $routeProvider, $stateProvider)
{
  $locationProvider.hashPrefix('!');
    $routeProvider
        .when("/",
        {
            templateUrl : "home/home.html"
        }).otherwise(
        {
            templateUrl : "home/home.html"
        });

    $stateProvider.state("Default", {});

    $stateProvider.state("Modal",
    {
        views:
        {
            "modal":
            {
                templateUrl: "modal.html"
            }
        },

        onEnter: ["$state", function($state)
        {
            $(document).on("click", ".Modal-backdrop, .Modal-holder", function()
            {
                $state.go("Default");
            });

            $(document).on("click", ".Modal-box, .Modal-box *", function(e)
            {
                e.stopPropagation();
            });
        }],

        abstract: true
    });

    $stateProvider.state("Modal.addBook",
    {
        views:
        {
            "modal":
            {
                templateUrl: "addBook/addBook.html"
            }
        }
    });

    $stateProvider.state("Modal.updateBook",
        {
            views:
                {
                    "modal":
                        {
                            templateUrl: "updateBook/updateBook.html"
                        }
                }
        });
}]).run(function($rootScope, $state) {

    $rootScope.books = [];
    $rootScope.table = undefined;

    $rootScope.onLoad = function onLoad()
    {
        if ($rootScope.table !== undefined)
        {
            $rootScope.table.clear();
            $rootScope.table.destroy();
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                $rootScope.books = JSON.parse(this.responseText);
                $rootScope.loadTable();
            }
        };
        xmlhttp.open("GET", "database/databaseFunctions.php?fxn=getBooks&args=''", true);
        xmlhttp.send();
    };

    $rootScope.loadTable = function loadTable() {

        $rootScope.table = $('#booksTable').DataTable(
            {
                dom: 'Bfrtip',
                buttons: [
                    {
                        text: 'Add book',
                        className: 'button button1',
                        action: function ( e, dt, node, config ) {
                            $state.go("Modal.addBook");
                        }
                    }
                ]
            });

        var book;
        var btnId;
        var updateBtn;
        var deleteBtn;
        var status;
        for (var i = 0; i < $rootScope.books.length; i++)
        {
            book = $rootScope.books[i];
            status = getStatus(book.statusCode);
            btnId = "btn" + book.id;
            updateBtn = book.statusCode != 4 ? "<button id=" + btnId + " class='button button1'>Update Book</button>" : "";
            deleteBtn = "<button id=del" + btnId + " class='button button1'>Delete Book</button>";
            $rootScope.table.row.add([book.id, book.title, status, book.statusCode,
                book.book_holder.replace("NULL", ""),  book.book_holder.replace("NULL", ""),
                book.date_check_out.replace("NULL", ""), updateBtn, deleteBtn]).draw(false);

            if (updateBtn !== "")
            {
                document.getElementById(btnId).addEventListener("click", function buttonClicked()
                {
                    const id = this.id;
                    var index = $rootScope.table.rows().eq(0).filter(function (rowIdx)
                    {
                        return $rootScope.table.cell(rowIdx, 0).data() === id.substring(3) ? true : false;
                    });
                    var bookInfo = $rootScope.table.rows(index).data()[0];
                    setCookies(bookInfo);
                    $state.go("Modal.updateBook");
                }, false);
            }

            document.getElementById("del" + btnId).addEventListener("click", function buttonClicked()
            {
                const id = this.id.substring(6);
                deleteBook(id);
            }, false);
        }
    };

    function deleteBook(id)
    {
        var args = { "id": id };
        args = JSON.stringify(args);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState === 4 && this.status === 200)
            {
                swal("Book Deleted Successfully!", "", "success").then(function()
                {
                    $rootScope.returnHome();
                });
            }
        };
        xmlhttp.open("POST", "database/databaseFunctions.php?fxn=deleteBookRemote&args="+args, true);
        xmlhttp.send();
    }

    function setCookies(bookInfo)
    {
        document.cookie = "id" + "=" + bookInfo[0];
        document.cookie = "title" + "=" + bookInfo[1];
        document.cookie = "statusCode" + "=" + bookInfo[3];
        document.cookie = "holder" + "=" + bookInfo[4];
        document.cookie = "owner" + "=" + bookInfo[5];
        document.cookie = "timestamp" + "=" + bookInfo[6];
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

    $rootScope.returnHome = function returnHome()
    {
        $state.go("Default");
        $rootScope.onLoad();
        return false;
    };

    $rootScope.getCookie = function(cname)
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


}).controller('libraryCtrl', ['$rootScope', function($rootScope)
{

}]);
