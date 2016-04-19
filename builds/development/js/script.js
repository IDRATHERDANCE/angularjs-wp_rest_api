(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(n){"use strict";n.module("ngLocationUpdate",[]).run(["$route","$rootScope","$location",function(n,t,o){o.update_path=function(c,u){if(o.path()!=c){var a=n.current;t.$on("$locationChangeSuccess",function(){a&&(n.current=a,a=null)}),o.path(c),u||o.replace()}}}])}(window.angular);


var WpApp=angular.module('WpApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'ngLocationUpdate']);
///////////////////////////////////////////////// configure routs ////////////////////////////////////////////////////////////
WpApp.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
    .when('/', {
        templateUrl:'/part/page.html',
        controller:'routCtrl'
    })
   .when('/:page', {
        templateUrl:'/part/page.html',
        controller:'routCtrl'
    })  
      .when('/:page/:post', {
        templateUrl:'/part/page.html',
        controller:'routCtrl'
    })
    .otherwise({
         redirectTo:'/'
       });
     $locationProvider.html5Mode(true).hashPrefix('!');
}]);
///////////// controller that puts out content onto scope as a single HTML string assabled in services and functions ////////////
////////////on separate files, i chose this method over ng-repeat because it's much faster /////////////////////////////////////
WpApp.controller('routCtrl', function($scope, $rootScope, $location, menuData, contentData){
    // get html string from a service and put it ona the scope
    menuData.getMenuItems().then(function(data){
        $rootScope.menuHTML=data;
    });
    contentData.getContent().then(function(data){
        $scope.contentHTML=data;
     });
            // menu animation class distribution
            if($location.path()==='/'){
                $rootScope.homeclass=true;
             }
             else{
                 $rootScope.homeclass=false;
             } 
});


var WpApp = angular.module('WpApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'ngLocationUpdate'])


.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider)
{
    $routeProvider
    .when('/', {
        templateUrl: '/part/home.html',
        controller: 'routCtrl'
    })
    .when('/:page', {
        templateUrl: '/part/page.html',
        controller: 'routCtrl'
    })  
     .when('/:page/:post', {
         templateUrl: '/part/page.html',
        controller: 'routCtrl'
    })  
    .otherwise({
         redirectTo: '/part/home.html'
       });
     $locationProvider.html5Mode(true).hashPrefix('!');
}]);
WpApp.controller('routCtrl', function($scope,$rootScope,$routeParams,$location,menuDataPhone,contentData){
    // get html string from a service and put it ona the scope
    menuDataPhone.getMenuItemsPhone().then(function(data){
      $rootScope.menuPhoneHTML=data;
    });
    contentData.getContent().then(function(data){
        $scope.contentHTML=data;
     });
});







/////////////////////// puts out menu html from a string //////////////////////
WpApp.directive('menu', function($compile){
  return function(scope, ele, attrs){
      scope.$watch(attrs.menu, function(html){
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
});
//////////////////////// puts out content html from a string //////////////////////
WpApp.directive('wholeContent', function($compile){
  return function(scope, ele, attrs){
      scope.$watch(attrs.wholeContent, function(html){
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
 });
//////////////////////// hover on homepage /////////////////////////////////
WpApp.directive("menuItemsHover", function($location){
  return function(scope, element, attrs){
    if($location.url()=='/'){
        element.bind('mouseenter', function(event){
            element.parent().prev().children().attr('src', attrs.menuItemsHover)
        });
        element.bind('mouseleave', function(event){
            element.parent().prev().children().removeAttr('src')
        });
    }
  }
});
////////////////////////// adds class to first element in post or page that gives it extra left margin ////////////////////////
WpApp.directive("extraMargin", function(){
   return function(scope, element, attrs){
                if(element.find('.main_head')){
                    element.parent().addClass('mar_head');
                }
                else{
                    element.parent().addClass('marg_normal');
                }
            }
});
////////////////////////// remove spinner after data is loaded ////////////////////////////////////////////////
WpApp.directive('spinnerGone', function($timeout, mainData){
    return function(scope, element, attrs){ 
        mainData.responseFunction(function(data){
            }).then(function(res){ 
                $timeout(function(){element.addClass('displaynone');}, 0);
            });  
    }
 });
////////////////////////// single content block text fix some wordpress inserts ////////////////////////
WpApp.directive("singleBlock", function(){
   return function(scope, element, attrs){
         if(element.find('p').text()===''){
                element.find('p').remove();
           } 
           if((element.find('a').attr('href')!==undefined)&&(element.find('a').attr('href').substring(0, 32)==='http://ninalieven.net/wordpress/')){
                element.find('a').contents().unwrap();
           }
                element.find('a').attr('target', '_blank');
                    if(element.find('img').parent().hasClass('more')){
                       element.find('img').unwrap();
                    }
           }
});
////////////////////////// fix the width of the iframe ////////////////////////
WpApp.directive('iframe', function($window){
    return function(scope, element){
        var w=angular.element($window),
            imgwi=element.find('iframe').attr('width'),
            imghi=element.find('iframe').attr('height');
        scope.getWindowDimensions=function(){
            return{'h':w.height()};
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            if(newValue.h<1500){
                var imgparwi=((newValue.h*0.7)*imgwi)/imghi;
            }
            else{
                var imgparwi=((1500*0.7)*imgwi)/imghi;
            }
             element.css('width', imgparwi+3);
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
});
////////////////////////// fix the scrolling over the iframe ////////////////////////
WpApp.directive('iframeScroll', function($window, $timeout){
    return function(scope, element){
        var window=angular.element($window);
        if(navigator.userAgent.toLowerCase().indexOf('firefox')>-1){
            window.bind('scroll', function(){
                $timeout.cancel($.data(this, 'scrollTimer'));
                    $.data(this, 'scrollTimer', $timeout(function(){
                        element.bind('mousemove', function(){
                            element.find('iframe').css('z-index', 1);
                        });
                        var movementTimer=null;
                        element.bind('mousemove', function(){
                            $timeout.cancel(movementTimer);
                                movementTimer=$timeout(function(){
                                    element.find('iframe').css('z-index', -1);
                                }, 1500);
                        });
                }, 250));
            });
       }
    }
});
////////////////////////// fix the width of the image ////////////////////////////////////////////////
WpApp.directive('imgFix', function($window){
    return function(scope, element){
        var w=angular.element($window),
            imgwi=element.find('img').attr('width'),
            imghi=element.find('img').attr('height');
        scope.getWindowDimensions=function(){
            return{'h':w.height()};
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            if(newValue.h<1500){
                var imgparwi=(((newValue.h*0.7)*imgwi)/imghi)+22;
                }
            else{
                var imgparwi=(((1500*0.7)*imgwi)/imghi)+22;    
            }
                element.css('width', imgparwi);
                element.find('.wp-caption').css('width', imgparwi-22)
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
});
////////////////////////// text box css, track height and number of lines and create more columns if necessary ////////////////////////
WpApp.directive('textBlock', function($window, $timeout){
    return function(scope, element){
        var w=angular.element($window),
            p_box=element.find('.english'),
            read_more=element.find('.readmore'); 
            element.find('br').replaceWith('<p class="specialps"></p>'); 
               scope.trackHeightChanges=function(){
                    return{
                         'text_height':p_box.height(),
                         'box_height':element.height()
                      };
                };
                scope.$watch(scope.trackHeightChanges, function(newValue, oldValue){
                    var rows_exist=getRows(newValue.text_height, p_box),
                        rows_fit=getRows(newValue.box_height, element),
                        divi=rows_exist/rows_fit,
                        n_times=Math.ceil(divi);
                        if(n_times===0){n_times=1};
                        scope.n_times=n_times; 
                        element.css({
                             'width':(n_times*400)+(n_times*40),
                             'max-width':(n_times*600)+(n_times*40),
                             'min-width':(n_times*400)+(n_times*40)
                        });
                }, true); 
        $timeout(function(){scope.$apply();},0);
        w.bind('resize', function(){
            scope.$apply();
        });
        var count=0;
        $('.change_language').bind('click', function(){
          count+=1;  
          count=count%2;
         if(count===1){
            p_box=element.find('.german');  
            scope.$apply();
         } 
            else{
                p_box=element.find('.english');  
                scope.$apply();
            }
        });
    }
});
////////////////////////// language change ////////////////////////
WpApp.directive("textLanguage", function(){
   return function(scope, element, attrs){
       var spans=element.find('span'),
           heads=element.find('.main_head'),
           p_box=element.find('p');
           spans.css('text-decoration', 'none');
           heads.insertBefore(heads.parent());
           german_language_string(element);
           route_language_change(element); 
                var read_more=element.find('.readmore');
                    read_more.bind('click', function(){
                      $(this).next().slideDown(1200, function(){
                      $(this).contents().unwrap();
                            scope.$apply();
                      });
                     read_more.slideUp(1200);
                     read_more.prev().slideUp(1200);
                   }); 
   }
});
////////////////////////// language button ////////////////////////
WpApp.directive("languageButton", function(){
   return function(scope, element, attrs){
    var count=0;
        element.bind('click', function(){ 
             count+=1;  
             count=count%2;
             scope.count=count; 
             $('.english').each(function(){
                 if(count===1){
                    element.text('en');
                    $('.readmore').text('mehr lesen');
                    if($(this).next().hasClass('german')){
                        $(this).addClass('displaynone');
                        $(this).next().removeClass('displaynone');
                        }
                  }
                  else{
                      element.text('de');
                      $('.readmore').text('read more');
                      if($(this).next().hasClass('german')){
                          $(this).removeClass('displaynone');
                          $(this).next().addClass('displaynone');
                        }
                    }
                });
          }); 
    }
});
////////////////////////// sliding left and right of the page ////////////////////////////////////////
WpApp.directive("menuAnimation", function($location, $routeParams, $timeout){
   return function(scope, element, attrs){
        $timeout(function(){
                    scope.location=$location.url().slice(1).replace(/\/[^\/]+$/, "");
                    scope.el_text=attrs.menuAnimation;
                    scope.el_left=element.parent()[0].offsetLeft;
                var el_text=scope.el_text,
                    el_left=scope.el_left,
                    location=scope.location;
                // changes between two posts of the different pages
                if($routeParams.post!=undefined){
                  move_left($routeParams.post, el_text, el_left, 1000); 
                }
                // always start from left 0    
                $('html, body').scrollLeft(0);
            // on location change move slide page
            scope.$on('$routeChangeStart', function(next, current){
                if(location===current.params.page){
                     if(current.params.post!==undefined){
                      el_left=element.parent()[0].offsetLeft;
                      $location.update_path(location+'/'+current.params.post, true);
                      move_left(current.params.post, el_text, el_left, 0);
                     }
                      else{
                        el_left=element.parent()[0].offsetLeft;
                        $location.update_path(location, true);
                        move_left(location, el_text, el_left, 0);
                      }
                }
            });
       }, 0);    
    }
});
////////////////////////// adds margin on the last content box ////////////////////////////////////////////////
WpApp.directive('lastMargin', function($window){
    return function(scope, element, attr){
        var w=angular.element($window);
        scope.getWindowDimensions=function(){
            return{'w':w.width()};
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            if(element.children().last().children().hasClass('main_head')){
              element.children().last().css('margin-right', newValue.w-660);  
            }
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
});
/////////////////////// puts out menu html from a string //////////////////////
WpApp.directive('menu', function($compile){
  return{
    link:function(scope, ele, attrs){
      scope.$watch(attrs.menu,function(html){
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});
//////////////////////// puts out content html from a string //////////////////////
WpApp.directive('wholeContent', function($compile){
  return{
    link:function(scope, ele, attrs){
      scope.$watch(attrs.wholeContent, function(html){
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});
//////////////////////// hover on homepage /////////////////////////////////
WpApp.directive("menuItemsHover", function(){
  return function(scope, element, attrs){
    if(location.pathname=='/'){
        element.bind('mouseenter', function(event){
            element.parent().prev().children().attr('src', attrs.menuItemsHover)
        });
        element.bind('mouseleave', function(event){
            element.parent().prev().children().removeAttr('src')
        });
    }
  }
});
////////////////////////// adds class to first element in post or page that gives it extra left margin ////////////////////////
WpApp.directive("extraMargin", function(){
   return function(scope, element, attrs){
                if(element.find('.main_head').length!=0){
                    element.parent().addClass('mar_head');
                }
                else{
                    element.parent().addClass('marg_normal');
                }
            }
});
////////////////////////// remove spinner after data is loaded ////////////////////////////////////////////////
WpApp.directive('spinnerGone', function($compile, $timeout, mainData){
    return function(scope, element, attrs){
        mainData.responseFunction(function(data){
            }).then(function(res){ 
         $timeout(function(){element.addClass('displaynone');}, 0);
            });  
    }
 });
////////////////////////// single content block text fix some wordpress inserts ////////////////////////
WpApp.directive("singleBlock", function(){
   return function(scope, element, attrs){
         if(element.find('p').text()===''){
                element.find('p').remove();
           } 
           if((element.find('a').attr('href')!==undefined)&&(element.find('a').attr('href').substring(0, 32)==='http://ninalieven.net/wordpress/')){
                element.find('a').contents().unwrap();
           }
                element.find('a').attr('target', '_blank');
                    if(element.find('img').parent().hasClass('more')){
                        element.find('img').unwrap();
                    }
           }
});
////////////////////////// fix the width of the iframe ////////////////////////
WpApp.directive('iframe', function($window){
    return function(scope, element){
        var w=angular.element($window),
            imgwi=element.find('iframe').attr('width'),
            imghi=element.find('iframe').attr('height');
        scope.getWindowDimensions=function(){
            return{'h':w.height()};
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            if(newValue.h<1500){
                var imgparwi=((newValue.h*0.7)*imgwi)/imghi;
            }
            else{
                var imgparwi=((1500*0.7)*imgwi)/imghi;
            }
             element.css('width', imgparwi+3);
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
});
////////////////////////// fix the scrolling over the iframe ////////////////////////
WpApp.directive('iframeScroll', function($window, $timeout){
    return function(scope, element){
        var window=angular.element($window);
        if(navigator.userAgent.toLowerCase().indexOf('firefox')>-1){
            window.bind('scroll', function(){
                 $timeout.cancel($.data(this, 'scrollTimer'));
                    $.data(this,'scrollTimer', $timeout(function(){
                        element.bind ('mousemove', function(){
                            element.find('iframe').css('z-index', 1);
                        });
                        var movementTimer=null;
                        element.bind('mousemove', function(){
                             $timeout.cancel(movementTimer);
                                movementTimer=$timeout(function(){
                                    element.find('iframe').css('z-index', -1);
                                }, 1500);
                        });
                }, 250));
            });
       }
    }
});
////////////////////////// fix the width of the image ////////////////////////////////////////////////
WpApp.directive('imgFix', function($window){
    return function(scope, element){
        var w=angular.element($window),
            imgwi=element.find('img').attr('width'),
            imghi=element.find('img').attr('height');
        scope.getWindowDimensions=function(){
            return{'h':w.height()};
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            if(newValue.h<1500){
                var imgparwi=(((newValue.h*0.7)*imgwi)/imghi)+22;
                }
            else{
                var imgparwi=(((1500*0.7)*imgwi)/imghi)+22;    
            }
                element.css('width', imgparwi);
                element.find('.wp-caption').css('width', imgparwi-22)
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
});
////////////////////////// text box css, track height and number of lines and create more columns if necessary ////////////////////////
WpApp.directive('textBlock', function($window){
    return function(scope, element){
        var w=angular.element($window),
            p_box=element.find('.english'),
            read_more=element.find('.readmore'); 
            element.find('br').replaceWith('<p class="specialps"></p>'); 
               scope.trackHeightChanges=function(){
                    return{
                         'text_height':p_box.height(),
                         'box_height':element.height()
                      };
                };
                scope.$watch(scope.trackHeightChanges, function(newValue, oldValue){
                    var rows_exist=getRows(newValue.text_height, p_box),
                        rows_fit=getRows(newValue.box_height, element),
                        divi=rows_exist/rows_fit,
                        n_times=Math.ceil(divi);
                        if(n_times===0){n_times=1};
                        element.css({
                             'width':(n_times*400)+(n_times*40),
                             'max-width':(n_times*600)+(n_times*40),
                             'min-width':(n_times*400)+(n_times*40)
                        });
                }, true); 
        setInterval(function(){scope.$apply();},0);
        w.bind('resize', function(){
            scope.$apply();
        });
        var count=0;
        $('.change_language').bind('click', function(){
          count+=1;  
         count=count%2;
         if(count===1){
            p_box=element.find('.german');  
            scope.$apply();
         } 
            else{
                p_box=element.find('.english');  
                scope.$apply();
            }
        });
    }
});

////////////////////////// language change ////////////////////////
WpApp.directive("textLanguage", function($location, $routeParams, $timeout){
   return function(scope, element, attrs){
       var spans=element.find('span'),
           heads=element.find('.main_head'),
           p_box=element.find('p');
           spans.css('text-decoration', 'none');
                if(element.find('.english').children().hasClass('main_head')===true){
                           heads.insertBefore(heads.parent());
                           german_language_stringIE(element);  
                }
           route_language_change(element);
                var read_more=element.find('.readmore');
                    read_more.bind('click', function(){
                      read_more.parent().find('.more').slideDown(1200, function(){
                         read_more.parent().find('.more').contents().unwrap();
                            scope.$apply();
                      });
                     read_more.slideUp(1200);
                     read_more.prev().slideUp(1200);
                   }); 
         $timeout(function(){
            var location=$location.url().slice(1).replace(/\/[^\/]+$/, ""),
            el_text=element[0].childNodes[0].innerHTML.replace(/\s+/g, '-').toLowerCase(),
            el_left=element[0].offsetLeft;  
                // changes between two posts of the different pages
                if($routeParams.post!=undefined){
                  move_left($routeParams.post, el_text, el_left, 1000); 
                }
                // always start from left 0    
                $('html, body').scrollLeft(0);
            // on location change move slide page
            scope.$on('$routeChangeStart', function(next, current){
                if(location===current.params.page){
                     if(current.params.post!==undefined){
                      el_left=element[0].offsetLeft;
                      $location.update_path(location+'/'+current.params.post, true);
                      move_left(current.params.post, el_text, el_left, 0);
                     }
                      else{
                        el_left=element[0].offsetLeft;
                        $location.update_path(location, true);
                        move_left(location, el_text, el_left, 0);
                      }
                }
            });       
       
      },0);
      }
});
////////////////////////// language button ////////////////////////
WpApp.directive("languageButton", function(){
   return function(scope, element, attrs){
    var count=0;
        element.bind('click', function(){ 
             count+=1;  
             count=count%2;
             $('.english').each(function(){
                 if(count===1){
                    element.text('en');
                    $('.readmore').text('mehr lesen');
                    if($(this).next().hasClass('german')){
                        $(this).addClass('displaynone');
                        $(this).next().removeClass('displaynone');
                        }
                  }
                  else{
                      element.text('de');
                      $('.readmore').text('read more');
                      if($(this).next().hasClass('german')){
                          $(this).removeClass('displaynone');
                          $(this).next().addClass('displaynone');
                        }
                    }
                });
          }); 
    }
});
////////////////////////// adds marin on the last content box ////////////////////////////////////////////////
WpApp.directive('lastMargin', function($window){
    return function(scope, element, attr){
        var w=angular.element($window);
        
        scope.getWindowDimensions=function(){
            return{'w':w.width()};
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            if(element.children().last().children().hasClass('main_head')){
              element.children().last().css('margin-right', newValue.w-660);  
            }
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
});
/////////// puts out menu html for phones from a string //////////////
WpApp.directive('menuPhone', function($compile){
  return function(scope, ele, attrs){
      scope.$watch(attrs.menuPhone, function(html){
        ele.html(html);
        $compile(ele.contents())(scope);
      });
   };
});
///////////// puts out content html from a string ///////////
WpApp.directive('wholeContent', function($compile){
  return function(scope, ele, attrs){
      scope.$watch(attrs.wholeContent, function(html){
        ele.html(html);
        $compile(ele.contents())(scope);
      });
   };
});
///////////// fix some worpress weirdness ///////////
WpApp.directive("singleBlock", function(){
   return function(scope, element, attrs){
         if(element.find('p').text()===''){
                element.find('p').remove();
           } 
           if((element.find('a').attr('href')!==undefined)&&(element.find('a').attr('href').substring(0, 32)==='http://ninalieven.net/wordpress/')){
                element.find('a').contents().unwrap();
           }
                element.find('a').attr('target', '_blank');
         element.find('.wp-caption-text').insertAfter(element.find('.wp-caption-text').parent().parent())
                       if(element.find('img').parent().hasClass('more')){
                        element.find('img').unwrap();
                    }
   }
});
///////////// iframe height fix //////////////////////
WpApp.directive('iframe', function($window){
    return function(scope, element){
        var w=angular.element($window),
            imgwi=element.find('iframe').attr('width'),
            imghi=element.find('iframe').attr('height');
        scope.getWindowDimensions=function(){
            return{
                'ww':w.width()
                };
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            var imgparwi=((newValue.ww*0.7)*imghi)/imgwi;
            angular.forEach(element, function(el){
                        angular.element(el).css({
                         'height':imgparwi
                        });
                });
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
});
/////////// fix img /////////////////////////////////
WpApp.directive("imgFix", function($window){
   return function(scope, element, attrs){
        var w=angular.element($window).width(),
            wp_cap=element.find('.wp-caption'),
            image=element.find('img'),
            imgwi=image.attr('width'),
            imghi=image.attr('height'),
            windowhi=(w*imghi)/imgwi,
            count=0;
            wp_cap.css('width', '100%');
            element.css('height', windowhi);
       var zoomIn=function(){
                  image.css({position:'relative', width:'250%', 'max-width':'250%', 'min-width':'250%'});
                  wp_cap.css({'overflow':'auto'});
                  wp_cap.scrollTop(wp_cap.height()/2).scrollLeft(wp_cap.width()/2);
            },
           zoomOut=function(){
                   image.css({position:'static', width:'100%', 'max-width':'100%', 'min-width':'100%'});
                   wp_cap.css({overflow:'hidden'});
           };
        element.bind('doubletap', function(){
            count+=1;
            count=count%2;
                if (count==1){
                    zoomIn();
                }
                else{
                    zoomOut();
                }
        });
           element.bind('pinchopen', function(){alert('open');
                zoomIn();
           });
           element.bind('pinchclose', function(){
                zoomOut();
           });
    }
});
////////////////////////// text box css, track height and number of lines and create more columns if necessary ////////////////////////
WpApp.directive('textBlock', function($window){
    return function(scope, element){
            element.find('br').replaceWith('<p class="specialps"></p>'); 
    }
});
////////////////////////// language change ////////////////////////
WpApp.directive("textLanguage", function(){
   return function(scope, element, attrs){
       var spans=element.find('span'),
           heads=element.find('.main_head'),
           p_box=element.find('p');
           spans.css('text-decoration', 'none');
           heads.insertBefore(heads.parent());
           german_language_string(element);
           route_language_change(element);
                var read_more=element.find('.readmore');
                    read_more.bind('click', function(){
                      read_more.parent().find('.more').slideDown(1200, function(){
                         read_more.parent().find('.more').contents().unwrap();
                      });
                     read_more.slideUp(1200);
                     read_more.prev().slideUp(1200);
                   }); 
   }
});
////////////////////////// language button ////////////////////////
WpApp.directive("languageButton", function(){
   return function(scope, element, attrs){
    var count=0;
        element.bind('click', function(){ 
             count+=1;  
             count=count%2;
             $('.english').each(function(){
                 if(count===1){
                    element.text('en');
                    $('.readmore').text('mehr lesen');
                    if($(this).next().hasClass('german')){
                        $(this).addClass('displaynone');
                        $(this).next().removeClass('displaynone');
                        }
                  }
                  else{
                      element.text('de');
                      $('.readmore').text('read more');
                      if($(this).next().hasClass('german')){
                          $(this).removeClass('displaynone');
                          $(this).next().addClass('displaynone');
                        }
                    }
                });
          }); 
    }
});
//////////////////////// phone menu height ////////////////////////////////////////////
WpApp.directive('phoneMenuCss', function ($window, $route, $routeParams, $location, menuCurrentPhone){
    var location = $location.url().slice(1).replace(/\/[^\/]+$/, "");
    return function (scope, element, attr){
        var w=angular.element($window),
            eles=element.parent().find('.projects'),
            nums=eles.size();
        scope.getWindowDimensions=function(){
            return {
                'wh':w.height()
            };
        };
         scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            var pro_h=Math.ceil(newValue.wh/nums);
                element.css('height', pro_h);
                 $('.change_language').css({'top': pro_h+10, 'display': 'block'})
                  element.find('.arrow').css({'top':0.25*pro_h, 'width':pro_h*0.5});
                   element.find('p').css({'padding-top':0.25*pro_h});
                    if(($routeParams.page!==undefined)&&($routeParams.page===location)){
                      menuCurrentPhone.getCurrentMenuItemPhone().then(function(data){
                       phone_menu(element, $routeParams.page, attr.phoneMenuCss, attr.menuItemName, pro_h, data, 0);
                    }); 
                          }
                          else if(($routeParams.page===undefined)&&(location==='')){
                                element.css({'top':attr.phoneMenuCss*pro_h}); 
                          }
        }, true);
         w.bind('resize', function(){
            scope.$apply();
        });
     }
});
/////////////////////////////////// phone menu animation ////////////////////////////////////////////
WpApp.directive('phoneMenuAnimation', function ($window, $route, $routeParams, $location, menuCurrentPhone, $timeout) {
      var location = $location.url().slice(1).replace(/\/[^\/]+$/, "");
      return function (scope, element, attr) {
           $timeout(function(){
                // on page refresh    
               if(($routeParams.page!==undefined)&&($routeParams.page===location)){
                menuCurrentPhone.getCurrentMenuItemPhone().then(function(data){
                   phone_menu(element, $routeParams.page, attr.phoneMenuCss, attr.menuItemName, element.context.clientHeight, data, 800);
                }); 
               }
            // on route change         
               scope.$on('$routeChangeStart', function(next, current){
                   // if coming from a page to home
                    if((current.params.page===undefined)&&($routeParams.page!==undefined)){
                        phone_menu_home(element, attr.phoneMenuCss, element.context.clientHeight, attr.menuItemName);
                    }
                    // if coming from home to a page
                    else{
                        menuCurrentPhone.getCurrentMenuItemPhone().then(function(data){
                        phone_menu(element, current.params.page, attr.phoneMenuCss, attr.menuItemName, element.context.clientHeight, data, 800);
                        }); 
                   }
              });  
      }, 0);
    }
});
//////////////////////////// all providers for the controller and directives////////////////////////////
WpApp.factory('mainData', function($http){
    return {
            responseFunction: function(){
               return $http.get('http://ninalieven.net/wordpress/wp-json/posts?type[]=page&type[]=post', {cache:true}); 
         }
    } 
 });
// take object and assemble the main menu string 
WpApp.service('menuData', function(mainData){
  this.getMenuItems=function(){
    return mainData.responseFunction(function(data){
    }).then(function(res){  
          var data=res.data,
              pages_object=[],
              posts_object=[],
              pages_string='',
              posts_string='';
        for(var i=0;i<data.length;i++){
             if(data[i].type=="page"){
                 var page_title_slug=data[i].title.replace(/\s+/g, '-').toLowerCase(),
                     page_title=data[i].title,
                     page_hover_photo=data[i].meta.hover_photo.url;
                        pages_object.push({
                            pages_string:'<div class="projects '+page_title_slug+'" ng-class="{'+"'"+page_title_slug +'_home'+"'"+':homeclass}"><div class=hover_ph ng-class="{'+"'"+'hov_show'+"'"+':homeclass}"><img  /></div><p class="pro_p_'+page_title_slug+'" ng-class="{'+"'"+'pro_p_'+page_title_slug+'_home'+"'"+':homeclass}"><a menu-items-hover="'+page_hover_photo+'" ng-href="'+page_title_slug+'">'+page_title+'</a></p>',
                            page_title_slug:page_title_slug
                                });
             } // end if page
                    if(data[i].type=="post"){
                       var  post_title_slug=data[i].title.replace(/\s+/g, '-').toLowerCase(),
                            post_title=data[i].title,
                            post_hover_photo=data[i].meta.hover_photo.url,
                            post_category=data[i].terms.category[0].slug;
                                 posts_object.push({
                                    posts_string:'<div class="posts" id="'+post_title_slug+'"><div class="hover_ph" ng-class="{'+"'"+'hov_show'+"'"+':homeclass}"><img /></div><p class="post_p_'+post_title_slug+'" ng-class="{'+"'"+'post_p_'+post_title_slug+'_home'+"'"+':homeclass}"><a menu-items-hover="'+post_hover_photo+'" ng-href="'+post_category+'/'+post_title_slug+'">'+post_title+'</a></p></div>',
                                    post_category:post_category
                                });
                    } // end if post
         } // end big data loop
                // loop through newly essambled object
            for(var i=0;i<pages_object.length;i++){
                        // inner loop through posts
                  for(var j=0;j<posts_object.length;j++){
                            // if page has posts append them
                        if(pages_object[i].page_title_slug===posts_object[j].post_category){
                            pages_object[i].pages_string=pages_object[i].pages_string+posts_object[j].posts_string;
                          }
                             else{
                             pages_object[i].pages_string=pages_object[i].pages_string;
                             }
                        }
                }
                                    // final loop and appending all the string into one
                                  for(var i=0;i<pages_object.length;i++){
                                     pages_string+=pages_object[i].pages_string+'</div>';
                                  }
                return pages_string;
    });
  }
});
// make an onbject to feed into a function that assambles content HTML in a sigle string
WpApp.service('contentData', function($location, mainData){
     this.getContent=function(){
            return mainData.responseFunction(function(data){
            }).then(function(res){
                    var data=res.data,
                        location=$location.url().slice(1).replace(/\/[^\/]+$/, ""),
                        big_string='',
                        big_string_page='',
                        big_string_post='';
                        $(".page_content").addClass('page'+location);
                        $(".page").addClass(location);
                             for (var i=0;i<data.length;i++){
                                    // pages loop
                                 if (data[i].type=="page"){
                                            // page content array depending on location
                                            if (data[i].title.replace(/\s+/g, '-').toLowerCase()==location){
                                            var main_string=data[i].content;
                                                if(main_string.indexOf("<!--more-->")>-1){
                                                 main_string='<p><b menu-animation='+location+' class="main_head">'+data[i].title+'</b>'+main_string.replace(/<!--more-->/g, '<br><em class=readmore>read more</em>');
                                                }
                                                else{
                                                main_string = '<p><b menu-animation='+location+' class="main_head">'+data[i].title+'</b>'+main_string;      }
                                            // feed this string to the function content_string_assemble that assembles html
                                            // the function is at the separate functions file
                                            big_string_page=content_string_assemble(main_string, location);
                                          }
                                    }; // end pages loop
                                  // posts loop
                                 if (data[i].type=="post"){
                                            // post content array depending on location
                                            if(data[i].terms.category[0].slug==location){
                                            var main_string_post=data[i].content;
                                                 if(main_string_post.indexOf("<!--more-->")>-1){
                                                 main_string_post='<p><b menu-animation='+data[i].title.replace(/\s+/g, '-').toLowerCase()+' class="main_head">'+data[i].title+'</b>'+main_string_post.replace(/<!--more-->/g, '<br><em class=readmore>read more</em>');
                                                }
                                                else{
                                                main_string_post='<p><b menu-animation='+data[i].title.replace(/\s+/g, '-').toLowerCase()+' class="main_head">'+data[i].title+'</b>'+main_string_post;                                                 }
                                          big_string_post+=content_string_assemble(main_string_post, location);
                                         }
                                    }; // end posts loop
                                big_string=big_string_page+big_string_post;
                             }; // end data loop
                 return '<div class="page_content" last-margin>'+big_string+'</div>';
             }); // end then
    };  // end getContent
}); // end service
// assemble HTML menu string for phones
WpApp.service('menuDataPhone', function(mainData){
  this.getMenuItemsPhone=function(){
    return mainData.responseFunction(function(data) {
    }).then(function(res){
          var data=res.data,
              pages_string='';
        for(var i=0, k=0;i<data.length; i++){
              if(data[i].type=="page"){
                 var page_title_slug=data[i].title.replace(/\s+/g, '-').toLowerCase(),
                     page_title=data[i].title,
                     page_hover_photo=data[i].meta.hover_photo.url;
pages_string+='<div phone-menu-animation phone-menu-css="' + k +'" menu-item-name='+page_title_slug+' class="projects phone '+page_title_slug+'"><a ng-href='+page_title_slug+'><div class="over"></div><p class="pro_p">'+page_title+'</p><div class="arrow"><img src="images/right_arrow-128.png" /></div><div class="hover_ph phone"><img ng-src="'+page_hover_photo+'" /></div><div class="under"></div></a></div>';
                 k++
             } // end if page
         } // end big data loop
            return pages_string;
    });
  }
});
// send the index of the current menu item to the directive
WpApp.service('menuCurrentPhone', function($location, mainData){
  this.getCurrentMenuItemPhone=function(){
    return mainData.responseFunction(function(data) {
    }).then(function(res){
          var data=res.data,
              cur=null,
              location=$location.url().slice(1).replace(/\/[^\/]+$/, "");
        for(var i=0, k=0;i<data.length; i++){
                if(data[i].type=="page"){
                 var page_title_slug=data[i].title.replace(/\s+/g, '-').toLowerCase();
                     if(location===page_title_slug){
                      cur=k;   
                     }
                 k++
             } // end if page
         } // end big data loop
            return cur;
    });
  }
});
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

////// function that goes through big data object from a service and depending on type and location and assamles it as a string /////
var content_string_assemble=function(pagectt, loc){
     var ps_group_head=[],
         ps_group=[],
         g_h='',
         pagectt=$(pagectt);
    for (var j=0;j<pagectt.length;j++){
        if(pagectt[j].nodeName!='#text'){
            // even out some worpress weirdness
            if ($(pagectt[j]).context.innerHTML.indexOf("img")>-1){
              if ($(pagectt[j]).context.innerHTML.indexOf("wp-caption-text")>-1){
                    $(pagectt[j]).find('img').parent().parent().wrap("<div class='wp-caption'></div>");
                  }
                   else{
                       $(pagectt[j]).find('img').wrap("<div class='wp-caption'></div>");
                    }
            }
               if($(pagectt[j]).context.innerHTML.indexOf("iframe")>-1){
                   $(pagectt[j]).find('iframe').wrap("<div class='wp-caption'></div>");
                 }
      // figure out if it's an image and make a create object of it
 if(($(pagectt[j]).context.innerHTML.indexOf("img")>-1)&&($(pagectt[j]).context.innerHTML.indexOf("main_head")==-1)){
        ps_group_head.push({
          el:'<div class=pstog single-block img-fix iframe-scroll>'+$(pagectt[j]).context.outerHTML,
          ind:'ima'
        }); 
 } 
      // figure out if it's an iframe and make a create object of it
if(($(pagectt[j]).context.innerHTML.indexOf("iframe")>-1)&&($(pagectt[j]).context.innerHTML.indexOf("main_head")==-1)){ 
     ps_group_head.push({
         el:'<div class=pstog single-block iframe iframe-scroll>'+$(pagectt[j]).context.outerHTML,
         ind:'ima'
        });
 } 
      // figure out if it's a paragraph
                if(($(pagectt[j]).context.localName=='p')&&($(pagectt[j]).context.innerHTML!='&nbsp;')&&($(pagectt[j]).context.innerHTML.indexOf("img")==-1)&&($(pagectt[j]).context.innerHTML.indexOf("iframe")==-1)){
                    // if paragraph head
                    if((($(pagectt[j]).context.previousElementSibling==null)||($(pagectt[j]).context.previousElementSibling.innerHTML=='&nbsp;')||($(pagectt[j]).context.previousElementSibling.innerHTML.indexOf("img")>-1)||($(pagectt[j]).context.previousElementSibling.innerHTML.indexOf("iframe")>-1))&&((($(pagectt[j]).context.nextElementSibling!=null)&&(($(pagectt[j]).context.nextElementSibling.innerHTML!='&nbsp;')&&($(pagectt[j]).context.nextElementSibling.localName=='p')))||(($(pagectt[j]).context.nextElementSibling==null)||($(pagectt[j]).context.nextElementSibling.innerHTML=='&nbsp;')||($(pagectt[j]).context.nextElementSibling.innerHTML.indexOf("img")>-1)||($(pagectt[j]).context.nextElementSibling.innerHTML.indexOf("iframe")>-1)))){
                        if((GetIEVersion()>0)||(/Edge\/\d+/i.test(navigator.userAgent))){
                             ps_group_head.push({
                                 el:'<div class="pstog'+j+'-'+loc+' text_box" text-block text-language iframe-scroll><p class="english" extra-margin'+$(pagectt[j]).context.outerHTML.substr(2)+'</b>',
                              ind:j
                            });   
                        }
                        else{
                             ps_group_head.push({
                                 el:'<div class="pstog'+j+'-'+loc+' text_box" text-block text-language iframe-scroll><p class="english" extra-margin'+$(pagectt[j]).context.outerHTML.substr(2),
                              ind:j
                            }); 
                        }

                }
                        // a paragraph that is not head
                         else{
                             var str=$(pagectt[j]).context.outerHTML;
                             var new_str=str.substring(3, str.length-4);
                             ps_group.push({
                                  el:new_str,
                                  ind:j
                                });
                         }           
                } // end if p
        } // end of node.name=#text
    } // end of inside object loop
// object of text heads
var head_index=[];
 for (var f=ps_group_head.length-1;f>=0;f--){
    if (ps_group_head[f].ind!='ima'){
        head_index.push(ps_group_head[f].ind)
    }
};
// figure out to which head to add text
  var theArray=head_index,
      closest=null,
      assamb_el=[];
        for(var g=0;g<ps_group.length;g++){
             var goal=ps_group[g].ind;
            $.each(theArray,function(){
                      if(this<=goal&&(closest==null||(goal-this)<(goal-closest))){
                        closest=this;
                      }
                    });
                    assamb_el.push({
                        index:closest,
                        element:ps_group[g].el
                    });
        };     
             // add text to headline
            for(var i=0;i<ps_group_head.length;i++){
                     for(var h=0;h<assamb_el.length;h++){
                            if(assamb_el[h].index==ps_group_head[i].ind){
                                ps_group_head[i].el=ps_group_head[i].el.slice(0, -4)+'<br>'+assamb_el[h].element.replace('<em class="readmore">read more</em>', '<em class="readmore">read more</em><em class=more>')+'</p>';
                                }
                                 else{
                                     ps_group_head[i].el=ps_group_head[i].el;
                                }
                    };
            };
    // finally assemble big string
     for(var i=0;i<ps_group_head.length;i++){
          g_h+=ps_group_head[i].el+'</em></div>';
         };
    return g_h;
};
////////////////////// function that slides view to posts within one page ///////////////////////////
var move_left=function(where, text, left, delay){console.log(where, text, left, delay)
     if(text===where){
          if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
              $('body').delay(delay).animate({scrollLeft:left-200}, 1000);
             }
             else{
                  $('body, html').delay(delay).animate({scrollLeft:left-200}, 1000);
                }
     }
};
/////// calculate number of text rows in respect to the height of the element and font size /////////
var getRows=function(el_h, ele){ 
    var height=el_h,
        font_size=$(ele).css('font-size'),
        scale=1.15,
        line_height=Math.floor(parseInt(font_size)*scale),
        rows=height/line_height;
    return num_rows=Math.round(rows);
};
////////// function for phone menu animation /////////////////////////////////////////////////////////
var phone_menu=function(eles, loc, index, proj_name, height_p, curr_index, dur){
    $("section").css('margin-top', height_p+20);
    var num_index=parseInt(index); 
        if(curr_index===num_index){
             eles.find('a').attr('href', '');
             eles.find('.arrow').addClass('arr_down');
             eles.animate({top:0}, dur, function(){
             eles.find('a').attr('href', '/')     
             });
         }
         else{
              if(curr_index<num_index){
                eles.animate({top:$(window).height()+(height_p*num_index)}, dur); 
              }
              else{
                eles.animate({top:-((curr_index-num_index)*height_p)}, dur);
              }
        }
};
////////////////////// function for phone menu animation on coming to home page /////////////////////
var phone_menu_home=function(elem, num_index, height_p, proj_name){
    $("section").css('margin-top', 0);
    elem.find('.arrow').removeClass('arr_down');
    elem.animate({top:height_p*num_index}, 1000, function(){
                 elem.find('a').attr('href', proj_name);
                 });
};
////////////////////// check for ie version /////////////////////
var GetIEVersion=function(){
  var sAgent = window.navigator.userAgent,
      Idx = sAgent.indexOf("MSIE");
  if (Idx > 0) 
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11;
  else
    return 0;
};
////////////////////// remember the language on route change /////////////////////
var route_language_change=function(element){
         if($('.change_language').text()==='de'){
              if(element.find('.english')[0].nextSibling!==null){
                   element.find('.german').addClass('displaynone');
                   element.find('.english').removeClass('displaynone');
               }
            }
             else{
                   if(element.find('.english')[0].nextSibling!==null){
                     element.find('.english').addClass('displaynone');
                     element.find('.german').removeClass('displaynone'); 
                   }
               }
};
////////////////////// language strings /////////////////////
var german_language_string=function(element){ 
    var html_string=element[0].innerHTML, 
    html_string_german=html_string.substring(html_string.indexOf('<br><span'));
    // if just headline with no body text  
    if (html_string.slice(-39)==='<p class="english" extra-margin=""></p>'){ 
        var html_string_english='';
      }                                         
      else{
          // if there is a german version of the text  
          if(html_string_german.indexOf('<br><span')>-1){  
            var html_string_english=html_string.substring(html_string.indexOf('<p class="english" extra-margin="">')+35, html_string.indexOf('<br><span'));
            if(element.children().hasClass('main_head')===false){
               var german='<p class="german">'+html_string_german.substr(4);    
             }
              else{
              var german='<p class="german">'+html_string_german;   
              }
            element.find('.english').empty().append(html_string_english).after(german); 
           }
        // if there is just english version of the text  
        else{
            var html_string_english=html_string.substring(html_string.indexOf('<p class="english" extra-margin="">')+35); 
            element.find('.english').empty().append(html_string_english);
            }
        }                                         
 };
////////////////////// language strings /////////////////////
var german_language_stringIE=function(element){ 
    var html_string=element[0].innerHTML, 
    html_string_german=html_string.substring(html_string.indexOf('<br><span'));
    // if just headline with no body text  
    if (html_string.slice(-39)==='<p class="english" extra-margin=""></p>'){ 
        var html_string_english='';
      }                                         
      else{
          // if there is a german version of the text  
          if(html_string_german.indexOf('<br><span')>-1){
            var html_string_english=html_string.substring(html_string.indexOf('<p class="english" extra-margin="">')+35, html_string.indexOf('<br><span')),
            german='<p class="german">'+html_string_german;
            element.find('.english').empty().append(html_string_english).after(german);   
            var german_delete=element.context.children[1].children;
               for(var i=0;i<german_delete.length;i++){
                     if($(german_delete[i]).context.nodeName==='SPAN'){
                          german_delete[i].remove();
                       }
                   }
           }
        // if there is just english version of the text  
        else{
            var html_string_english=html_string.substring(html_string.indexOf('<p class="english" extra-margin="">')+35); 
            element.find('.english').empty().append(html_string_english);
            }
        }                                         
 };
/*
 * jQuery Double Tap
 * Developer: Sergey Margaritov (sergey@margaritov.net)
 * Date: 22.10.2013
 * Based on jquery documentation http://learn.jquery.com/events/event-extensions/
 */

(function($){

  $.event.special.doubletap = {
    bindType: 'touchend',
    delegateType: 'touchend',

    handle: function(event) {
      var handleObj   = event.handleObj,
          targetData  = jQuery.data(event.target),
          now         = new Date().getTime(),
          delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
          delay       = delay == null ? 300 : delay;

      if (delta < delay && delta > 30) {
        targetData.lastTouch = null;
        event.type = handleObj.origType;
        ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
          event[property] = event.originalEvent.changedTouches[0][property];
        })

        // let jQuery handle the triggering of "doubletap" event handlers
        handleObj.handler.apply(this, arguments);
      } else {
        targetData.lastTouch = now;
      }
    }
  };

})(jQuery);
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);

},{}]},{},[1])