//var $ = require('jquery');
//var angular = require('angular');
//var ngRoute = require('angular-route');
//var ngAnimate = require('angular-animate');
//var ngResource = require('angular-resource');
//var ngSanitize = require('angular-sanitize');
describe('ninalieven.com unit tests', function(){
        var expectedUrl='http://ninalieven.com/wordpress/wp-json/posts?type[]=page&type[]=post',
            expectRoute='/part/page.html';

    
beforeEach(module('WpApp'));
     
    beforeEach(inject(function(_$httpBackend_){
        $httpBackend=_$httpBackend_;
        $httpBackend.whenGET(expectedUrl).respond(200, returnData);
        $httpBackend.whenGET(expectRoute).respond(200, returnData);
    }));
    
        afterEach(inject(function(){
             $httpBackend.verifyNoOutstandingExpectation();
             $httpBackend.verifyNoOutstandingRequest();
          }));
    
              

   describe('controller unit tests', function(){ 
    
    beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _menuData_, _contentData_, _$httpBackend_, _$q_){
       
            $scope=_$rootScope_.$new();
            $controller=_$controller_;
            $location=_$location_;
            menuData=_menuData_;
            contentData=_contentData_;
            $httpBackend=_$httpBackend_;
            $q=_$q_;
            deferred=_$q_.defer();
            $httpBackend.flush();
            spyOn(menuData, 'getMenuItems').and.returnValue(deferred.promise);
            spyOn(contentData, 'getContent').and.returnValue(deferred.promise);
                $controller('routCtrl', { 
                  $scope: $scope, 
                  menuData: menuData,
                  contentData: contentData
                });

    }));
    
      it('should resolve promise from menuData service and put menu html on the scope', function () {
        deferred.resolve(sampleHTML);
            $scope.$apply();
        expect($scope.menuHTML).toBe(sampleHTML);
      });
       
       
      it('should resolve promise from contentData service and put content html on the scope', function () {
         deferred.resolve(sampleHTML);
            $scope.$apply();
         expect($scope.contentHTML).toBe(sampleHTML);
      });       
  
       it('location path should be set', function(){
           expect($location.url()).not.toBe('');
       });
        
       it('should make home class true if on homepage', function(){
            expect($scope.homeclass).toBe(true);
       });

});
    
   describe('services unit tests', function(){   
      
      describe('mainData servic tests', function(){   
      
            it('should get http and return json object', inject(function(mainData){
                $httpBackend.flush();
                    spyOn(mainData, 'responseFunction').and.returnValue(returnData);     
                        mainData.responseFunction(); 
                    expect(mainData.responseFunction()).toEqual(returnData);
                expect(mainData.responseFunction()[0].title).toBe('CONTACT');
            }));
      
      });  
      
      describe('rest of the services test that have mainData service as a dependency', function(){   
          
        beforeEach(inject(function(_$rootScope_, _menuData_, _contentData_, _mainData_, _menuCurrentPhone_, _menuDataPhone_, _$httpBackend_){
       
            $scope=_$rootScope_.$new();
            menuData=_menuData_;
            contentData=_contentData_;
            $httpBackend=_$httpBackend_;
            mainData=_mainData_;
            menuDataPhone=_menuDataPhone_;
            menuCurrentPhone=_menuCurrentPhone_; 
            $httpBackend.flush();
      }));
            
          describe('menuData service tests', function(){   
              var response;
              it('call mainData and resovle the promise', function(){

                 spyOn(mainData, 'responseFunction').and.callFake(function(){
                      return {
                        then: function() { 
                            response=sampleHTML;
                            return response; 
                        }
                      };
                });        
                menuData.getMenuItems();
                expect(mainData.responseFunction).toHaveBeenCalled();            
                expect(response).toBe(sampleHTML);            
            });  
         });              
        
         describe('contentData service tests', function(){   
              var response;
              it('call mainData and resovle the promise', function(){
                 spyOn(mainData, 'responseFunction').and.callFake(function(){
                      return {
                        then: function() { 
                            response=sampleHTML;
                            return response; 
                        }
                      };
                });        
                contentData.getContent();
                expect(mainData.responseFunction).toHaveBeenCalled();            
                expect(response).toBe(sampleHTML);            
            });  
         });               
        
         describe('menuDataPhone service tests', function(){   
              var response;
              it('call mainData and resovle the promise', function(){
                 spyOn(mainData, 'responseFunction').and.callFake(function(){
                      return {
                        then: function() { 
                            response=sampleHTML;
                            return response; 
                        }
                      };
                });        
                menuDataPhone.getMenuItemsPhone();
                expect(mainData.responseFunction).toHaveBeenCalled();            
                expect(response).toBe(sampleHTML);            
            });  
         });            
        
         describe('menuCurrentPhone service tests', function(){   
              var response;
              it('call mainData and resovle the promise', function(){
                 spyOn(mainData, 'responseFunction').and.callFake(function(){
                      return {
                        then: function() { 
                            response=4;
                            return response; 
                        }
                      };
                });        
                menuCurrentPhone.getCurrentMenuItemPhone();
                expect(mainData.responseFunction).toHaveBeenCalled();            
                expect(response).toBe(4);            
            });  
         });            
        
      });
    
  }); 
    
 describe('directives unit tests', function(){  
     
     beforeEach(inject(function(_$rootScope_, _mainData_, _$compile_){
         $scope=_$rootScope_.$new();
         $compile=_$compile_;
         $.fx.off = true;  
         $httpBackend.flush();
     })); 
                
     describe('menu directive tests', function(){ 
         
          it('should get value of the html string from the scope and assabmle the menu html', function(){
             var element=$compile(menuEl)($scope);
                     appendSetFixtures(element);
                        $scope.menuHTML=sampleHTML;
                     $scope.$digest(); 
                 expect(element.html()).toBe(sampleHTML);
          });
         
     }); 
     
     describe('wholeContent directive tests', function(){ 
         
          it('should get value of the html string from the scope and assabmle the content html', function(){
             var element=$compile(contentEl)($scope);
                     appendSetFixtures(element);
                        $scope.contentHTML=sampleHTML;
                     $scope.$digest(); 
                 expect(element.html()).toBe(sampleHTML);
          });
         
     });        
     
     describe('menuItemsHover directive tests', function(){ 
         
          it('should bind hover on menu items', function(){
             var wrapper=$compile(hovEl)($scope),
                     element=wrapper.find('p[class^="pro_p"] a');
                         appendSetFixtures(wrapper);
                             element.triggerHandler('mouseenter');
                             expect(element.parent().prev().children().attr('src')).toBe(imgExample);
                         element.triggerHandler('mouseleave');
                     expect(element.parent().prev().children()[0].attributes.length).toBe(0);
          });
         
     });       

     describe('extraMargin directive tests', function(){ 
         
          it('should add mar_head class to headlines', function(){
              var wrapper=$compile(exMar)($scope),
                      element=wrapper.find('.main_head');
                        appendSetFixtures(wrapper);
                      expect(element.hasClass('main_head')).toBe(true);
                  expect(element.parent().hasClass('mar_head')).toBe(true);
           });
         
     });    

     describe('spinnerGone directive tests', function(){ 
         
          it('should add displaynone class to the spinner', function(){
              var element=$compile(spinEl)($scope);
                  appendSetFixtures(element);
                      spyOn(mainData, 'responseFunction').and.callFake(function(){
                              return {
                                then: function() { 
                                    element.addClass('displaynone');
                                }
                              };
                        });    
                        $httpBackend.flush();
                   mainData.responseFunction().then(); 
              expect(element.hasClass('displaynone')).toBe(true);
           });
         
     });  
     
     describe('iframe directive tests', function(){ 
         
          it('should set the width of the iframe', function(){
              var element=$compile(ifraEl)($scope),
                      imgwi=element.find('iframe').attr('width'),
                          imghi=element.find('iframe').attr('height'),
                              win_height=$scope.getWindowDimensions().h; 
                              appendSetFixtures(element);
                          $scope.$digest();
                      expect(element.css('width')).toBeDefined();
                  expect($scope.imgparwi+3).toBeCloseTo(((win_height*0.7)*imgwi)/imghi+3, 0);
           });
         
     });  
 
     describe('imgFix directive tests', function(){ 
         
          it('should set the width of the image', function(){
              var element=$compile(imgEl)($scope),
                      imgwi=element.find('img').attr('width'),
                          imghi=element.find('img').attr('height'),
                              win_height=$scope.getWindowDimensions().h,
                              expectedWidth=(((win_height*0.7)*imgwi)/imghi);
                              appendSetFixtures(element);
                          $scope.$digest();
                      expect(element.css('width')).toBeDefined();
                 expect(element.width()).toBeCloseTo(expectedWidth+22, 0);
                 expect(element.find('.wp-caption').width()).toBeCloseTo(expectedWidth, 0);
           });
         
     });  
     
     describe('textBlock directive tests', function(){ 
         
          it('should set the width of the text box', function(){
            var element=$compile(textEl)($scope);
                    appendSetFixtures(element);
                        $scope.$digest();
                            expect(element.find('br').length).toBe(0);
                        expect(element.find('.specialps').length).toBeGreaterThan(0);
                    expect($scope.n_times).toBe(1);
                expect(element.width()).toBe(440);
           });
         
     });      
     
     describe('textLanguage directive tests', function(){ 
            
          it('should reassamble the text and show more text on read more clicked', function(){
          var wrapper=$compile(cmyk)($scope),
              element=wrapper.find('.text_box'),
              read_more=element.find('.english .readmore');
                appendSetFixtures(wrapper);


              expect(element.find('span').css('text-decoration')).toBe('none');
              expect(element.find('.main_head').next().hasClass('english')).toBe(true);
              expect(element.find('.main_head').next().next().hasClass('german')).toBe(true);
              
                  expect(read_more.next()).toBeHidden();
                  expect(read_more.css('display')).toBe('block');

                       read_more.trigger('click');
              
              expect(read_more).toBeHidden();
              expect(read_more.next().css('display')).toBe('block');
              expect(read_more.prev()).toBeHidden();
              expect(wrapper.find('.english .more')).toBeHidden();
           });
         
     });       

     describe('languageButton directive tests', function(){ 
            
          it('should change the language when clicked clicked', function(){
          var element=$compile(elLanText)($scope),
              button=element.find('div'),
              readMore=element.find('.readmore');
              appendSetFixtures(element);
              $scope.$apply();
              expect(button.text()).toBe('de');
              expect(readMore.text()).toBe('read more');

                  button.triggerHandler('click'); // 1

                      expect(button.text()).toBe('en');
                      expect($scope.count).toBe(1);
                      expect(element.find('.english').hasClass('displaynone')).toBe(true);
                      expect(element.find('.german').hasClass('displaynone')).toBe(false);
                      expect(readMore.text()).toBe('mehr lesen');

                  button.triggerHandler('click'); // 2
              
              expect(button.text()).toBe('de');
              expect($scope.count).toBe(0); 
              expect(element.find('.english').hasClass('displaynone')).toBe(false);
              expect(element.find('.german').hasClass('displaynone')).toBe(true);
              expect(readMore.text()).toBe('read more');
              
           });
         
     }); 
     
     describe('lastMargin directive tests', function(){ 
            
          it('should give bigger margine to the last headline', function(){
          var element=$compile(lastMarg)($scope),
                  windowWidth=$scope.getWindowDimensions().w,
                    last=element[0].childNodes[element[0].childNodes.length-1];
                      appendSetFixtures(element);
                      $scope.$apply();
                  expect($(last.childNodes[0]).hasClass('main_head')).toBe(true);
              expect($(last).css('margin-right')).toEqual(windowWidth-660+'px');
           });
         
     }); 
     
 });     

});