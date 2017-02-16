twitchApp.directive('streamer', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/streamer.html',
        replace: true,
        scope: {
            stream: '=',
            fallbackBanner: '=',
        }
    }
});
