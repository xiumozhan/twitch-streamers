twitchApp.controller('twitchController', ['$scope', '$http', 'twitchService', function($scope, $http, twitchService) {

    $scope.channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                        "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "moonducktv",
                        "dreamhackcs", "feardota", "merlinidota", "universedota", "arteezy",
                         "zai", "eternalenvyy", "test_channel", "comster40"];
    $scope.streams = [];
    $scope.selected = 'all';

    $scope.statusMap = {
        All: 'all',
        Online: 'online',
        Offline: 'offline'
    };

    $scope.filterChannels = function(status) {
        $scope.streams = [];
        $scope.loadStreamData($scope.selected);
    };

    $scope.loadStreamData = function(selection) {
        $scope.channels.forEach(function(channel) {
            twitchService.getStreams(channel).then(function(data) {
                var streamingData = data.data.stream;
                if(streamingData !== null) {
                    if(selection === 'all' || selection === 'online') {
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
                    }

                } else {
                    twitchService.getUsers(channel).then(function(data) {
                        var userData = data.data;
                        var rootUrl = 'https://www.twitch.tv/';
                        if(userData.name !== undefined) {
                            if(selection === 'all' || selection === 'offline') {
                                $scope.streams.push({
                                    name: userData.display_name,
                                    status: 'offline',
                                    details: {
                                        streamingUrl: rootUrl + channel,
                                        streamerLogo: userData.logo
                                    }
                                });
                            }

                        } else {
                            if(selection === 'all') {
                                $scope.streams.push({
                                    name: channel,
                                    status: 'error',
                                    message: 'This user account does not exist or has been removed'
                                });
                            }
                        }

                    });

                }

            });
        });
    };

    $scope.loadStreamData($scope.selected);

}]);
