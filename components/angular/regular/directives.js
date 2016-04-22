/////////////////////// puts out menu html from a string //////////////////////
WpApp.directive('menu', ['$compile', function($compile){
  return function(scope, ele, attrs){
      scope.$watch(attrs.menu, function(html){
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
}]);
//////////////////////// puts out content html from a string //////////////////////
WpApp.directive('wholeContent', ['$compile', function($compile){
  return function(scope, ele, attrs){
      scope.$watch(attrs.wholeContent, function(html){
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
 }]);
//////////////////////// hover on homepage /////////////////////////////////
WpApp.directive("menuItemsHover", ['$location', function($location){
  return function(scope, element, attrs){
    if($location.url()=='/'){
        element.bind('mouseenter', function(event){
            $(element.parent()[0].previousElementSibling.childNodes[0]).attr('src', attrs.menuItemsHover)
        });
        element.bind('mouseleave', function(event){
            $(element.parent()[0].previousElementSibling.childNodes[0]).removeAttr('src')
        });
    }
  }
}]);
////////////////////////// adds class to first element in post or page that gives it extra left margin ////////////////////////
WpApp.directive("extraMargin", [function(){
   return function(scope, element, attrs){
                if(element.find('.main_head')){
                    element.parent().addClass('mar_head');
                }
                else{
                    element.parent().addClass('marg_normal');
                }
            }
}]);
////////////////////////// remove spinner after data is loaded ////////////////////////////////////////////////
WpApp.directive('spinnerGone', ['$timeout', 'mainData', function($timeout, mainData){
    return function(scope, element, attrs){ 
        mainData.responseFunction(function(data){
            }).then(function(res){ 
                $timeout(function(){element.addClass('displaynone');}, 0);
            });  
    }
 }]);
////////////////////////// single content block text fix some wordpress inserts ////////////////////////
WpApp.directive("singleBlock", [function(){
   return function(scope, element, attrs){
         if(element.find('p').text()===''){
                element.find('p').remove();
           } 
        var aParent = element[0].childNodes[0],
                aS = element[0].childNodes[0].childNodes[0];
               
                if ($(aS).hasClass('more')){ 
                    var more = element[0].childNodes[0].childNodes[0].childNodes[0];
                    aParent.removeChild(aS);
                    $(aParent).append(more);
                aParent = element[0].childNodes[0];
                aS = element[0].childNodes[0].childNodes[0];
              }
        
           if(($(aS).attr('href')!==undefined)&&($(aS).attr('href').substring(0, 32)==='http://ninalieven.net/wordpress/')){
               aS = element[0].childNodes[0].childNodes[0];
                var imgS = element[0].childNodes[0].childNodes[0].childNodes[0];
                    aParent.removeChild(aS);
                    $(aParent).append(imgS); 
           }
                element.find('a').attr('target', '_blank');
          }
}]);
////////////////////////// fix the width of the iframe ////////////////////////
WpApp.directive('iframe', ['$window', function($window){
    return function(scope, element){
        var w=angular.element($window),
            imgwi=element.find('iframe').attr('width'),
            imghi=element.find('iframe').attr('height');
        scope.getWindowDimensions=function(){
            return{'h':w[0].innerHeight};
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            if((newValue.h<1500)&&(newValue.h>600)){
                var imgparwi=((newValue.h*0.7)*imgwi)/imghi;
                }
            else if(newValue.h<600){
                var imgparwi=((600*0.7)*imgwi)/imghi;
                }
            else if(newValue.h>1500){
                var imgparwi=((1500*0.7)*imgwi)/imghi;   
            }
              element.css('width', imgparwi+3);
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
}]);
////////////////////////// fix the scrolling over the iframe ////////////////////////
WpApp.directive('iframeScroll', ['$window', '$timeout', function($window, $timeout){
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
}]);
////////////////////////// fix the width of the image ////////////////////////////////////////////////
WpApp.directive('imgFix', ['$window', function($window){
    return function(scope, element){
        var w=angular.element($window),
            imgwi=element.find('img').attr('width'),
            imghi=element.find('img').attr('height'); 
        scope.getWindowDimensions=function(){
            return{'h':w[0].innerHeight}; 
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){
            if((newValue.h<1500)&&(newValue.h>600)){
                var imgparwi=(((newValue.h*0.7)*imgwi)/imghi)+22;
                }
            else if(newValue.h<600){
                var imgparwi=(((600*0.7)*imgwi)/imghi)+22;    
                }
            else if(newValue.h>1500){
                var imgparwi=(((1500*0.7)*imgwi)/imghi)+22;    
            }
                $(element).css('width', imgparwi);
                $(element.find('div')).css('width', imgparwi-22)
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
}]);
////////////////////////// text box css, track height and number of lines and create more columns if necessary ////////////////////////
WpApp.directive('textBlock', ['$window', '$timeout', function($window, $timeout){
    return function(scope, element){
        var w=angular.element($window),
            p_box=element[0].childNodes[1]; 
            element.find('br').replaceWith('<p class="specialps"></p>'); 
               scope.trackHeightChanges=function(){
                    return{
                         'text_height':p_box.clientHeight, 
                         'box_height':element[0].clientHeight
                      };
                }; 
                scope.$watch(scope.trackHeightChanges, function(newValue, oldValue){
                    var rows_exist=getRows(newValue.text_height, p_box),
                        rows_fit=getRows(newValue.box_height, element),
                        divi=rows_exist/rows_fit,
                        n_times=Math.ceil(divi);
                        if(n_times===0){n_times=1};
                        scope.n_times=n_times; 
                        $(element).css({
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
            p_box=element[0].childNodes[2];  
            scope.$apply();
         } 
            else{
                p_box=element[0].childNodes[1];  
                scope.$apply();
            }
        });
    }
}]);
////////////////////////// language change ////////////////////////
WpApp.directive("textLanguage", [function(){
   return function(scope, element, attrs){
       var spans=element.find('span');
           if ($(element[0].childNodes[0].childNodes[0]).hasClass('main_head')){
               var heads=element[0].childNodes[0].childNodes[0],
                    par=element[0].childNodes[0];
                element[0].insertBefore(heads, par);  
           }
           spans.css('text-decoration', 'none');
           german_language_string(element);
           route_language_change(element); 

       var read_more = document.querySelectorAll('.readmore');
                $(read_more).bind('click', function(){
                    $(read_more).next().slideDown(1200, function(){
                        var parContext = $(this)[0].parentNode,
                            childNo = $(this)[0].childNodes;
                                if($(this)[0].parentNode!==null){
                                    $(this)[0].parentNode.removeChild($(this)[0]);
                                    $(parContext).append(childNo);
                                }
                            scope.$apply();
                      });
                     $(read_more).slideUp(1200);
                     $(read_more).prev().slideUp(1200);
                   }); 
   }
}]);
////////////////////////// language button ////////////////////////
WpApp.directive("languageButton", [function(){
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
}]);
////////////////////////// sliding left and right of the page ////////////////////////////////////////
WpApp.directive("menuAnimation", ['$location', '$routeParams', '$timeout', function($location, $routeParams, $timeout){
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
}]);
////////////////////////// adds margin on the last content box ////////////////////////////////////////////////
WpApp.directive('lastMargin', ['$window', '$location', function($window, $location){
    return function(scope, element, attr){
        var w=angular.element($window),
            last=element[0].childNodes[element[0].childNodes.length-1];
        scope.getWindowDimensions=function(){
            return{'w':w[0].innerWidth};
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue){ 
          if(($location.path()!=='/')&&($(last.childNodes[0]).hasClass('main_head'))){  
                $(last).css('margin-right', newValue.w-660);  
            }
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
}]);