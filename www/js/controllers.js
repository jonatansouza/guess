angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaSQLite) {
  $scope.select = function() {
        var query = "SELECT * FROM games";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).game);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
})

.controller('LoteriasController', function($scope) {
  $scope.shots = [];

  $scope.calculateShot = function(nNumbers, nShots) {
    if (nNumbers != undefined && nShots != undefined) {
      var i, tmpShot;
      for (i = 0; i < nShots; i++) {
        tmpShot = (Math.floor(Math.random() * nNumbers) + 1);
        while ($scope.shots.indexOf(tmpShot) > -1) {
          tmpShot = (Math.floor(Math.random() * nNumbers) + 1);
        }
        $scope.shots.push(tmpShot);
      }
      console.log($scope.shots);
      $scope.shots.sort(function(a, b) {
        return a - b
      });
    } else {
      alert("Deve ser preenchido os campos!");
    }
  };

  $scope.clearAll = function() {
    $scope.totalNumbers = null;
    $scope.totalShots = null;
    $scope.shots = [];
  };
})
.controller('MilharController', function($scope, $cordovaSQLite) {
  $scope.milhar = 0;
  $scope.guess = function(){
    $scope.milhar = (Math.floor(Math.random() * 9999) + 1);
  }

  $scope.saveGame = function(){
    var query = "INSERT INTO games (game) VALUES (?)";
      $cordovaSQLite.execute(db, query, [$scope.milhar]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
          console.error(err);
      });
  };


});
