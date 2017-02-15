twitchApp.controller('twitchController', ['$scope', '$http', 'twitchService', function($scope, $http, twitchService) {
    $scope.channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    $scope.channels.forEach(function(channel) {
        twitchService.getStreams(channel).then(function(data) {
            console.log(data);
            twitchService.getChannels(channel).then(function(data) {
                console.log(data);
            });
        });
    });
}]);
