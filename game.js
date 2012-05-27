window.Game = new function(){
	this.username = '';
	this.data = [ 
		{
			user: { id: 1234565, username: 'alexishevia' },
			tweets: [
				{ id: 206435331296342000, text: "Este es un tweet de mentira" },
				{ id: 206435331296342354, text: "Follower Test is the shiznit!" },
			]
		},
		{
			user: { id: 7834527, username: 'walexis' },
			tweets: [
				{ id: 206435332126342100, text: "Yo soy el verdadero Alexis Hevia" },
				{ id: 206435331296342354, text: "Follower Test sucks!" },
			]
		}
	]
	this.answers = [
		{ user_id: 1234565, tweet_id: 206435331296342000 },
		{ user_id: 1234565, tweet_id: 206435331296342000 },
		{ user_id: 1234565, tweet_id: 206435331296342000 }
	]

  this.start = function(username) {
    this.username = username;
    $.jsonp({
			url: 'https://api.twitter.com/1/friends/ids.json?callback=?&screen_name=' + this.username,
			success: function(data) {
				var user_ids = data.ids
				var random_ids = this.getRandom(user_ids, 10);
				this.random_ids = random_ids;
      },
      error: function() {
      	alert("There was an error. We couldn't find the people you follow");
      }
		});
	};
		
	this.getTweets = function(user_ids) {
		for(id in user_ids) {
			$.jsonp({
				url: 'https://api.twitter.com/1/statuses/user_timeline.json?&count=10&user_id=' + id
			})
		}
	};
}