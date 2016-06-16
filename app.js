var wikiApp = angular.module("wikiApp", []);

var wikiController = wikiApp.controller("wikiController",
    function ($scope, $http) {
        //$scope.startURL = "https://en.wikipedia.org/wiki/John_Lennon"
        $scope.counter = 0;
        $scope.ender;
        $scope.message;
        $scope.previous = "home";
        $scope.pages = [];
        $scope.pages.push("home");
        $scope.begin = function () {
            $scope.pages = ["home"];
            $scope.previous = "home";
            var lastPart = $scope.startURL.split("/").pop();
            $scope.pages.push(lastPart);
            $scope.message = undefined;
            $scope.counter = 0;
            $scope.endURL = $scope.ender;
            $scope.retrieve($scope.startURL);
        }
        $scope.retrieve = function (URL) {
            console.log(URL);
            $http.get(URL).then(function (response) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(response.data, 'text/html');
                $scope.links = doc.querySelectorAll("a[href*=\"wiki/\"]:not([href$=\".jpg\"])[href^=\"/wiki/\"]:not([href^=\"/wiki/File\"]):not([href^=\"/wiki/Wikipedia\"]):not([href^=\"/wiki/Special\"]):not([href^=\"/wiki/Help\"]):not([href^=\"/wiki/Category\"]):not([href^=\"/wiki/Talk\"]):not([href^=\"/wiki/Main\"]):not([href^=\"/wiki/Portal\"])");
            });
        }

        $scope.getTitle = function (i) {
            return $scope.links[i]["title"];
        }

        $scope.getHREF = function (i) {
            return $scope.links[i]["href"];
        }

        increment = function () {
            $scope.counter += 1;
        }

        $scope.select = function (href) {
            $scope.previous = $scope.pages[$scope.pages.length - 1];
            $scope.pages.push(href.split("/").pop());
            increment();
            var URL = "https://en.wikipedia.org" + href;
            if (("https://en.wikipedia.org" + href) == $scope.endURL) {
                $scope.links = undefined;
                $scope.message = "You Won in " + $scope.counter + " clicks!";
            }
            else {
                $scope.retrieve(URL);
            }
        }
        $scope.back = function () {
            if ($scope.counter > 0) {
                $scope.pages = $scope.pages.slice(0, $scope.pages.length - 1);
                $scope.retrieve("https://en.wikipedia.org/wiki/" + $scope.pages[$scope.pages.length - 1]);
                $scope.counter -= 1;
                $scope.previous = $scope.pages[$scope.pages.length - 2];
            }
        }
        $scope.pagesX = function (){
            return $scope.pages.slice(1, $scope.pages.length)
        }
    });
