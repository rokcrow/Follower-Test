window.Game = new function(){
	this.username = '';
	this.data = [ 
		{
			user: { id: 1, username: 'alexishevia' },
			tweets: [
				{ id: 11, text: "Este es un tweet de mentira" },
				{ id: 12, text: "Follower Test is the shiznit!" },
			]
		},
		{
			user: { id: 2, username: 'walexis' },
			tweets: [
				{ id: 21, text: "Yo soy el verdadero Alexis Hevia" },
				{ id: 22, text: "Follower Test sucks!" },
			]
		},
		{
			user: { id: 3, username: 'rogelio' },
			tweets: [
				{ id: 31, text: "Yo no tengo nada que ver con los Alexos" },
				{ id: 32, text: "Tengo otro tweet pa seguir la tradición" },
			]
		}
	]
	this.answers = [
		{ user_id: 1, tweet_id: 11 },
		{ user_id: 2, tweet_id: 21 },
		{ user_id: 3, tweet_id: 31 }
	]

  this.start = function(username) {
    this.username = username;
    var that = this;
    $.jsonp({
			url: 'https://api.twitter.com/1/friends/ids.json?callback=?&screen_name=' + this.username,
			success: function(data) {
				window.data = data;
				var user_ids = data.ids
				var random_ids = that.getRandom(user_ids, 10);
				that.data = that.getData(random_ids);
      },
      error: function() {
      	alert("There was an error. We couldn't find your 'following' list.");
      }
		});
	};
	
	this.getRandom = function (user_ids, cant) {
    var length = user_ids.length;
    var numbers = [];
    var ids = [];
    for (i = 0; i < cant; i++){
        do {
            var n = Math.floor((Math.random()*length)+1); 
            var found = false;
            for (j = 0; j < numbers.length; j++) {
                if (numbers[j] == n) {
                    found = true;
                }
            }
        }while (found);
        ids.push(user_ids[n]);
        numbers.push(n);
    }
    return ids;
  };
		
	this.getData = function(user_ids) {
		var data = [];
		$.each(user_ids, function(index, user_id) {
			var user_data = { user: {}, tweets: [] }
			var url = 'https://api.twitter.com/1/statuses/user_timeline.json?callback=?&count=10&user_id=' + user_id;
			console.log(url);
			$.jsonp({
				url: url,
				success: function(result) {
					console.log('user_timeline success');
					console.log(result);
					user_data.user = {id: result[0].user.id, username: result[0].user.screen_name}
					$.each(result, function(index, tweet) {
						user_data.tweets.push({id: tweet.id, text: tweet.text});
					});
					data.push(user_data);
				},
				error: function(xhr) {
					console.log('user_timeline error');
				}
			});
		});
		return data;
	};
	
	this.grade = function (data, answers) {
    var correct_ans = 0;
    $.each(answers, function(i, answer) {
      $.each(data, function(j, person) {
        if (person.user.id == answer.user_id) {
          $.each(person.tweets, function(k, tweet) {
            if(answer.tweet_id == tweet.id) {
              correct_ans++;
            }
          });
        }
      });
    });
    return correct_ans;
  }
  
  this.grade(this.data, this.answers);

}