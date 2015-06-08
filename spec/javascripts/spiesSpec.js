describe('Learning about spies', function() {
	beforeEach(function(){
		jasmine.Ajax.install();
	});

	afterEach(function(){
		jasmine.Ajax.uninstall();
	});

	it('replaces the function it is spying on', function() {
		
		spyOn(myObj, 'someMethod').and.callFake(function(){
			return "Hello There";
		});

		expect(myObj.someMethod()).toBe("Hello There"); //Ajax method is being called here. and its not sure when it will return the result. So use spyOn
	});

	it('makes async calls easier to work with', function() {
		var doneFn = jasmine.createSpy("success");
      	setFixtures(sandbox());

		var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function(args) {
	        if (this.readyState == this.DONE) {
	          doneFn(this.responseText);
	          $("#sandbox").html(this.responseText);
	        }
	    };

	    xhr.open("GET", "/some/cool/url");
      	xhr.send();

      	expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
      	expect(doneFn).not.toHaveBeenCalled();

      	jasmine.Ajax.requests.mostRecent().respondWith({
      		"status": 200,
      		"contentType": "text/plain",
      		"responseText": "<li>one</li><li>two</li><li>three</li>"
      	});

      	expect(doneFn).toHaveBeenCalledWith("<li>one</li><li>two</li><li>three</li>");

      	expect($('#sandbox').find("li").length).toBe(3);
	});
});