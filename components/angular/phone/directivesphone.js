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
                'ww':w[0].innerWidth
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