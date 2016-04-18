describe('ninalieven.net protractor e2e tests', function() {
  
beforeEach(function(){
browser.get('http://ninalieven.net/');    
});
    
var page,
    textForm=function(text){
        return text.replace(/\s+/g, '-').toLowerCase();
    }
    
     it('click on all menu items and change url', function() {

        element(by.css('html body')).allowAnimations(false);
        expect(browser.getTitle()).toEqual('Nina Lieven');

        element.all(by.css('.projects')).each(function(element){
            element.all(by.css('p[class^="pro_p"] a')).each(function(element, index) {
                   element.getText().then(function(text) {
                        element.click();
                            expect(browser.getCurrentUrl()).toBe('http://ninalieven.net/' + textForm(text) )  
                        pege=textForm(text);
                    return page;
                   });
                   element.all(by.css('.posts p a')).each(function(element, index) {
                       element.getText().then(function(text) {
                            element.click();
                                expect(browser.getCurrentUrl()).toBe('http://ninalieven.net/' + page + '/' + textForm(text))  
                       });
                    });    
            }); 
         }); 

     });

    it('animates the page', function() {
  
        element(by.css('#surface-spring p a')).click().then(function(){
            expect(browser.executeScript('return document.body.scrollLeft')).toEqual(0)           
        });
         element(by.css('.projects.invisible-spring p[class^="pro_p"] a')).click().then(function(){
            expect(browser.executeScript('return document.body.scrollLeft')).toBeGreaterThan(2000)           
        });

    });

});