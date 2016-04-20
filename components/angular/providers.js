//////////////////////////// all providers for the controller and directives////////////////////////////
WpApp.factory('mainData', function($http){
    

//   $http.jsonp('http://ninalieven.net/wordpress/wp-json/posts?type[]=page&type[]=post?callback=JSON_CALLBACK')
//        .success(function(data){
//            console.log(data);
//        });      
    
    return {
            responseFunction: function(){
               return $http.get('data.json', {cache:true}); 
         }
    } 
 });
//http://ninalieven.net/wordpress/wp-json/posts?type[]=page&type[]=post
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