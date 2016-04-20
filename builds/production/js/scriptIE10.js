(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

//////////////////////////// define angular module ////////////////////////////
var WpApp=angular.module('WpApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'ngLocationUpdate']);
!function(n){"use strict";n.module("ngLocationUpdate",[]).run(["$route","$rootScope","$location",function(n,t,o){o.update_path=function(c,u){if(o.path()!=c){var a=n.current;t.$on("$locationChangeSuccess",function(){a&&(n.current=a,a=null)}),o.path(c),u||o.replace()}}}])}(window.angular);
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