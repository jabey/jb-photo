angular.module('photoSiteApp', ['ngRoute'])

  .config(['$provide', '$routeProvider', '$locationProvider', '$logProvider', function($provide, $routeProvider, $locationProvider, $logProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
//    $scope.$parent.lookGalleryId = '';
    $routeProvider
      .when('/galleries', {templateUrl: 'partials/gallery_overview.html', controller: 'GalleryOverviewCtrl', title: 'Galleries'})
      .when('/gallery/:galleryIdx/photo/:photoId', {templateUrl: 'partials/photo_detail.html', controller: 'PhotoDetailCtrl'})
      .when('/beta/gallery/:galleryIdx/photo/:photoId', {templateUrl: 'partials/photo_detail_beta.html', controller: 'PhotoDetailCtrl'})
      .when('/gallery/:galleryIdx', { templateUrl: 'partials/gallery.html', controller: 'GalleryCtrl'})
      .when('/gallery/:galleryIdx/beta', { templateUrl: 'partials/gallery_beta.html', controller: 'GalleryCtrl'})
      .when('/show/:galleryDesc', { templateUrl: 'partials/gallery_beta.html', controller: 'ShowCtrl'})
      .when('/contact', { templateUrl: 'partials/contact.html', controller: 'ContactCtrl', title: 'Contact' })
      .when('/about', {templateUrl: 'partials/about.html', controller: 'AboutCtrl', title: 'About' })
      .when('/privacy', {templateUrl: 'partials/privacy.html', controller: 'PrivacyCtrl', title: 'Privacy' })
      .when('/portfolio', {templateUrl: 'partials/portfolio.html', controller: 'PortfolioCtrl', title: 'Portfolio' })
      .when('/portfolio2', {templateUrl: 'partials/portfolio2.html', controller: 'PortfolioCtrl', title: 'Portfolio' })
      .when('/portfolio3', {templateUrl: 'partials/portfolio3.html', controller: 'PortfolioCtrl', title: 'Portfolio' })
      .when('/error', {templateUrl: 'partials/error.html', controller: 'ErrorCtrl', title: 'Error' })
      .when('/look/:lookDesc', {templateUrl: 'partials/portfolio.html', controller: 'LookCtrl' })
      .when('/look/:common/:gallery/:photo', {templateUrl: 'partials/photo_detail.html', controller: 'LookCtrl' })
      .when('/id/:permaId', {templateUrl: 'partials/photo_detail.html', controller: 'IdCtrl' })
      .when('/', { templateUrl: 'partials/home.html', controller: 'HomeCtrl' })
      .otherwise({ redirectTo: '/' });
  }])
  /*
  .config(['$httpProvider', function(provider) {
    provider.defaults.headers['get'] = new Object();
    provider.defaults.headers.get['GData-Version']='2';
  }])
  */

  .run(['$location', '$rootScope', function($location, $rootScope) {
    if ($.cookie('ac') !== undefined && $.cookie('ac') === "true") {
      $rootScope.acceptCookies = true;
    }
    else {
      $rootScope.acceptCookies = false;
    }

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      if (typeof current.title != "undefined") {
        $rootScope.subTitle = current.title + ' - ';
      }
      else {
        $rootScope.subTitle = '';
      }
      null;
    })
    $rootScope.$on('$viewContentLoaded', function() {
      window.ga('send','pageview',$location.path());
    })
  }])

  .factory('galleryDetail', ['$http', function($http) {
    return function(galleryId) {
      return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee/albumid/' + galleryId + '?alt=json-in-script&callback=JSON_CALLBACK&thumbsize=320c&imgmax=1152&v=2', {cache: true});
    }
  }])

  .factory('photoDetail', ['$http', function($http) {
    return function(picasaGalleryId, picasaPhotoId) {
      return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee/albumid/' + picasaGalleryId + '/photoid/' + picasaPhotoId + '?alt=json-in-script&callback=JSON_CALLBACK&imgmax=1152&v=2', {cache: true})
    }
  }])

  .factory('galleryList', ['$http', function($http) {
    return function() {
      return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee?alt=json-in-script&callback=JSON_CALLBACK&thumbsize=320c&v=2', {cache: true});
    }
  }])

  .factory('tagSearch', ['$http', function($http) {
    return function(searchTag) {
      return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee/?q=' + searchTag + '&kind=photo&alt=json-in-script&callback=JSON_CALLBACK&imgmax=1152&v=2', {cache: true})
    }
  }])

  .factory('picasaApi', ['$http', function($http) {
    return {
      carouselContent: function() {
        return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee/albumid/5922739724543831905?alt=json-in-script&callback=JSON_CALLBACK&imgmax=1600&v=2', {headers: {'GData-Version':'2'}})
      },
      galleryList: function() {
        return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee?alt=json-in-script&callback=JSON_CALLBACK&thumbsize=320c&v=2');
      },
      tagSearch: function(searchTag) {
        return $http.get('http://picasaweb.google.com/data/feed/api/user/jayembee?kind=photo&q='+ searchTag);

        //return $http.get('tag_search.php?tag='+ searchTag);
      },
      galleryDetail: function(picasaGalleryId) {
        return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee/albumid/' + picasaGalleryId + '?alt=json-in-script&callback=JSON_CALLBACK&thumbsize=320c&imgmax=1152&v=2')
      },
      photoDetail: function(picasaGalleryId, picasaPhotoId) {
        return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee/albumid/' + picasaGalleryId + '/photoid/' + picasaPhotoId + '?alt=json-in-script&callback=JSON_CALLBACK&imgmax=1152&v=2')
      },
      portfolioDetail: function(picasaGalleryId) {
        return $http.jsonp('http://picasaweb.google.com/data/feed/api/user/jayembee/albumid/' + picasaGalleryId + '?alt=json-in-script&callback=JSON_CALLBACK&thumbsize=576u&imgmax=1152&v=2')
      }
    };
  }])
/*
  .directive('jbpPinitButton', function() {
    return { templateUrl: 'partials/pinit_button.html' };
  })
*/
  .directive('jbpToggle', function() {

    return {
      restrict: 'C',
      link: function(scope, element, attrs) {
        element.on("hide.bs.collapse", function() {element.find(".fa-caret-down").removeClass("fa-rotate-180");}) //TODO: Improve specicifity
        element.on("show.bs.collapse", function() {element.find(".fa-caret-down").addClass("fa-rotate-180");})
      }
    }
  })

  .directive('jbpShareButton', function() {

    return {

      priority: 1,
      compile: function (element, attrs) {
        switch (attrs.jbpButtonType) {
          case "tumblrButton":
            var buttonMarkup = document.createElement("span");
            buttonMarkup.id = "tumblr_button";
            var tButton = document.createElement("a");
//            tButton.setAttribute("href", "//www.tumblr.com/share/photo?{{tumblrParams}}");
            tButton.setAttribute("title", "Share on Tumblr");
            tButton.setAttribute("style", "display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
            tButton.innerHTML = "Share on Tumblr";
            buttonMarkup.appendChild(tButton);
            var shareNetwork = "Tumblr";
            break;

          case "twitterButton":
            var buttonMarkup = document.createElement("span");
            buttonMarkup.id = "twitter_button";
            var tButton = document.createElement("a");
            tButton.setAttribute("href", "//twitter.com/share");
            tButton.className ="twitter-share-button";
            tButton.setAttribute("data-text", "Take a look at this photo");
//            tButton.setAttribute("data-url","http://jonathanball.photography/id/{{jbId}}");
            tButton.setAttribute("data-related", "jabey");
            tButton.setAttribute("data-count","none");
            tButton.setAttribute("data-hashtags", "photography");
            tButton.setAttribute("data-dnt", "true");
            tButton.innerHTML = "Tweet";
            buttonMarkup.appendChild(tButton);
            var shareNetwork = "Twitter";
            break;

          case "gPlusButton":
            var buttonMarkup = document.createElement("div");
            buttonMarkup.id = "gplus_button";
            buttonMarkup.className = "g-plusone";
            buttonMarkup.setAttribute("data-annotation", "none");
//            buttonMarkup.setAttribute("data-href", "http://jonathanball.photography/id/{{jbId}}");
            var shareNetwork = "Google+";
            break;

          case "facebookButton":
            var buttonMarkup = document.createElement("div");
            buttonMarkup.id = "fb_button";
            buttonMarkup.className = "fb-like";
//            buttonMarkup.setAttribute("data-href", "http://jonathanball.photography/id/{{jbId}}");
            buttonMarkup.setAttribute("data-layout", "button");
            buttonMarkup.setAttribute("data-action", "like");
            buttonMarkup.setAttribute("data-show-faces", "false");
            buttonMarkup.setAttribute("data-share", "true");
            var shareNetwork = "Facebook";
            break;

          case "pinitButton":
            if (typeof eval("window.PIN_" + Math.floor(new Date().getTime() / 86400000))!=="undefined") {           // Pinterest scripts aleady loaded
            // If an image has been previously displayed need to clear out Pin button and regenerate
//              $(pinitButton).empty();
            }
            var tButton = document.createElement("img");
            tButton.src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_28.png";

            var buttonMarkup = document.createElement("div");
            buttonMarkup.id = "pinitButton";
            var pinitLink = document.createElement("a");
//            pinitLink.setAttribute("ng-href", "{{pinterestButton.url}}");
            pinitLink.setAttribute("data-pin-do", "buttonPin");
            pinitLink.setAttribute("data-pin-config", "none");
            pinitLink.setAttribute("data-pin-color", "red");
            pinitLink.setAttribute("data-pin-height", "28");
            pinitLink.appendChild(tButton);
            buttonMarkup.appendChild(pinitLink);
            var shareNetwork = "Pinterest";
            break;

          default:
            var buttonMarkup = null;
            var shareNetwork = null;
        }

        var shareOuter = document.createElement("div");

        var shareContainer = document.createElement("div");
        shareContainer.className = "media";

        var shareInner = document.createElement("div");
        shareInner.className = "pull-left";

        shareInner.appendChild(buttonMarkup);
        shareContainer.appendChild(shareInner);

        var shareDesc = document.createElement("div");
        shareDesc.className = "media-body pull-right h5";
        shareDesc.innerHTML = "Share on " + shareNetwork;
        shareContainer.appendChild(shareDesc);

        shareOuter.appendChild(shareContainer);

        element.replaceWith( shareOuter.innerHTML);

        return {
          post: function postLink(scope, element, attrs) {
            updateShareButton = function(buttonType, shareUrl) {
              var d=document, s="script";

              switch (buttonType) {
                case "twitterButton":
                  $(twitter_button).children()[0].setAttribute("href", shareUrl); //TODO: Tidy this up
                  var id="twitter-wjs";
                  var js,fjs=d.getElementsByTagName(s)[0];
                  if(!d.getElementById(id)){
                    js=d.createElement(s);
                    js.id=id;
                    js.src="https://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js,fjs);
                  }
                  else {
                    twttr.widgets.load();
                  }
                  break;

                case "tumblrButton":
                  $(tumblr_button).children()[0].setAttribute("href", shareUrl); //TODO: Tidy this up
                  var id="tumblr-js";
                  var js,fjs=d.getElementsByTagName(s)[0];
                  if(!d.getElementById(id)){
                    js=d.createElement(s);
                    js.id=id;
                    js.src="http://platform.tumblr.com/v1/share.js";
                    fjs.parentNode.insertBefore(js,fjs);
                  }
                  else {
                    Tumblr.activate_share_on_tumblr_buttons();
                  }
                  break;
                case "pinitButton":
  /*
                  if (typeof eval("window.PIN_" + Math.floor(new Date().getTime() / 86400000))!=="undefined") {           // Pinterest scripts aleady loaded
                    // If an image has been previously displayed need to clear out Pin button and regenerate
                    $(pinitButton).empty();
                    var newPinButtImg = $('<img>');
                    newPinButtImg.attr('src','//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_28.png');
                    var newPinButt = $('<a>');
                    newPinButt.attr('href', pinitUrl);
                    newPinButt.attr('data-pin-do','buttonPin');
                    newPinButt.attr('data-pin-config','none');
                    newPinButt.attr('data-pin-color','red');
                    newPinButt.attr('data-pin-height','28');
                    newPinButt.append(newPinButtImg);
                    $(pinitButton).append(newPinButt);
  */
                  $(pinitButton).children()[0].setAttribute("href", shareUrl); //TODO: Tidy this up
                  buildPinButton();
                  break;
/*
                  }
                  else {
                    pinWidget(document);
                  }
*/
                case "facebookButton":
                  $(fb_button).attr("data-href", "http://jonathanball.photography/id/" + shareUrl); //TODO: Tidy this up
                  if (typeof FB == "undefined") {
                    window.fbAsyncInit = function() {
                      FB.init({
                        appId      : '1428296944098387',
                        xfbml      : true,
                        version    : 'v2.0'
                      });
                    }
                  }
                  else {
                    FB.XFBML.parse();
                  }
                  break;

                case "gPlusButton":
                  $(gplus_button).attr("data-href", "http://jonathanball.photography/id/" + shareUrl); //TODO: Tidy this up
                  if (typeof gapi == "undefined") {
                    window.___gcfg = {
                      lang: 'en-GB',
                      parsetags: 'explicit'
                    };
                    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                    po.src = 'https://apis.google.com/js/plusone.js?onload=gPlusCallback';
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
                  }
                  else {
                    gapi.plusone.go();
                  }
                  break;

                default:
                  null;
                }

              return;
            }

            if (typeof attrs.jbpShareUrl !== "undefined") {
              attrs.$observe('jbpShareUrl', function() {                  //TODO: Argument contains interpolated value - use this?
                if (attrs.jbpShareUrl !== "") {
                  updateShareButton(attrs.jbpButtonType, attrs.jbpShareUrl);
                }
              });
            }
          }
        }
      },

      scope: {
//        jbpButtonType: '=',
//        tumblrButton: '@'
//        ,buttonUrl: '@'
      },
      restrict: 'E'
    };
  })

  .directive('jbpCanvasTitle', function() {

    return {
      restrict: 'C',
      link: function(scope, element, attrs) {
        element.on("hide.bs.collapse", function() {element.find(".fa-caret-down").removeClass("fa-rotate-180");}) //TODO: Improve specicifity
        element.on("show.bs.collapse", function() {element.find(".fa-caret-down").addClass("fa-rotate-180");})
      }
    }
  })

  .controller( 'MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', 'picasaApi', 'galleryList', function MainCtrl($scope, $route, $routeParams, $location, $http, picasaApi, galleryList ) {
    $scope.galleryListLoaded = false;
    $scope.activeMenuItem="home";

    var currentDate = new Date();
    $scope.currentYear = currentDate.getFullYear();

    $scope.enableCookies = function() {
      $.cookie('ac','true',{expires: 365});
      $scope.acceptCookies = true;
    };

    galleryList()
    .then(function(result) {
      $scope.galleryLinkData = galleryListSuccess(result.data);
      $scope.galleryListLoaded = true;
    });
  }])

  .controller( 'HomeCtrl', function HomeCtrl($scope, $rootScope, $routeParams, $http, $location, picasaApi) {
    $scope.$parent.activeMenuItem = "home";
    $rootScope.canonicalUrl = "http://www.jonathanball.photography";
    $scope.carouselProgress="33%";
    $scope.carouselLoaded = false;
    picasaApi.carouselContent()
    .success(function(data, status, headers, config) {
      $scope.carouselPhotos = carouselContentSuccess(data, $scope);
      $scope.carouselProgress = "100%";
      $scope.carouselLoaded = true;
    })
    .error(function(data, status, headers, config) {
      null;
      $location.path('/error');
    })
    $scope.carouselProgress = "67%";
  })

  .controller( 'GalleryOverviewCtrl', ['$scope', '$rootScope', '$http', 'picasaApi', 'galleryList', function GalleryOverviewCtrl($scope, $rootScope, $http, picasaApi, galleryList) {
    $rootScope.canonicalUrl = "http://www.jonathanball.photography/galleries";
    galleryList()
    .then(function(result) {
      $scope.$parent.galleryLinkData = galleryListSuccess(result.data);
      $scope.galleryListLoaded = true;
    });
    $scope.$parent.activeMenuItem = "galleries";
    $scope.galleryOverviewLoaded = true;
    }])

  .controller( 'GalleryCtrl', ['$scope', '$routeParams', '$http', '$q', 'picasaApi', 'galleryList', 'galleryDetail', '$rootScope', function GalleryCtrl($scope, $routeParams, $http, $q, picasaApi, galleryList, galleryDetail, $rootScope) {
    $scope.$parent.activeMenuItem = "gallery";
    $scope.galleryLoaded = false;
    $scope.galleryProgress = "33%";
    $scope.params = $routeParams;
    $scope.$parent.galleryIdx = parseInt($routeParams.galleryIdx);

    galleryList()
    .then(function(result) {
      $scope.$parent.galleryLinkData = galleryListSuccess(result.data);
      $scope.$parent.galleryListLoaded = true;
      $scope.galleryId = $scope.$parent.galleryLinkData[$scope.$parent.galleryIdx-1].id;
      $scope.$parent.galleryDesc = $scope.$parent.galleryLinkData[$scope.$parent.galleryIdx-1].desc;
      $scope.galleryProgress = "67%";
      $rootScope.subTitle = $scope.galleryDesc + ' - ';

      galleryDetail($scope.galleryId)
      .then(function(result) {
        $scope.$parent.gallery = galleryDetailSuccess(result.data);
        $scope.galleryProgress = "100%";
        $scope.galleryLoaded = true;
      })
    }, function(error) {
      null; //TODO:
    });
  }])

  .controller( 'ShowCtrl', ['$scope', '$routeParams', '$http', 'picasaApi', 'galleryList', 'galleryDetail', '$rootScope', '$location', function ShowCtrl($scope, $routeParams, $http, picasaApi, galleryList, galleryDetail, $rootScope, $location) {
    $scope.$parent.activeMenuItem = "gallery";
    $scope.galleryLoaded = false;
    $scope.galleryProgress = "33%";
    $rootScope.canonicalUrl = "http://www.jonathanball.photography/show/" + $routeParams.galleryDesc;
    var gallerySearchValue = $routeParams.galleryDesc.toLowerCase().split('_').join(' ');

    galleryList()
    .then(function(result) {
      $scope.$parent.galleryLinkData = galleryListSuccess(result.data);
      $scope.$parent.galleryListLoaded = true;
      var matchedGallery = $($scope.$parent.galleryLinkData).filter(function(i, d){ return d.desc.toLowerCase() == gallerySearchValue});
      if (matchedGallery.length == 0)
      {
        $location.path('/error');
      }

      $scope.galleryId = matchedGallery[0].id;
      $scope.$parent.galleryIdx = matchedGallery[0].idx;
      $scope.$parent.galleryDesc = matchedGallery[0].desc;
      $scope.$parent.galleryQuote = matchedGallery[0].quote;
      if (typeof $scope.$parent.galleryQuote == "undefined")
      {
        $scope.showGalleryQuote=false;
      }
      else
      {
        $scope.showGalleryQuote=true;
      }
      var jbId = "show/" + $routeParams.galleryDesc;
      var mediaUrl = matchedGallery[0].thumbUrl;

      $scope.galleryProgress = "67%";
      $rootScope.subTitle = $scope.galleryDesc + ' - ';

      galleryDetail($scope.galleryId)
      .then(function(result) {
        $scope.$parent.gallery = galleryDetailSuccess(result.data);
        $scope.galleryProgress = "100%";
        $scope.galleryLoaded = true;
        var shareData = setupShareData(jbId, $rootScope.canonicalUrl, mediaUrl, $scope.$parent.galleryDesc);
        $scope.pinterestButton = { url: shareData.pinitUrl };
        $scope.tumblrButton = {url: shareData.tumblrUrl};
        $scope.twitterButton = {url: shareData.twitterUrl};
        $scope.gPlusButton = {url: shareData.gPlusUrl};
        $scope.facebookButton = {url: shareData.facebookUrl};

      })
    }, function(error) {
      null; //TODO:
    });
  }])

  .controller( 'LookCtrl', function GalleryCtrl($scope, $routeParams, $http, $location, picasaApi) {

    $scope.portfolioLoaded = false;
    $scope.portfolioProgress = "33%";
    $scope.$parent.activeMenuItem = "look";

    $scope.lookName = $routeParams.lookDesc.toLowerCase();
    if ($scope.lookName == 'testlook')
    {
      $scope.$parent.lookGalleryId = '5417715928588996737';
      $scope.galleryId = '5417715928588996737';
      $location.path('/portfolio');
    }
    else
    {
      if (typeof $scope.$parent.galleryLinkData == "undefined") {
        picasaApi.galleryList()
        .success(function(data, status, headers, config) {
          $scope.$parent.galleryLinkData = galleryListSuccess(data);
          $scope.$parent.galleryListLoaded = true;

          $scope.$parent.lookGalleryId = undefined;
          picasaApi.tagSearch($scope.lookName)
          .success(function(data, status, headers, config) {
            if (data.feed.openSearch$totalResults.$t == 0)
            {
              /*
              xmlDoc = $.parseXML( jb1)
              $xml = $(xmlDoc);
              $xml.find('feed entry:eq(0) albumid').text()
              */
              $location.path('/error');
            }
            else
            {
              var matchedGalleryGId = data.feed.entry[0].gphoto$albumid.$t;
              var matchedPhotoGId = data.feed.entry[0].gphoto$id.$t

              var matchedGalleryIdx = $.map($scope.$parent.galleryLinkData, function(n,i) {
                if (n.id==matchedGalleryGId)
                {
                  return i
                }
              });


              picasaApi.galleryDetail(matchedGalleryGId)
                .success(function(data, status, headers, config) {
                  var matchedPhotoIdx = $.map(data.feed.entry, function(n, i) {
                    if (n.gphoto$id.$t == matchedPhotoGId)
                    {
                      return i;
                    }
                  });
                  $location.path('/gallery/'+(parseInt(matchedGalleryIdx)+1) +'/photo/'+(parseInt(matchedPhotoIdx)+1));
              });
            }
          });
        });
      }
    }
  })


  .controller( 'ContactCtrl', function ContactCtrl($scope) {
    $scope.$parent.activeMenuItem = "contact";
    })

  .controller( 'AboutCtrl', function AboutCtrl($scope) {
    $scope.$parent.activeMenuItem = "about";
    })

  .controller( 'PrivacyCtrl', function PrivacyCtrl($scope) {
    $scope.$parent.activeMenuItem = "privacy";
    })

  .controller( 'ErrorCtrl', [function ErrorCtrl() {
    null;
  }])

  .controller( 'IdCtrl', ['$rootScope', '$scope', '$routeParams', 'photoDetail', 'galleryList', 'tagSearch', function IdCtrl($rootScope, $scope, $routeParams, photoDetail, galleryList, tagSearch) {

    $rootScope.canonicalUrl = "http://www.jonathanball.photography/id/" + $routeParams.permaId;
    $scope.$parent.activeMenuItem = "link";
/*
    $('#accordion .panel-collapse').on("hide.bs.collapse", {type: "hide"}, rotateToggle);
    $('#accordion .panel-collapse').on("show.bs.collapse", {type: "show"}, rotateToggle);
*/
    $scope.photoLoaded = false;
    $scope.metadataLoaded = false;

    $scope.$parent.galleryLinkData = $rootScope.gallList;

    $scope.photoProgress = "20%";

    if (typeof $rootScope.baseData == "undefined" || $rootScope.baseDataLoaded == false)
    {
      $rootScope.baseData = galleryList();
    }

    $rootScope.baseData
    .then(function(result){
      $rootScope.baseDataLoaded = true;
      $scope.$parent.galleryLinkData = galleryListSuccess(result.data);
    })

    $scope.$parent.permaId = $routeParams.permaId;
    $scope.$parent.jbId = $routeParams.permaId;
    searchTag = "JBID:" + $routeParams.permaId;
    tagSearch(searchTag)
    .then(function(result){
      $scope.photoProgress="80%";
      $scope.mainImage = new Image();
      $scope.mainImage.src = result.data.feed.entry[0].content.src;
      $scope.photoLoaded = true;
      $scope.photoProgress = "100%";
      $scope.picAlbumId = result.data.feed.entry[0].gphoto$albumid.$t;
      $scope.picPhotoId = result.data.feed.entry[0].gphoto$id.$t;
      return photoDetail($scope.picAlbumId, $scope.picPhotoId);
    })
    .then(function(result){
      $scope.photoData = photoDetailSuccess($scope, result.data);
      $scope.metadataLoaded = true;
//      setupSocialWidgets($rootScope);

      var shareData = setupShareData($routeParams.permaId, "//www.jonathanball.photography/id/" + $routeParams.permaId, $scope.mainImage.src, $scope.photoData.feed.media$group.media$description.$t);
      $scope.pinterestButton = { url: shareData.pinitUrl };
      $scope.tumblrButton = {url: shareData.tumblrUrl};
      $scope.twitterButton = {url: shareData.twitterUrl};
      $scope.gPlusButton = {url: shareData.gPlusUrl};
      $scope.facebookButton = {url: shareData.facebookUrl};

      $rootScope.canonicalUrl = shareData.canonicalUrl;
      $rootScope.mdImageUrl = shareData.mediaUrl;
      $rootScope.mdDesc = shareData.mdDesc;


      if (typeof $scope.$parent.galleryLinkData != "undefined") {
        var linkedGalleryIdx = $scope.$parent.galleryLinkData.map(function(e) { return e.id; }).indexOf($scope.picAlbumId);
        $scope.linkedGalleryDesc = (linkedGalleryIdx !== -1) ? $scope.$parent.galleryLinkData[linkedGalleryIdx].desc : null;
        $scope.linkedGalleryId = linkedGalleryIdx + 1;
        $scope.linkedThumbUrl = $scope.$parent.galleryLinkData[linkedGalleryIdx].thumbUrl;
      }
    })

    $scope.prevUrl = null;
    $scope.nextUrl = null;


  }])

  .factory('photoDetail2', ['$http', 'galleryDetail2', function($http, galleryDetail2) {
    return function() {
      return null;
    }
  }])

  .factory('galleryDetail2', ['$http',  function($http) {
    return function() {
      return null;
    }
  }])

  .factory('galleryList2', ['$rootScope', '$http', 'picasaApi', function($rootScope, $http, picasaApi) {

    if (!$rootScope.gallList) {
        picasaApi.galleryList()
        .success(function(data, status, headers, config) {
          $rootScope.gallList = galleryListSuccess(data);
      });
    }
    return $rootScope.gallList;
  }])

  .controller( 'PortfolioCtrl', function PortfolioCtrl($scope, $http, picasaApi) {
    $scope.$parent.activeMenuItem = "portfolio";
    $scope.portfolioLoaded = false;
    $scope.portfolioProgress = "33%";
    $scope.leftColumnContent = [];
    $scope.middleColumnContent = [];
    $scope.rightColumnContent = [];
    $scope.portfolioLength = 0;
    $scope.portfolio = [];
    $scope.currentPhotoIdx = 0;
    if (typeof $scope.$parent.lookGalleryId == "undefined")
    {
      var portfolioGalleryId = '5890831909590934785';
    }
    else
    {
      var portfolioGalleryId = $scope.$parent.lookGalleryId;
      $scope.$parent.lookGalleryId = undefined;
    }

    picasaApi.portfolioDetail(portfolioGalleryId)
    .success(function(data, status, headers, config) {
      $scope.portfolioProgress = "66%";
      $scope.portfolio = data;
//      $scope.portfolioLength = new Array(data.feed.entry.length);
      $scope.portfolioLength = data.feed.entry.length;
      for (var i = 0; i < data.feed.entry.length; i+=3) {
        $scope.leftColumnContent.push(i);
      }
      for (var i = 1; i < data.feed.entry.length; i+=3) {
        $scope.middleColumnContent.push(i);
      }
      for (var i = 2; i < data.feed.entry.length; i+=3) {
        $scope.rightColumnContent.push(i);
      }
      $scope.setLargePortUrl = function(photoIdx) {
        $scope.currentPhotoIdx = photoIdx;
        $scope.largePortUrl =  data.feed.entry[photoIdx].media$group.media$content[0].url;
        $('#portModal').modal('show')
      }
      $scope.prevPort = function() {
        if ($scope.currentPhotoIdx > 0)
        {
          $scope.currentPhotoIdx -= 1;
          $scope.largePortUrl =  $scope.portfolio.feed.entry[$scope.currentPhotoIdx].media$group.media$content[0].url;
        }
      }
      $scope.nextPort = function() {
//        if ($scope.currentPhotoIdx < $scope.portfolioLength.length)
        if ($scope.currentPhotoIdx < $scope.portfolioLength)
        {
          $scope.currentPhotoIdx += 1;
          $scope.largePortUrl =  $scope.portfolio.feed.entry[$scope.currentPhotoIdx].media$group.media$content[0].url;
        }
      }
      $scope.portfolioLoaded = true;

      $scope.stackToggle = function() {
        if ($('#portStack').hasClass('active'))
        {
          $('#portStack').removeClass( 'active' );
        }
        else
        {
          $('#portStack').addClass( 'active' );
        }
      }
    })
  })


  .controller( 'PhotoDetailCtrl', ['$rootScope', '$scope', '$routeParams', '$http', 'galleryDetail', 'photoDetail', 'galleryList', function PhotoDetailCtrl($rootScope, $scope, $routeParams, $http, galleryDetail, photoDetail, galleryList) {

    $scope.$parent.activeMenuItem = "photo";
/*
    $('#accordion .panel-collapse').on("hide.bs.collapse", {type: "hide"}, rotateToggle);
    $('#accordion .panel-collapse').on("show.bs.collapse", {type: "show"}, rotateToggle);
*/
    $scope.photoLoaded = false;
    $scope.metadataLoaded = false;

    $scope.$parent.galleryLinkData = $rootScope.gallList;

    $scope.$parent.photoId = parseInt($routeParams.photoId)
    $scope.$parent.galleryIdx = parseInt($routeParams.galleryIdx);

    $scope.photoProgress = "20%";

    if (typeof $rootScope.baseData == "undefined" || $rootScope.baseDataLoaded == false)
    {
      $rootScope.baseData = galleryList();
    }

    $rootScope.baseData
      .then(function(result){
        $rootScope.baseDataLoaded = true;
        $scope.$parent.galleryLinkData = galleryListSuccess(result.data);
        $scope.galleryId = $scope.$parent.galleryLinkData[$scope.$parent.galleryIdx-1].id;
        if (typeof $rootScope.currGalleryId == "undefined" ||
            typeof $rootScope.galleryDetail == "undefined" ||
            ($rootScope.currGalleryId !== $scope.galleryId))
        {
          $rootScope.currGalleryId = $scope.galleryId;
          $rootScope.galleryDetail = galleryDetail($scope.galleryId);
        }
        return $rootScope.galleryDetail;
      })
      .then(function(result){
        $scope.$parent.gallery = galleryDetailSuccess(result.data);
        $scope.photoProgress = "40%";
        $scope.$parent.galleryLength = $scope.$parent.gallery.feed.entry.length;
        $scope.photoIdx = $scope.$parent.photoId-1;
        $scope.gPhotoId = $scope.$parent.gallery.feed.entry[$scope.photoIdx].gphoto$id.$t;
        $scope.mainImage = new Image();
        $scope.mainImage.src = $scope.gallery.feed.entry[$scope.photoIdx].content.src;
        $scope.prevUrl = buildPrevUrl($scope.$parent.galleryIdx, $scope.photoIdx);
        $scope.nextUrl = buildNextUrl($scope.$parent.galleryIdx, $scope.$parent.galleryLength, $scope.photoIdx);
        $scope.photoProgress = "50%";
        cachePrevNextImg($scope)
        $scope.photoProgress = "60%";
        $scope.photoLoaded = true;
        $rootScope.mdImageUrl = $scope.mainImage.src.substring($scope.mainImage.src.indexOf(":") + 1);

        $rootScope.subTitle = $scope.$parent.galleryLinkData[$scope.$parent.galleryIdx-1].desc + ' (' + $scope.$parent.photoId + ' of ' + $scope.$parent.galleryLength + ') - ';

        return photoDetail($scope.galleryId, $scope.gPhotoId);
      })
      .then(function(result){
        $scope.photoProgress="80%";
        $scope.photoData = photoDetailSuccess($scope, result.data);
        $rootScope.canonicalUrl = "http://www.jonathanball.photography/id/" + $scope.jbId;
        $rootScope.mdDesc = $scope.photoData.feed.media$group.media$description.$t;
        $rootScope.safeMediaUrl = encodeURIComponent($rootScope.mdImageUrl);
        $rootScope.safeLinkUrl = encodeURIComponent($rootScope.canonicalUrl);
        $rootScope.safeDesc = encodeURIComponent($rootScope.mdDesc);

        var shareData = {};
        shareData.pinterest = { url: $rootScope.canonicalUrl, media: $rootScope.mdImageUrl, description: $rootScope.mdDesc };
        shareData.pinitUrl = "//www.pinterest.com/pin/create/button/?" + $.param(shareData.pinterest);
        $scope.pinterestButton = { url: shareData.pinitUrl };
        shareData.tumblr = { clickthru: $rootScope.canonicalUrl, source: $rootScope.mdImageUrl, caption: $rootScope.mdDesc };
        shareData.tumblrUrl = "//www.tumblr.com/share/photo?" + $.param(shareData.tumblr);
//        $scope.tumblrButton = {url: shareData.tumblrUrl };
        $scope.tumblrButton = {url: shareData.tumblrUrl};
        $scope.tumblrParams = $.param(shareData.tumblr);
        shareData.facebookUrl = $scope.jbId;
        $scope.facebookButton = {url: shareData.facebookUrl};
//        shareData.gPlusUrl = "{{jbId}}";
        shareData.gPlusUrl = $scope.jbId;
        $scope.gPlusButton = {url: shareData.gPlusUrl};
        shareData.twitterUrl = "http://jonathanball.photography/id/{{jbId}}";
        $scope.twitterButton = {url: shareData.twitterUrl};

//        setupSocialWidgets(shareData);
        $scope.photoProgress = "100%";
        $scope.metadataLoaded = true;
      })

  }]);


function buildPrevUrl(galleryIdx, photoIdx) {
  if (photoIdx > 0) {
    var prevUrl = "/gallery/" + galleryIdx + "/photo/" + photoIdx;
  }
  else {
    var prevUrl = null;
  }
  return prevUrl;
}

function buildNextUrl(galleryIdx, galleryLength, photoIdx) {
  if (photoIdx + 1 < galleryLength) {
    var nextUrl = "/gallery/" + galleryIdx + "/photo/" + (photoIdx+2);
  }
  else {
    var nextUrl = null;
  }
  return nextUrl;
}

function cachePrevNextImg($scope) {
  if ($scope.prevUrl !== null) {
    new Image().src = $scope.gallery.feed.entry[$scope.photoIdx-1].content.src;
  }
  if ($scope.nextUrl !== null) {
    new Image().src = $scope.gallery.feed.entry[$scope.photoIdx+1].content.src;
  }
}

function carouselContentSuccess(data, $scope) {
  $.each(data.feed.entry, function(index, feedEntry) {
    if (typeof feedEntry.media$group.media$keywords.$t != "undefined") {
      $.each(feedEntry.media$group.media$keywords.$t.split(', '), function(index, keyword) {
        if (keyword.substr(0,6) == "ALBUM#") {
          var galleryLink = keyword.substr(6);
          feedEntry['jb$albumLink'] = {'$t':galleryLink};
          var galleryIdx = $.map($scope.$parent.galleryLinkData, function(n,i) {
            if (n.id==galleryLink)
            {
              return i
            }
          });
          feedEntry['jb$galleryIdx'] = galleryIdx[0];
          feedEntry['jb$galleryId'] = {'$t':(galleryIdx[0]+1).toString()};
        }
      })
    }
  })
  return data;
}

function galleryListSuccess(data) {
  var galleryLinkData = [];
  var galleryIdxCount = 1;
  var galleryId="", galleryIdx=0, galleryDesc="", galleryThumbUrl="", galleryImgCount="", gallerySumm="";

  $.each( data.feed.entry, function(index, galleryEntry) {
    if (galleryEntry.title.$t.substr(0,4) === "^web") {
      galleryId = galleryEntry.gphoto$id.$t;
      galleryIdx = galleryIdxCount++;
      galleryTitleParts = galleryEntry.title.$t.split('/');
//      galleryDesc = galleryEntry.title.$t.split('/')[2];
      galleryDesc = galleryTitleParts[2];
      galleryQuote = galleryTitleParts[3];
      galleryThumbUrl = galleryEntry.media$group.media$thumbnail[0].url;
      galleryImgCount = galleryEntry.gphoto$numphotos.$t
      gallerySumm = galleryEntry.summary.$t;
      galleryLinkData.push({id:galleryId, idx: galleryIdx, desc:galleryDesc, quote:galleryQuote, thumbUrl:galleryThumbUrl, imgCount: galleryImgCount, summ:gallerySumm});
    }
  })
  return galleryLinkData;
}

function galleryDetailSuccess(data) {
  return data;
}

function photoDetailSuccess($scope, data) {

  $scope.licenseAvailable = false;
  $scope.licenseURL = "#";
  $scope.printAvailable = false;
  $scope.printURL = "#";

  if (typeof data.feed.media$group != "undefined") {
    if (typeof data.feed.media$group.media$keywords.$t != "undefined") {
      $.each( data.feed.media$group.media$keywords.$t.split(', '), function(index, value) {
        if (value.substr(0,3) === "RB#") {
          $scope.printAvailable = true;
          $scope.printURL = "http://www.redbubble.com/people/jabey/works/" + value.substr(3);
        }
        if (value.substr(0,6) === "ALAMY#") {
          $scope.licenseAvailable = true;
          $scope.licenseURL = "http://www.alamy.com/image-details-popup.asp?ARef=" + value.substr(6);
        }
        if (value.substr(0,5) === "JBID:") {
          $scope.jbId = value.substr(5);
        }
      })
    };
  }

  return data;
}
/*
function rotateToggle(event) {
  if (event.data.type === "show") {
    $(this).prev().find(".fa-caret-down").addClass("fa-rotate-180");
  }
  else {
    $(this).prev().find(".fa-caret-down").removeClass("fa-rotate-180");
  }
}
*/
/*
function setupSocialWidgets( shareData ) {
  if (typeof FB == "undefined") {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1428296944098387',
        xfbml      : true,
        version    : 'v2.0'
      });
    }
  }
  else {
    FB.XFBML.parse();
  }

  if (typeof gapi == "undefined") {
    window.___gcfg = {
      lang: 'en-GB',
      parsetags: 'explicit'
    };
    gPlusWidget();
  }
  else {
    gapi.plusone.go();
  }

//  twitWidget(document,"script","twitter-wjs");
//  pinWidget(document, shareData.pinitUrl);
//  tumblrWidget(document, "script", "tumblr-js", shareData.tumblrUrl);
//  fbWidget(document, "script", "facebook-jssdk");
}
*/
/*
function twitWidget(d,s,id) {
  var js,fjs=d.getElementsByTagName(s)[0];
  if(!d.getElementById(id)){
    js=d.createElement(s);
    js.id=id;
    js.src="https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js,fjs);
  }
  else {
    twttr.widgets.load();
  }
}
//  (document,"script","twitter-wjs")
*/
/*
function gPlusWidget() {
  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
  po.src = 'https://apis.google.com/js/plusone.js?onload=gPlusCallback';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

}
//  ();
*/
function gPlusCallback() {
  gapi.plusone.go();
}
/*
function pinterestCallback() {
  window.parsePinBtns();
}
*/
/*
//function pinWidget(d, pinitUrl) {
function pinWidget(d) {
    if (typeof eval("window.PIN_" + Math.floor(new Date().getTime() / 86400000))!=="undefined") {           // Pinterest scripts aleady loaded
      // If an image has been previously displayed need to clear out Pin button and regenerate
      $(pinitButton).empty();
      var newPinButtImg = $('<img>');
      newPinButtImg.attr('src','//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_28.png');
      var newPinButt = $('<a>');
      newPinButt.attr('href', pinitUrl);
      newPinButt.attr('data-pin-do','buttonPin');
      newPinButt.attr('data-pin-config','none');
      newPinButt.attr('data-pin-color','red');
      newPinButt.attr('data-pin-height','28');
      newPinButt.append(newPinButtImg);
      $(pinitButton).append(newPinButt);
      buildPinButton();
      return;
    }

    var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
    p.type = 'text/javascript';
    p.async = true;
    p.src = '//assets.pinterest.com/js/pinit.js';
    p.setAttribute("data-pin-build","buildPinButton");
    f.parentNode.insertBefore(p, f);
}
//(document));
*/

/*
function tumblrWidget( d, s, id, tumblrUrl ) {
  var tumblr_button = document.createElement("a");
  tumblr_button.setAttribute("href", tumblrUrl);
  tumblr_button.setAttribute("title", "Share on Tumblr");
  tumblr_button.setAttribute("style", "display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;");
  tumblr_button.innerHTML = "Share on Tumblr";
  document.getElementById("tumblr_button").appendChild(tumblr_button);
  var js,fjs=d.getElementsByTagName(s)[0];
  if(!d.getElementById(id)){
    js=d.createElement(s);
    js.id=id;
    js.src="http://platform.tumblr.com/v1/share.js";
    fjs.parentNode.insertBefore(js,fjs);
  }
  else {
    Tumblr.activate_share_on_tumblr_buttons();
  }
}
*/
/*
function fbWidget(d, s, id) {
//  FB = null;
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
//  if (d.getElementById(id)) {FB.XFBML.parse();}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=1428296944098387&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}
//(document, 'script', 'facebook-jssdk'));
*/
function setupShareData(jbId, canonicalUrl, mediaUrl, description) {
  var shareData = {};

  shareData.canonicalUrl = canonicalUrl;
  shareData.mdImageUrl = mediaUrl;
  shareData.mdDesc = description;
  shareData.pinterest = { url: canonicalUrl, media: mediaUrl, description: description };
  shareData.pinitUrl = "//www.pinterest.com/pin/create/button/?" + $.param(shareData.pinterest);
//  $scope.pinterestButton = { url: shareData.pinitUrl };
  shareData.tumblr = { clickthru: canonicalUrl, source: mediaUrl, caption: description };
  shareData.tumblrUrl = "//www.tumblr.com/share/photo?" + $.param(shareData.tumblr);
//  $scope.tumblrButton = {url: shareData.tumblrUrl};
//  $scope.tumblrParams = $.param(shareData.tumblr);
  shareData.facebookUrl = jbId;
//  $scope.facebookButton = {url: shareData.facebookUrl};
  shareData.gPlusUrl = jbId;
//  $scope.gPlusButton = {url: shareData.gPlusUrl};
  shareData.twitterUrl = canonicalUrl;
//  $scope.twitterButton = {url: shareData.twitterUrl};

  return shareData;
}
