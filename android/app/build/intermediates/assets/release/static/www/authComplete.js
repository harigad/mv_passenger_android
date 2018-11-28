(function () {
    'use strict';

    angular
        .module('oneMVApp')
        .controller('authComplete1', authComplete1);

    authComplete1.$inject = ['$location', '$rootScope', 'authService', 'DivisionService', 'UtilityFactory', 'RedirectionService', 'LuumLinkedService'];

    function authComplete1($location, $rootScope, authService, DivisionService, UtilityFactory, RedirectionService, LuumLinkedService) {

        var vm = this;
        var divisionId = -1;

        activate();

        function activate() {
            divisionId = DivisionService.getDivisionId();
            var fragment = getFragment();
            $location.search('');

            if (fragment.error && fragment.error != '') {
                UtilityFactory.toastError('Error', fragment.error);
                RedirectionService.redirect();
            }
            else 
                fragment.haslocalaccount == 'False' ? verify(fragment): obtainLocalToken(fragment);
        }


        function obtainLocalToken(fragment) {
            var externalData = {
                provider: fragment.provider,
                externalAccessToken: fragment.external_access_token,
                userName: fragment.external_user_name,
                divisionId: divisionId
            };
            authService.obtainAccessToken(externalData).then(
                function (response) {
                    $rootScope.$broadcast('loggedIn', null);
                    RedirectionService.redirect();
                },
                function (err) {
                    vm.message = err.error_description;
                });
        }

        function verify(fragment) {
            fragment.provider.toUpperCase() == 'amazon'.toUpperCase()
            ? verifyLuumRegistrationTimeline(fragment)
            : register(fragment);            
        }

        function verifyLuumRegistrationTimeline(fragment) {
            LuumLinkedService
                   .getNewPassengerLuumLinkageInfo(divisionId)
                   .then(
                       function (response) {
                           (response.data.status == 1 && response.data.result && response.data.result.showMessage)
                               ? LuumLinkedService.displayNewPassengerMessage(response.data.result.message)                           
                               : register(fragment);
                       });
        }

        function register(fragment) {
            authService.externalAuthData = {
                provider: fragment.provider,
                userName: fragment.external_user_name,
                externalAccessToken: fragment.external_access_token,
                firstName: fragment.firstname,
                lastName: fragment.lastname
            };


            DivisionService.getDivisionInfo()
            .then(function (response) {
                var feedType = response.data.result.DivisionFeedType.FeedType;
                var redirectPath = feedType == "NoFeed" ? '/verification' : '/registerExternal'

                RedirectionService.redirectTo(redirectPath);
            });
        }

        function getFragment() {
            return parseQueryString(window.location.hash.substr(15));
        };

        function parseQueryString(queryString) {
            var data = {},
                pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

            if (queryString === null) {
                return data;
            }

            pairs = queryString.split("&");

            for (var i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                separatorIndex = pair.indexOf("=");

                if (separatorIndex === -1) {
                    escapedKey = pair;
                    escapedValue = null;
                } else {
                    escapedKey = pair.substr(0, separatorIndex);
                    escapedValue = pair.substr(separatorIndex + 1);
                }

                key = decodeURIComponent(escapedKey);
                value = decodeURIComponent(escapedValue);

                data[key] = value;
            }

            return data;
        }
    }
})();
