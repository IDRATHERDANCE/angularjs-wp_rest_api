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
            $(element).parent().prev().children().attr('src', attrs.menuItemsHover)
        });
        element.bind('mouseleave', function(event){
            $(element).parent().prev().children().removeAttr('src')
        });
    }
  }
}]);
////////////////////////// adds class to first element in post or page that gives it extra left margin ////////////////////////
WpApp.directive("extraMargin", [function(){
   return function(scope, element, attrs){
                if(element.find('b').length!==0){ 
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
                element.addClass('displaynone');
            });  
    }
 }]);
////////////////////////// single content block text fix some wordpress inserts ////////////////////////
WpApp.directive("singleBlock", [function(){
   return function(scope, element, attrs){
         if(element.find('p').text()===''){
                element.find('p').remove();
           } 
           if((element.find('a').attr('href')!==undefined)&&(element.find('a').attr('href').substring(0, 32)==='http://ninalieven.net/wordpress/')){
                $(element.find('a')[0]).contents().unwrap();
           }
                element.find('a').attr('target', '_blank');
                    if(element.find('img').parent().hasClass('more')){
                        $(element.find('img')[0]).unwrap();
                    }
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
                scope.imgparwi = imgparwi;
              $(element).css('width', imgparwi-5);
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
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
///////////////////////// text box css, track height and number of lines and create more columns if necessary ////////////////////////
WpApp.directive('textBlock', ['$window', '$timeout', function($window, $timeout){
    return function(scope, element){
        var w=angular.element($window),
            p_box=$(element[0].querySelector('.english')),
            p_box_ger = $(element[0].querySelector('.german'));
            element.find('br').replaceWith('<p class="specialps"></p>'); 
               scope.trackHeightChanges=function(){
                    return{
                         
                         'text_height':$(p_box)[0].offsetHeight,
                         'box_height':$(element)[0].offsetHeight

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
            if(typeof p_box_ger[0]!=='undefined'){ 
                p_box=$(element[0].querySelector('.german'));  
                scope.$apply();
            }
         } 
            else{
                if(typeof p_box[0]!=='undefined'){ 
                    p_box=$(element[0].querySelector('.english'));  
                    scope.$apply();
                }
            }
        });
    }
}]);
////////////////////////// language change ////////////////////////
WpApp.directive("textLanguage", [function(){
   return function(scope, element, attrs){
       var spans=element.find('span'),
           heads=$(element[0].querySelector('.main_head')),
           p_box=element.find('p');
           spans.css('text-decoration', 'none');
           heads.insertBefore(heads.parent());
           german_language_string(element);
           route_language_change(element); 
                var read_more=$(element[0].querySelectorAll('.readmore'));  
                    $(read_more).bind('click', function(){ 
                     $(read_more).next().slideDown(1200, function(){
                      $(this).contents().unwrap();
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
                     } else{
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
            if (typeof last!=='undefined'){
              if($(last.childNodes[0]).hasClass('main_head')){  
                    $(last).css('margin-right', newValue.w-660);  
                }
            }
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });
    }
}]);


