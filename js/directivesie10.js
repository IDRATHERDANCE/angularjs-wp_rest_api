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