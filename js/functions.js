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