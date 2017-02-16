twitchApp.service('twitchService', ['$http', '$sce', function($http, $sce) {
    this.getChannels = function(channel) {
        var request = {
            method: 'jsonp',
            url: $sce.trustAsResourceUrl('https://wind-bow.gomix.me/twitch-api/channels/' + channel)
        };
        return $http(request);
    };

    this.getStreams = function(stream) {
        var request = {
            method: 'jsonp',
            url: $sce.trustAsResourceUrl('https://wind-bow.gomix.me/twitch-api/streams/' + stream)
        };
        return $http(request);
    };

    this.getUsers = function(user) {
        var request = {
            method: 'jsonp',
            url: $sce.trustAsResourceUrl('https://wind-bow.gomix.me/twitch-api/users/' + user)
        };
        return $http(request);
    }
}]);
