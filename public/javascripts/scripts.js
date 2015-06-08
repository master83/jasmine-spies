var myObj = {
	someMethod: function(){
		// return "Hello There";

		$.get('someFile.txt', function(data){
			return data;
		});
	}
};

$.fn.asyncCall = function(){
	return this.each(function(){
		var el = $(this);
		$.get("someFile.html", function(data){
			el.html(data);
		});
	});
};