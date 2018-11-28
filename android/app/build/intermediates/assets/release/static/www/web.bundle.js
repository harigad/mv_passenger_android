(function () {
  var _env = {};
  var _googleMapsConfig = {};
  if (window) {
    Object.assign(_env, window._env);
    Object.assign(_googleMapsConfig, window._googleMapsConfig);
  }

  var app = angular.module('oneMVApp', [
      'ui.router',
      'ngAnimate',
      'ui.bootstrap',            
      'uiGmapgoogle-maps',
      'LocalStorageModule',
      'ngCookies',
      'angularMoment',
      'angucomplete-alt',
      'uiRouterStyles',
      'vcRecaptcha',
      'ngLoadScript',
      'smoothScroll',
      'angular-loading-bar',
      'ngDisableScroll',
      'swipe',
      'ngMeta',
      'ngAria'
    ])
    
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = true;
      cfpLoadingBarProvider.parentSelector = '#page-wrapper';
      cfpLoadingBarProvider.latencyThreshold = 500;
    }])

    .config(
      function ($stateProvider, $urlRouterProvider, ngMetaProvider,$locationProvider,
        $controllerProvider, $httpProvider,uiGmapGoogleMapApiProvider) {
       
          $locationProvider.hashPrefix('');

          ngMetaProvider.useTitleSuffix(true);

        $httpProvider.interceptors.push('authInterceptorService');
       
        uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyCztqRTaQzgBxu0DMV9cDKq0IciqMaQI5E',
          v: '3.25',
          libraries: 'weather,geometry,visualization'
        });

        var origController = app.controller;

        app.controller = function (name, constructor) {
          $controllerProvider.register(name, constructor);
          return origController.apply(this, arguments);
        };


        $urlRouterProvider.otherwise("dashboard/");
        $stateProvider
          .state('home-commuter', {
            url: "/commuter/home-commuter",
            templateUrl: "app/modules/commuter/home/home.html",
            controller: 'CommuterHomeController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Dashboard | Ride',
                'description': 'Advanced reservation, All bus stops, Published Schedule'
              }
            }
          })
          .state('all-stops', {
            url: "/commuter/all-stops",
            templateUrl: "app/modules/commuter/all-stops/all-stops.html",
            controller: 'AllStopsController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Bus Stops | Ride',
                'description': 'All available commuter bus stops '
              }
            }
          })
          .state('privacy', {
            url: "/privacy",
            templateUrl: "app/modules/commuter/privacy/privacy.html",
            data: {
              meta: {
                'title': 'Privacy',
                'description': 'Parking and Privacy Policies'
              }
            }
          })
          .state('news', {
            url: "/news",
            templateUrl: "app/modules/shared/whats-new/whats-new.html",
            controller: 'WhatsNewController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Whats New',
                'description': 'News and lastest applicaiton updates'
              }
            }
          })
          .state('profile', {
            url: "/shared/profile",
            templateUrl: "app/modules/shared/profile/profile.html",
            controller: 'ProfileController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Profile',
                'description': 'Manage your profile'
              }
            }
          })
          .state('settings', {
            url: "/settings",
            templateUrl: "app/modules/shared/settings/settings.html",
            controller: 'SettingsController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Settings',
                'description': 'Parking and Privacy Policies'
              }
            }
          })
          .state('support', {
            url: "/support",
            templateUrl: "app/modules/shared/support/support.html",
            controller: 'SupportController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Support',
                'description': 'Parking and Privacy Policies'
              }
            }
          })
          .state('selected-stop', {
            url: "/commuter/selected-stop",
            templateUrl: "app/modules/commuter/stop/selected-stop.html",
            controller: 'SelectedStopController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Bus Stop | Ride',
                'description': 'Create a Ride reservation for a single day'
              }
            }
          })
          .state('schedule', {
            url: "/commuter/schedule",
            templateUrl: "app/modules/commuter/schedule/schedule.html",
            controller: 'ScheduleController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Schedule | Ride',
                'description': 'Parking and Privacy Policies'
              }
            }
          })
          .state('selected-trip', {
            url: "/on-demand/selected-trip/:dbId/:blockId/:minIncId/:stopId",
            templateUrl: "app/modules/commuter/selected-trip/selected-trip.html",
            controller: 'SelectedTripController',
            controllerAs: 'vm',
          })
          .state('published-schedule', {
            url: "/commuter/published-schedule",
            templateUrl: "app/modules/commuter/published-schedule/published-schedule.html",
            controller: 'PublishedScheduleController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Published Schedule | Ride',
                'description': 'Posted schedules for Ride'
              }
            }
          })
          .state('verification', {
            url: "/verification",
            templateUrl: "app/modules/shared/verification/verification.html",
            controller: 'VerificationController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Verification | Registration',
                'description': 'Parking and Privacy Policies'
              }
            }
          })

          .state('directions', {
            url: "/commuter/directions",
            templateUrl: "app/modules/commuter/directions/directions.html",
            controller: 'DirectionsController',
            controllerAs: 'vm',
            data: {
              css: 'css/main.css',
              meta: {
                'title': 'Driving Directions | Ride',
                'description': 'Parking and Privacy Policies'
              }
            }
          })
          .state('last-location', {
            url: "/commuter/last-location",
            templateUrl: "app/modules/commuter/location/last-location.html",
            controller: 'LastLocationController',
            controllerAs: 'vm',
            data: {
              css: 'css/main.css',
              meta: {
                'title': 'Last Location',
              }
            }
          })       
          .state('adv-schedule-setup', {
            url: "/commuter/adv-schedule-setup",
            templateUrl: "app/modules/commuter/adv-schedule/adv-schedule-setup.html",
            controller: 'AdvScheduleSetupController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Advanced Scheduling (1 of 3) | Ride',
                'description': 'Parking and Privacy Policies'
              }
            },
            params: { obj: null }
          })
          .state('adv-schedule', {
            url: "/commuter/adv-schedule",
            templateUrl: "app/modules/commuter/adv-schedule/adv-schedule.html",
            controller: 'AdvScheduleController',
            controllerAs: 'vm',
            params: {
              obj: null
            },
            data: {
              meta: {
                'title': 'Advanced Scheduling (2 of 3) | Ride',
                'description': 'Selected that days and times you wish to use Ride'
              }
            }
          })
          .state('adv-schedule-confirmation', {
            url: "/commuter/adv-schedule-confirmation",
            templateUrl: "app/modules/commuter/adv-schedule/adv-schedule-confirmation.html",
            controller: 'AdvScheduleConfirmationController',
            controllerAs: 'vm',
            params: {
              obj: null
            },
            data: {
              meta: {
                'title': 'Advanced Scheduling (3 of 3) | Ride',
                'description': 'Parking and Privacy Policies'
              }
            }
          })
          .state('my-vehicles', {
            url: "/commuter/my-vehicles",
            templateUrl: "app/modules/commuter/my-vehicles/my-vehicles.html",
            controller: 'MyVehiclesController',
            controllerAs: 'vm',
            meta: {
              'title': 'Vehicles',
              'description': 'Parking and Privacy Policies'
            }
          })
          .state('policy', {
            url: "/commuter/policy",
            templateUrl: "app/modules/commuter/policy/policies.html",
            meta: {
              'title': 'Policy',
              'description': 'Parking and Privacy Policies'
            }
          })
          .state('parking-policy', {
            url: "/commuter/parking-policy",
            templateUrl: "app/modules/commuter/parking-policy/parking-policy.html",
            meta: {
              'title': 'Parking Policy',
              'description': 'Parking and Privacy Policies'
            }
          })
          .state('passengerTrips',{
            url: "/passenger-trips",
            templateUrl: "app/modules/shared/trips/passenger-trips.html",
            controller: "PassengerTripsCtrl",
            controllerAs: 'vm',
            meta: {
              'title': 'My Trips',
              'description': 'Passenger Trips'
            }
          })         
          .state('reservations', {
            url: "/on-demand/reservations",
            templateUrl: "app/modules/on-demand/reservations/reservations.html",
            controller: "ReservationsController",
            controllerAs: 'vm',
            data: {
              css: 'css/main2.css',
              meta: {
                'title': 'Book Trip | On Demand',
                'description': 'Book an On Demand Trip'
              }
            }
          })
          .state('activeTrips', {
            url: "/on-demand/active-trip",
            templateUrl: "app/modules/on-demand/activeTrip/active-trip.html",
            controller: "ActiveTripController",
            controllerAs: 'vm',
            data: {
              css: 'css/main2.css',
              meta: {
                'title': 'Active Trip | On Demand',
                'description': 'Your in progress trip'
              }
            }
          })
          .state('division', {
            url: "/division",
            templateUrl: "app/modules/shared/division/divisions.html",
            controller: 'DivisionsController',
            controllerAs: 'vm',
            meta: {
              'title': 'Change Division',
              'description': 'Parking and Privacy Policies'
            }
          })
          .state('dashboard', {
            url: "/dashboard/:division",
            templateUrl: "app/modules/shared/dashboard/dashboard.html",
            controller: 'DashboardController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Home',
                'description': 'Services landing page'
              }
            }
          })
          .state('dashboard1', {
            url: "/dashboard/:division/",
            templateUrl: "app/modules/shared/dashboard/dashboard.html",
            controller: 'DashboardController',
            controllerAs: 'vm'
          })
          .state('loginOneMV', {
            url: "/loginOneMV",
            templateUrl: "app/modules/shared/login/onemv-login.html",
            controller: 'OneMVLoginController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'OneMV Login',
                'description': 'Login using your OneMV credentials'
              }
            }
          })
          .state('register', {
            url: "/register",
            templateUrl: "app/modules/shared/registration/onemv-registration.html",
            controller: 'OneMVRegistrationController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Register',
                'description': 'Create a new OneMV account'
              }
            }
          })
          .state('registerExternal', {
            url: "/registerExternal",
            templateUrl: "app/modules/shared/registration/external-registration.html",
            controller: 'ExternalRegistrationController',
            controllerAs: 'vm',
          })
          .state('fr-stops', {
            url: "/fixed-route/stops",
            templateUrl: "app/modules/fixed-route/stops/fr-stops.html",
            controller: 'FrStopsController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Bus Stops | Fixed Route',
                'description': 'Search fixed route bus stops'
              }
            }
          })
          .state('fixed-route-landing', {
            url: "/fixed-route/landing",
            templateUrl: "app/modules/fixed-route/Landing/landing.html",
            controller: 'LandingController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Home | Fixed Route',
                'description': 'Select the way you wish to search for a fixed route'
              }
            }
          })
          .state('fixed-route', {
            url: "/fixed-route/allRoutes",
            templateUrl: "app/modules/fixed-route/routes/all-routes.html",
            controller: 'AllRoutesController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Routes (1 of 2) | Fixed Route',
                'description': 'Explore available routes'
              }
            }
          })
          .state('stops-for-route', {
            url: "/fixed-route/routes/:routeId",
            templateUrl: "app/modules/fixed-route/stops-for-route/stops-for-route.html",
            controller: 'StopsForRouteController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Routes (2 of 2) | Fixed Route',
                'description': 'Your selected route'
              }
            }
          })
          .state('fr-schedule', {
            url: "/fixed-route/schedule",
            templateUrl: "app/modules/fixed-route/schedule/fr-schedule.html",
            controller: 'FrScheduleController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Published Schedule | Fixed Route',
                'description': 'Posted Fixed Route schedule'
              }
            }
          })
          .state('notifications', {
            url: "/notifications",
            templateUrl: "app/modules/shared/notification/notification.html",
            controller: 'NotificationController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Notifications',
                'description': 'Service and routes notification update'
              }
            }
          })
          .state('login', {
            url: "/login",
            templateUrl: "app/modules/shared/login/login.html",
            controller: 'LoginController',
            controllerAs: 'vm',
            meta: {
              'title': 'Login',
              'description': 'Login to fully utilize our services'
            }
          })
          .state('logout', {
            url: "/logout",
            templateUrl: "app/modules/shared/logout/logout.html",
            controller: 'LogoutController',
            controllerAs: 'vm'
          })
          .state('404', {
            url: "/not-found",
            templateUrl: "404.html"
          })
          .state('min-app-support', {
            url: "/min-app-support",
            templateUrl: "app/modules/shared/min-app-support/min-app-support.html",
            controller: 'MinAppSupportController',
            controllerAs: 'vm',
            data: {
              meta: {
                'title': 'Application out of date',
                'description': 'An update is required'
              }
            }
          })
          .state('auth', {
            url: "/authComplete",
            templateUrl: "authComplete.html",
            controller: 'authComplete1',
            controllerAs: 'vm'
          })
            .state('change-password', {
                url: "/change-password",
                templateUrl: "app/modules/shared/profile/change-password.html",
                controller: 'ChangePasswordController',
                controllerAs: 'vm',
                data: {
                    meta: {
                        'title': 'Change Password',
                        'description': 'Change Password'
                    }
                }
            })
          .state('forgot-password', {
              url: "/forgot-password",
              templateUrl: "app/modules/shared/login/forgot-password.html",
              controller: 'ForgotPasswordController',
              controllerAs: 'vm',
              data: {
                  meta: {
                      'title': 'Forgot Password',
                      'description': 'Forgot Password'
                  }
              }
          })          
          .state('verify-update-password', {
              url: "/verify-update-password",
              templateUrl: "app/modules/shared/login/verify-update-password.html",
              controller: 'VerifyUpdatePasswordController',
              controllerAs: 'vm',
              params: {
                  obj: null
              },
              data: {
                  meta: {
                      'title': 'Verify and update password',
                      'description': 'Verify Temporary Code and update password'
                  }
              }
          });
       
      })
    .constant('env', _env)
    .constant('googleMapsConfig', _googleMapsConfig)
    .service('passengerInitGestalt', function () {
      this.getData = function () {
        return initModel;
      };
    })
    .run(['authService', 'ngMeta', function (authService, ngMeta) {
      authService.fillAuthData();
      ngMeta.init();
    }])
    .run(function($rootScope){
      $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  });




  $(function () {
    //caches a jQuery object containing the header element
    var wrapper = angular.element(document);
    var body = angular.element("#page-wrapper");
    wrapper.scroll(function () {
      var scroll = wrapper.scrollTop();
      if (scroll >= 68) {
        body.removeClass('not-scrolled').addClass("scrolled");
      } else {
        body.removeClass("scrolled").addClass('not-scrolled');
      }
    });
  });
}());

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

(function (window) {
    window._googleMapsConfig = window._googleMapsConfig || {};
    window._googleMapsConfig.mapStyles = [
{
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#ebe3cd"
      }
    ]
},
{
    "elementType": "labels.text.fill",
    "stylers": [
      {
          "color": "#523735"
      }
    ]
},
{
    "elementType": "labels.text.stroke",
    "stylers": [
      {
          "color": "#f5f1e6"
      }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
          "color": "#c9b2a6"
      }
    ]
},
{
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
          "color": "#dcd2be"
      }
    ]
},
{
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
          "visibility": "off"
      }
    ]
},
{
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
          "color": "#ae9e90"
      }
    ]
},
{
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#dfd2ae"
      }
    ]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#dfd2ae"
      }
    ]
},
{
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
          "color": "#93817c"
      }
    ]
},
{
    "featureType": "poi.business",
    "stylers": [
      {
          "visibility": "off"
      }
    ]
},
{
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
          "color": "#a5b076"
      }
    ]
},
{
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
          "visibility": "off"
      }
    ]
},
{
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
          "color": "#447530"
      }
    ]
},
{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#f5f1e6"
      }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#fdfcf8"
      }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#f8c967"
      }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
          "color": "#e9bc62"
      }
    ]
},
{
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#e98d58"
      }
    ]
},
{
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
          "color": "#db8555"
      }
    ]
},
{
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
          "visibility": "off"
      }
    ]
},
{
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
          "color": "#806b63"
      }
    ]
},
{
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#dfd2ae"
      }
    ]
},
{
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
          "color": "#8f7d77"
      }
    ]
},
{
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
          "color": "#ebe3cd"
      }
    ]
},
{
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
          "color": "#dfd2ae"
      }
    ]
},
{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
          "color": "#b9d3c2"
      }
    ]
},
{
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
          "color": "#92998d"
      }
    ]
}
];
    Object.freeze(window._googleMapsConfig);
})(this);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImF1dGhDb21wbGV0ZS5qcyIsIm1hcFN0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoid2ViLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIF9lbnYgPSB7fTtcclxuICB2YXIgX2dvb2dsZU1hcHNDb25maWcgPSB7fTtcclxuICBpZiAod2luZG93KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKF9lbnYsIHdpbmRvdy5fZW52KTtcclxuICAgIE9iamVjdC5hc3NpZ24oX2dvb2dsZU1hcHNDb25maWcsIHdpbmRvdy5fZ29vZ2xlTWFwc0NvbmZpZyk7XHJcbiAgfVxyXG5cclxuICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ29uZU1WQXBwJywgW1xyXG4gICAgICAndWkucm91dGVyJyxcclxuICAgICAgJ25nQW5pbWF0ZScsXHJcbiAgICAgICd1aS5ib290c3RyYXAnLCAgICAgICAgICAgIFxyXG4gICAgICAndWlHbWFwZ29vZ2xlLW1hcHMnLFxyXG4gICAgICAnTG9jYWxTdG9yYWdlTW9kdWxlJyxcclxuICAgICAgJ25nQ29va2llcycsXHJcbiAgICAgICdhbmd1bGFyTW9tZW50JyxcclxuICAgICAgJ2FuZ3Vjb21wbGV0ZS1hbHQnLFxyXG4gICAgICAndWlSb3V0ZXJTdHlsZXMnLFxyXG4gICAgICAndmNSZWNhcHRjaGEnLFxyXG4gICAgICAnbmdMb2FkU2NyaXB0JyxcclxuICAgICAgJ3Ntb290aFNjcm9sbCcsXHJcbiAgICAgICdhbmd1bGFyLWxvYWRpbmctYmFyJyxcclxuICAgICAgJ25nRGlzYWJsZVNjcm9sbCcsXHJcbiAgICAgICdzd2lwZScsXHJcbiAgICAgICduZ01ldGEnLFxyXG4gICAgICAnbmdBcmlhJ1xyXG4gICAgXSlcclxuICAgIFxyXG4gICAgLmNvbmZpZyhbJ2NmcExvYWRpbmdCYXJQcm92aWRlcicsIGZ1bmN0aW9uIChjZnBMb2FkaW5nQmFyUHJvdmlkZXIpIHtcclxuICAgICAgY2ZwTG9hZGluZ0JhclByb3ZpZGVyLmluY2x1ZGVTcGlubmVyID0gdHJ1ZTtcclxuICAgICAgY2ZwTG9hZGluZ0JhclByb3ZpZGVyLnBhcmVudFNlbGVjdG9yID0gJyNwYWdlLXdyYXBwZXInO1xyXG4gICAgICBjZnBMb2FkaW5nQmFyUHJvdmlkZXIubGF0ZW5jeVRocmVzaG9sZCA9IDUwMDtcclxuICAgIH1dKVxyXG5cclxuICAgIC5jb25maWcoXHJcbiAgICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCBuZ01ldGFQcm92aWRlciwkbG9jYXRpb25Qcm92aWRlcixcclxuICAgICAgICAkY29udHJvbGxlclByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyLHVpR21hcEdvb2dsZU1hcEFwaVByb3ZpZGVyKSB7XHJcbiAgICAgICBcclxuICAgICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoJycpO1xyXG5cclxuICAgICAgICAgIG5nTWV0YVByb3ZpZGVyLnVzZVRpdGxlU3VmZml4KHRydWUpO1xyXG5cclxuICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3JTZXJ2aWNlJyk7XHJcbiAgICAgICBcclxuICAgICAgICB1aUdtYXBHb29nbGVNYXBBcGlQcm92aWRlci5jb25maWd1cmUoe1xyXG4gICAgICAgICAga2V5OiAnQUl6YVN5Q3p0cVJUYVF6Z0J4dTBETVY5Y0RLcTBJY2lxTWFRSTVFJyxcclxuICAgICAgICAgIHY6ICczLjI1JyxcclxuICAgICAgICAgIGxpYnJhcmllczogJ3dlYXRoZXIsZ2VvbWV0cnksdmlzdWFsaXphdGlvbidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIG9yaWdDb250cm9sbGVyID0gYXBwLmNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIGFwcC5jb250cm9sbGVyID0gZnVuY3Rpb24gKG5hbWUsIGNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAkY29udHJvbGxlclByb3ZpZGVyLnJlZ2lzdGVyKG5hbWUsIGNvbnN0cnVjdG9yKTtcclxuICAgICAgICAgIHJldHVybiBvcmlnQ29udHJvbGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiZGFzaGJvYXJkL1wiKTtcclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgLnN0YXRlKCdob21lLWNvbW11dGVyJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbW11dGVyL2hvbWUtY29tbXV0ZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvY29tbXV0ZXIvaG9tZS9ob21lLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbW11dGVySG9tZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnRGFzaGJvYXJkIHwgUmlkZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnQWR2YW5jZWQgcmVzZXJ2YXRpb24sIEFsbCBidXMgc3RvcHMsIFB1Ymxpc2hlZCBTY2hlZHVsZSdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FsbC1zdG9wcycsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jb21tdXRlci9hbGwtc3RvcHNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvY29tbXV0ZXIvYWxsLXN0b3BzL2FsbC1zdG9wcy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBbGxTdG9wc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnQnVzIFN0b3BzIHwgUmlkZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnQWxsIGF2YWlsYWJsZSBjb21tdXRlciBidXMgc3RvcHMgJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgncHJpdmFjeScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wcml2YWN5XCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL2NvbW11dGVyL3ByaXZhY3kvcHJpdmFjeS5odG1sXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnUHJpdmFjeScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnUGFya2luZyBhbmQgUHJpdmFjeSBQb2xpY2llcydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ25ld3MnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbmV3c1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9zaGFyZWQvd2hhdHMtbmV3L3doYXRzLW5ldy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdXaGF0c05ld0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnV2hhdHMgTmV3JyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdOZXdzIGFuZCBsYXN0ZXN0IGFwcGxpY2FpdG9uIHVwZGF0ZXMnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdwcm9maWxlJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3NoYXJlZC9wcm9maWxlXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL3NoYXJlZC9wcm9maWxlL3Byb2ZpbGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnUHJvZmlsZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnTWFuYWdlIHlvdXIgcHJvZmlsZSdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ3NldHRpbmdzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3NldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL3NoYXJlZC9zZXR0aW5ncy9zZXR0aW5ncy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTZXR0aW5nc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnU2V0dGluZ3MnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1BhcmtpbmcgYW5kIFByaXZhY3kgUG9saWNpZXMnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdzdXBwb3J0Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3N1cHBvcnRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvc2hhcmVkL3N1cHBvcnQvc3VwcG9ydC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTdXBwb3J0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdTdXBwb3J0JyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdQYXJraW5nIGFuZCBQcml2YWN5IFBvbGljaWVzJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnc2VsZWN0ZWQtc3RvcCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jb21tdXRlci9zZWxlY3RlZC1zdG9wXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL2NvbW11dGVyL3N0b3Avc2VsZWN0ZWQtc3RvcC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTZWxlY3RlZFN0b3BDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ0J1cyBTdG9wIHwgUmlkZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnQ3JlYXRlIGEgUmlkZSByZXNlcnZhdGlvbiBmb3IgYSBzaW5nbGUgZGF5J1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnc2NoZWR1bGUnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY29tbXV0ZXIvc2NoZWR1bGVcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvY29tbXV0ZXIvc2NoZWR1bGUvc2NoZWR1bGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnU2NoZWR1bGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ1NjaGVkdWxlIHwgUmlkZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnUGFya2luZyBhbmQgUHJpdmFjeSBQb2xpY2llcydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ3NlbGVjdGVkLXRyaXAnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvb24tZGVtYW5kL3NlbGVjdGVkLXRyaXAvOmRiSWQvOmJsb2NrSWQvOm1pbkluY0lkLzpzdG9wSWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvY29tbXV0ZXIvc2VsZWN0ZWQtdHJpcC9zZWxlY3RlZC10cmlwLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1NlbGVjdGVkVHJpcENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdwdWJsaXNoZWQtc2NoZWR1bGUnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY29tbXV0ZXIvcHVibGlzaGVkLXNjaGVkdWxlXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL2NvbW11dGVyL3B1Ymxpc2hlZC1zY2hlZHVsZS9wdWJsaXNoZWQtc2NoZWR1bGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUHVibGlzaGVkU2NoZWR1bGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ1B1Ymxpc2hlZCBTY2hlZHVsZSB8IFJpZGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1Bvc3RlZCBzY2hlZHVsZXMgZm9yIFJpZGUnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCd2ZXJpZmljYXRpb24nLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvdmVyaWZpY2F0aW9uXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL3NoYXJlZC92ZXJpZmljYXRpb24vdmVyaWZpY2F0aW9uLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1ZlcmlmaWNhdGlvbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnVmVyaWZpY2F0aW9uIHwgUmVnaXN0cmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdQYXJraW5nIGFuZCBQcml2YWN5IFBvbGljaWVzJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAuc3RhdGUoJ2RpcmVjdGlvbnMnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY29tbXV0ZXIvZGlyZWN0aW9uc1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9jb21tdXRlci9kaXJlY3Rpb25zL2RpcmVjdGlvbnMuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGlyZWN0aW9uc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBjc3M6ICdjc3MvbWFpbi5jc3MnLFxyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdEcml2aW5nIERpcmVjdGlvbnMgfCBSaWRlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdQYXJraW5nIGFuZCBQcml2YWN5IFBvbGljaWVzJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnbGFzdC1sb2NhdGlvbicsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jb21tdXRlci9sYXN0LWxvY2F0aW9uXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL2NvbW11dGVyL2xvY2F0aW9uL2xhc3QtbG9jYXRpb24uaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTGFzdExvY2F0aW9uQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIGNzczogJ2Nzcy9tYWluLmNzcycsXHJcbiAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ0xhc3QgTG9jYXRpb24nLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSkgICAgICAgXHJcbiAgICAgICAgICAuc3RhdGUoJ2Fkdi1zY2hlZHVsZS1zZXR1cCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jb21tdXRlci9hZHYtc2NoZWR1bGUtc2V0dXBcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvY29tbXV0ZXIvYWR2LXNjaGVkdWxlL2Fkdi1zY2hlZHVsZS1zZXR1cC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBZHZTY2hlZHVsZVNldHVwQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdBZHZhbmNlZCBTY2hlZHVsaW5nICgxIG9mIDMpIHwgUmlkZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnUGFya2luZyBhbmQgUHJpdmFjeSBQb2xpY2llcydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhcmFtczogeyBvYmo6IG51bGwgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYWR2LXNjaGVkdWxlJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbW11dGVyL2Fkdi1zY2hlZHVsZVwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9jb21tdXRlci9hZHYtc2NoZWR1bGUvYWR2LXNjaGVkdWxlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0FkdlNjaGVkdWxlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgb2JqOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnQWR2YW5jZWQgU2NoZWR1bGluZyAoMiBvZiAzKSB8IFJpZGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1NlbGVjdGVkIHRoYXQgZGF5cyBhbmQgdGltZXMgeW91IHdpc2ggdG8gdXNlIFJpZGUnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdhZHYtc2NoZWR1bGUtY29uZmlybWF0aW9uJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbW11dGVyL2Fkdi1zY2hlZHVsZS1jb25maXJtYXRpb25cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvY29tbXV0ZXIvYWR2LXNjaGVkdWxlL2Fkdi1zY2hlZHVsZS1jb25maXJtYXRpb24uaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQWR2U2NoZWR1bGVDb25maXJtYXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICBvYmo6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdBZHZhbmNlZCBTY2hlZHVsaW5nICgzIG9mIDMpIHwgUmlkZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnUGFya2luZyBhbmQgUHJpdmFjeSBQb2xpY2llcydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ215LXZlaGljbGVzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbW11dGVyL215LXZlaGljbGVzXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL2NvbW11dGVyL215LXZlaGljbGVzL215LXZlaGljbGVzLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ015VmVoaWNsZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgJ3RpdGxlJzogJ1ZlaGljbGVzJyxcclxuICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnUGFya2luZyBhbmQgUHJpdmFjeSBQb2xpY2llcydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgncG9saWN5Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbW11dGVyL3BvbGljeVwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9jb21tdXRlci9wb2xpY3kvcG9saWNpZXMuaHRtbFwiLFxyXG4gICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgJ3RpdGxlJzogJ1BvbGljeScsXHJcbiAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1BhcmtpbmcgYW5kIFByaXZhY3kgUG9saWNpZXMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ3BhcmtpbmctcG9saWN5Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbW11dGVyL3BhcmtpbmctcG9saWN5XCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL2NvbW11dGVyL3BhcmtpbmctcG9saWN5L3BhcmtpbmctcG9saWN5Lmh0bWxcIixcclxuICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICd0aXRsZSc6ICdQYXJraW5nIFBvbGljeScsXHJcbiAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1BhcmtpbmcgYW5kIFByaXZhY3kgUG9saWNpZXMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ3Bhc3NlbmdlclRyaXBzJyx7XHJcbiAgICAgICAgICAgIHVybDogXCIvcGFzc2VuZ2VyLXRyaXBzXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL3NoYXJlZC90cmlwcy9wYXNzZW5nZXItdHJpcHMuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcIlBhc3NlbmdlclRyaXBzQ3RybFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAndGl0bGUnOiAnTXkgVHJpcHMnLFxyXG4gICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdQYXNzZW5nZXIgVHJpcHMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pICAgICAgICAgXHJcbiAgICAgICAgICAuc3RhdGUoJ3Jlc2VydmF0aW9ucycsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9vbi1kZW1hbmQvcmVzZXJ2YXRpb25zXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL29uLWRlbWFuZC9yZXNlcnZhdGlvbnMvcmVzZXJ2YXRpb25zLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJSZXNlcnZhdGlvbnNDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIGNzczogJ2Nzcy9tYWluMi5jc3MnLFxyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdCb29rIFRyaXAgfCBPbiBEZW1hbmQnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb2sgYW4gT24gRGVtYW5kIFRyaXAnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdhY3RpdmVUcmlwcycsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9vbi1kZW1hbmQvYWN0aXZlLXRyaXBcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvb24tZGVtYW5kL2FjdGl2ZVRyaXAvYWN0aXZlLXRyaXAuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcIkFjdGl2ZVRyaXBDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIGNzczogJ2Nzcy9tYWluMi5jc3MnLFxyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdBY3RpdmUgVHJpcCB8IE9uIERlbWFuZCcsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnWW91ciBpbiBwcm9ncmVzcyB0cmlwJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnZGl2aXNpb24nLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZGl2aXNpb25cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvc2hhcmVkL2RpdmlzaW9uL2RpdmlzaW9ucy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEaXZpc2lvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgJ3RpdGxlJzogJ0NoYW5nZSBEaXZpc2lvbicsXHJcbiAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1BhcmtpbmcgYW5kIFByaXZhY3kgUG9saWNpZXMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9kYXNoYm9hcmQvOmRpdmlzaW9uXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL3NoYXJlZC9kYXNoYm9hcmQvZGFzaGJvYXJkLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnU2VydmljZXMgbGFuZGluZyBwYWdlJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkMScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9kYXNoYm9hcmQvOmRpdmlzaW9uL1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9zaGFyZWQvZGFzaGJvYXJkL2Rhc2hib2FyZC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoYm9hcmRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdsb2dpbk9uZU1WJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2xvZ2luT25lTVZcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvc2hhcmVkL2xvZ2luL29uZW12LWxvZ2luLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ09uZU1WTG9naW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ09uZU1WIExvZ2luJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdMb2dpbiB1c2luZyB5b3VyIE9uZU1WIGNyZWRlbnRpYWxzJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgncmVnaXN0ZXInLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcmVnaXN0ZXJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvc2hhcmVkL3JlZ2lzdHJhdGlvbi9vbmVtdi1yZWdpc3RyYXRpb24uaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnT25lTVZSZWdpc3RyYXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ1JlZ2lzdGVyJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdDcmVhdGUgYSBuZXcgT25lTVYgYWNjb3VudCdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyRXh0ZXJuYWwnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcmVnaXN0ZXJFeHRlcm5hbFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9zaGFyZWQvcmVnaXN0cmF0aW9uL2V4dGVybmFsLXJlZ2lzdHJhdGlvbi5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFeHRlcm5hbFJlZ2lzdHJhdGlvbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdmci1zdG9wcycsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9maXhlZC1yb3V0ZS9zdG9wc1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9maXhlZC1yb3V0ZS9zdG9wcy9mci1zdG9wcy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGclN0b3BzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdCdXMgU3RvcHMgfCBGaXhlZCBSb3V0ZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnU2VhcmNoIGZpeGVkIHJvdXRlIGJ1cyBzdG9wcydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2ZpeGVkLXJvdXRlLWxhbmRpbmcnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZml4ZWQtcm91dGUvbGFuZGluZ1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9maXhlZC1yb3V0ZS9MYW5kaW5nL2xhbmRpbmcuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTGFuZGluZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnSG9tZSB8IEZpeGVkIFJvdXRlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdTZWxlY3QgdGhlIHdheSB5b3Ugd2lzaCB0byBzZWFyY2ggZm9yIGEgZml4ZWQgcm91dGUnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdmaXhlZC1yb3V0ZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9maXhlZC1yb3V0ZS9hbGxSb3V0ZXNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvZml4ZWQtcm91dGUvcm91dGVzL2FsbC1yb3V0ZXMuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQWxsUm91dGVzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdSb3V0ZXMgKDEgb2YgMikgfCBGaXhlZCBSb3V0ZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnRXhwbG9yZSBhdmFpbGFibGUgcm91dGVzJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnc3RvcHMtZm9yLXJvdXRlJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2ZpeGVkLXJvdXRlL3JvdXRlcy86cm91dGVJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9maXhlZC1yb3V0ZS9zdG9wcy1mb3Itcm91dGUvc3RvcHMtZm9yLXJvdXRlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1N0b3BzRm9yUm91dGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ1JvdXRlcyAoMiBvZiAyKSB8IEZpeGVkIFJvdXRlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdZb3VyIHNlbGVjdGVkIHJvdXRlJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnZnItc2NoZWR1bGUnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZml4ZWQtcm91dGUvc2NoZWR1bGVcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvZml4ZWQtcm91dGUvc2NoZWR1bGUvZnItc2NoZWR1bGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRnJTY2hlZHVsZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnUHVibGlzaGVkIFNjaGVkdWxlIHwgRml4ZWQgUm91dGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1Bvc3RlZCBGaXhlZCBSb3V0ZSBzY2hlZHVsZSdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ25vdGlmaWNhdGlvbnMnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbm90aWZpY2F0aW9uc1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9zaGFyZWQvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdOb3RpZmljYXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ05vdGlmaWNhdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1NlcnZpY2UgYW5kIHJvdXRlcyBub3RpZmljYXRpb24gdXBkYXRlJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbG9naW5cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvc2hhcmVkL2xvZ2luL2xvZ2luLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICd0aXRsZSc6ICdMb2dpbicsXHJcbiAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0xvZ2luIHRvIGZ1bGx5IHV0aWxpemUgb3VyIHNlcnZpY2VzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdsb2dvdXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbG9nb3V0XCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL3NoYXJlZC9sb2dvdXQvbG9nb3V0Lmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ291dENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJzQwNCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9ub3QtZm91bmRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiNDA0Lmh0bWxcIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnbWluLWFwcC1zdXBwb3J0Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL21pbi1hcHAtc3VwcG9ydFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbW9kdWxlcy9zaGFyZWQvbWluLWFwcC1zdXBwb3J0L21pbi1hcHAtc3VwcG9ydC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdNaW5BcHBTdXBwb3J0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdBcHBsaWNhdGlvbiBvdXQgb2YgZGF0ZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnQW4gdXBkYXRlIGlzIHJlcXVpcmVkJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXV0aCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9hdXRoQ29tcGxldGVcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXV0aENvbXBsZXRlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2F1dGhDb21wbGV0ZTEnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY2hhbmdlLXBhc3N3b3JkJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9jaGFuZ2UtcGFzc3dvcmRcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tb2R1bGVzL3NoYXJlZC9wcm9maWxlL2NoYW5nZS1wYXNzd29yZC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhbmdlUGFzc3dvcmRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdDaGFuZ2UgUGFzc3dvcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnQ2hhbmdlIFBhc3N3b3JkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnZm9yZ290LXBhc3N3b3JkJywge1xyXG4gICAgICAgICAgICAgIHVybDogXCIvZm9yZ290LXBhc3N3b3JkXCIsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvc2hhcmVkL2xvZ2luL2ZvcmdvdC1wYXNzd29yZC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZvcmdvdFBhc3N3b3JkQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ0ZvcmdvdCBQYXNzd29yZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnRm9yZ290IFBhc3N3b3JkJ1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSkgICAgICAgICAgXHJcbiAgICAgICAgICAuc3RhdGUoJ3ZlcmlmeS11cGRhdGUtcGFzc3dvcmQnLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiBcIi92ZXJpZnktdXBkYXRlLXBhc3N3b3JkXCIsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL21vZHVsZXMvc2hhcmVkL2xvZ2luL3ZlcmlmeS11cGRhdGUtcGFzc3dvcmQuaHRtbFwiLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdWZXJpZnlVcGRhdGVQYXNzd29yZENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgb2JqOiBudWxsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdWZXJpZnkgYW5kIHVwZGF0ZSBwYXNzd29yZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVmVyaWZ5IFRlbXBvcmFyeSBDb2RlIGFuZCB1cGRhdGUgcGFzc3dvcmQnXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG4gICAgICB9KVxyXG4gICAgLmNvbnN0YW50KCdlbnYnLCBfZW52KVxyXG4gICAgLmNvbnN0YW50KCdnb29nbGVNYXBzQ29uZmlnJywgX2dvb2dsZU1hcHNDb25maWcpXHJcbiAgICAuc2VydmljZSgncGFzc2VuZ2VySW5pdEdlc3RhbHQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gaW5pdE1vZGVsO1xyXG4gICAgICB9O1xyXG4gICAgfSlcclxuICAgIC5ydW4oWydhdXRoU2VydmljZScsICduZ01ldGEnLCBmdW5jdGlvbiAoYXV0aFNlcnZpY2UsIG5nTWV0YSkge1xyXG4gICAgICBhdXRoU2VydmljZS5maWxsQXV0aERhdGEoKTtcclxuICAgICAgbmdNZXRhLmluaXQoKTtcclxuICAgIH1dKVxyXG4gICAgLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlKXtcclxuICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICQoZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jYWNoZXMgYSBqUXVlcnkgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGhlYWRlciBlbGVtZW50XHJcbiAgICB2YXIgd3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCk7XHJcbiAgICB2YXIgYm9keSA9IGFuZ3VsYXIuZWxlbWVudChcIiNwYWdlLXdyYXBwZXJcIik7XHJcbiAgICB3cmFwcGVyLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzY3JvbGwgPSB3cmFwcGVyLnNjcm9sbFRvcCgpO1xyXG4gICAgICBpZiAoc2Nyb2xsID49IDY4KSB7XHJcbiAgICAgICAgYm9keS5yZW1vdmVDbGFzcygnbm90LXNjcm9sbGVkJykuYWRkQ2xhc3MoXCJzY3JvbGxlZFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBib2R5LnJlbW92ZUNsYXNzKFwic2Nyb2xsZWRcIikuYWRkQ2xhc3MoJ25vdC1zY3JvbGxlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufSgpKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnb25lTVZBcHAnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdhdXRoQ29tcGxldGUxJywgYXV0aENvbXBsZXRlMSk7XHJcblxyXG4gICAgYXV0aENvbXBsZXRlMS4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnJHJvb3RTY29wZScsICdhdXRoU2VydmljZScsICdEaXZpc2lvblNlcnZpY2UnLCAnVXRpbGl0eUZhY3RvcnknLCAnUmVkaXJlY3Rpb25TZXJ2aWNlJywgJ0x1dW1MaW5rZWRTZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gYXV0aENvbXBsZXRlMSgkbG9jYXRpb24sICRyb290U2NvcGUsIGF1dGhTZXJ2aWNlLCBEaXZpc2lvblNlcnZpY2UsIFV0aWxpdHlGYWN0b3J5LCBSZWRpcmVjdGlvblNlcnZpY2UsIEx1dW1MaW5rZWRTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGRpdmlzaW9uSWQgPSAtMTtcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uSWQgPSBEaXZpc2lvblNlcnZpY2UuZ2V0RGl2aXNpb25JZCgpO1xyXG4gICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBnZXRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICAkbG9jYXRpb24uc2VhcmNoKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmcmFnbWVudC5lcnJvciAmJiBmcmFnbWVudC5lcnJvciAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgVXRpbGl0eUZhY3RvcnkudG9hc3RFcnJvcignRXJyb3InLCBmcmFnbWVudC5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICBSZWRpcmVjdGlvblNlcnZpY2UucmVkaXJlY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuaGFzbG9jYWxhY2NvdW50ID09ICdGYWxzZScgPyB2ZXJpZnkoZnJhZ21lbnQpOiBvYnRhaW5Mb2NhbFRva2VuKGZyYWdtZW50KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvYnRhaW5Mb2NhbFRva2VuKGZyYWdtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBleHRlcm5hbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogZnJhZ21lbnQucHJvdmlkZXIsXHJcbiAgICAgICAgICAgICAgICBleHRlcm5hbEFjY2Vzc1Rva2VuOiBmcmFnbWVudC5leHRlcm5hbF9hY2Nlc3NfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogZnJhZ21lbnQuZXh0ZXJuYWxfdXNlcl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgZGl2aXNpb25JZDogZGl2aXNpb25JZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhdXRoU2VydmljZS5vYnRhaW5BY2Nlc3NUb2tlbihleHRlcm5hbERhdGEpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2xvZ2dlZEluJywgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVkaXJlY3Rpb25TZXJ2aWNlLnJlZGlyZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLm1lc3NhZ2UgPSBlcnIuZXJyb3JfZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHZlcmlmeShmcmFnbWVudCkge1xyXG4gICAgICAgICAgICBmcmFnbWVudC5wcm92aWRlci50b1VwcGVyQ2FzZSgpID09ICdhbWF6b24nLnRvVXBwZXJDYXNlKClcclxuICAgICAgICAgICAgPyB2ZXJpZnlMdXVtUmVnaXN0cmF0aW9uVGltZWxpbmUoZnJhZ21lbnQpXHJcbiAgICAgICAgICAgIDogcmVnaXN0ZXIoZnJhZ21lbnQpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdmVyaWZ5THV1bVJlZ2lzdHJhdGlvblRpbWVsaW5lKGZyYWdtZW50KSB7XHJcbiAgICAgICAgICAgIEx1dW1MaW5rZWRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgICAuZ2V0TmV3UGFzc2VuZ2VyTHV1bUxpbmthZ2VJbmZvKGRpdmlzaW9uSWQpXHJcbiAgICAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IDEgJiYgcmVzcG9uc2UuZGF0YS5yZXN1bHQgJiYgcmVzcG9uc2UuZGF0YS5yZXN1bHQuc2hvd01lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEx1dW1MaW5rZWRTZXJ2aWNlLmRpc3BsYXlOZXdQYXNzZW5nZXJNZXNzYWdlKHJlc3BvbnNlLmRhdGEucmVzdWx0Lm1lc3NhZ2UpICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHJlZ2lzdGVyKGZyYWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKGZyYWdtZW50KSB7XHJcbiAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmV4dGVybmFsQXV0aERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogZnJhZ21lbnQucHJvdmlkZXIsXHJcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogZnJhZ21lbnQuZXh0ZXJuYWxfdXNlcl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWxBY2Nlc3NUb2tlbjogZnJhZ21lbnQuZXh0ZXJuYWxfYWNjZXNzX3Rva2VuLFxyXG4gICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmcmFnbWVudC5maXJzdG5hbWUsXHJcbiAgICAgICAgICAgICAgICBsYXN0TmFtZTogZnJhZ21lbnQubGFzdG5hbWVcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICBEaXZpc2lvblNlcnZpY2UuZ2V0RGl2aXNpb25JbmZvKClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmVlZFR5cGUgPSByZXNwb25zZS5kYXRhLnJlc3VsdC5EaXZpc2lvbkZlZWRUeXBlLkZlZWRUeXBlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZGlyZWN0UGF0aCA9IGZlZWRUeXBlID09IFwiTm9GZWVkXCIgPyAnL3ZlcmlmaWNhdGlvbicgOiAnL3JlZ2lzdGVyRXh0ZXJuYWwnXHJcblxyXG4gICAgICAgICAgICAgICAgUmVkaXJlY3Rpb25TZXJ2aWNlLnJlZGlyZWN0VG8ocmVkaXJlY3RQYXRoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRGcmFnbWVudCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUXVlcnlTdHJpbmcod2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDE1KSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZyhxdWVyeVN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHt9LFxyXG4gICAgICAgICAgICAgICAgcGFpcnMsIHBhaXIsIHNlcGFyYXRvckluZGV4LCBlc2NhcGVkS2V5LCBlc2NhcGVkVmFsdWUsIGtleSwgdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAocXVlcnlTdHJpbmcgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwYWlycyA9IHF1ZXJ5U3RyaW5nLnNwbGl0KFwiJlwiKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXTtcclxuICAgICAgICAgICAgICAgIHNlcGFyYXRvckluZGV4ID0gcGFpci5pbmRleE9mKFwiPVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZEtleSA9IHBhaXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZFZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZEtleSA9IHBhaXIuc3Vic3RyKDAsIHNlcGFyYXRvckluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBlc2NhcGVkVmFsdWUgPSBwYWlyLnN1YnN0cihzZXBhcmF0b3JJbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGVkS2V5KTtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZWRWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICh3aW5kb3cpIHtcclxuICAgIHdpbmRvdy5fZ29vZ2xlTWFwc0NvbmZpZyA9IHdpbmRvdy5fZ29vZ2xlTWFwc0NvbmZpZyB8fCB7fTtcclxuICAgIHdpbmRvdy5fZ29vZ2xlTWFwc0NvbmZpZy5tYXBTdHlsZXMgPSBbXHJcbntcclxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiNlYmUzY2RcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcImNvbG9yXCI6IFwiIzUyMzczNVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LnN0cm9rZVwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiNmNWYxZTZcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiNjOWIyYTZcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5sYW5kX3BhcmNlbFwiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiNkY2QyYmVcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5sYW5kX3BhcmNlbFwiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG59LFxyXG57XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWxcIixcclxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcImNvbG9yXCI6IFwiI2FlOWU5MFwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsXCIsXHJcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwiY29sb3JcIjogXCIjZGZkMmFlXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG59LFxyXG57XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwiY29sb3JcIjogXCIjZGZkMmFlXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG59LFxyXG57XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiM5MzgxN2NcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuYnVzaW5lc3NcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXHJcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiNhNWIwNzZcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0XCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ3NTMwXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG59LFxyXG57XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcImNvbG9yXCI6IFwiI2Y1ZjFlNlwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcclxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiNmZGZjZjhcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiNmOGM5NjdcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwiY29sb3JcIjogXCIjZTliYzYyXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG59LFxyXG57XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXHJcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwiY29sb3JcIjogXCIjZTk4ZDU4XCJcclxuICAgICAgfVxyXG4gICAgXVxyXG59LFxyXG57XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXHJcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcImNvbG9yXCI6IFwiI2RiODU1NVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcImNvbG9yXCI6IFwiIzgwNmI2M1wiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQubGluZVwiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcImNvbG9yXCI6IFwiI2RmZDJhZVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQubGluZVwiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwiY29sb3JcIjogXCIjOGY3ZDc3XCJcclxuICAgICAgfVxyXG4gICAgXVxyXG59LFxyXG57XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5saW5lXCIsXHJcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcImNvbG9yXCI6IFwiI2ViZTNjZFwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQuc3RhdGlvblwiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgICBcImNvbG9yXCI6IFwiI2RmZDJhZVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxufSxcclxue1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgICAgXCJjb2xvclwiOiBcIiNiOWQzYzJcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAgIFwiY29sb3JcIjogXCIjOTI5OThkXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG59XHJcbl07XHJcbiAgICBPYmplY3QuZnJlZXplKHdpbmRvdy5fZ29vZ2xlTWFwc0NvbmZpZyk7XHJcbn0pKHRoaXMpOyJdfQ==
