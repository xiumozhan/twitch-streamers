twitchApp.controller('twitchController', ['$scope', '$http', 'twitchService', function($scope, $http, twitchService) {
    $scope.channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                        "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "moonducktv",
                        "dreamhackcs", "feardota", "merlinidota", "universedota", "arteezy",
                         "zai", "eternalenvyy", "test_channel"];
    $scope.streams = [];

    $scope.loadStreamData = function() {
        $scope.channels.forEach(function(channel) {
            twitchService.getStreams(channel).then(function(data) {
                var streamingData = data.data.stream;
                if(streamingData !== null) {
                    $scope.streams.push({
                        name: streamingData.channel.display_name,
                        status: 'online',
                        details: {
                            game: streamingData.game,
                            currentStreaming: streamingData.channel.status,
                            viewer: streamingData.viewers,
                            streamPreview: streamingData.preview,
                            streamerLogo: streamingData.channel.logo,
                            latestActivatedAt: streamingData.channel.updated_at,
                            streamingUrl: streamingData.channel.url,
                        }
                    });
                } else {
                    $scope.streams.push({
                        name: channel,
                        status: 'offline'
                    });
                }

            });
        });
    }

    $scope.loadStreamData();
}]);
