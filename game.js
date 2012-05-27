window.Game = new function(){
	this.username = '';
	this.n_to_select = 10;
	this.all_ids;
	this.selected_ids = [];
	this.data = [];
	this.attempts = 0;
	this.answers = [];

  this.start = function(username) {
    this.username = username;
    var that = this;
    $.jsonp({
			url: 'https://api.twitter.com/1/friends/ids.json?callback=?&screen_name=' + this.username,
			success: function(result) {
				that.all_ids = result.ids;
        that.loadData();
      },
      error: function() {
      	alert("There was an error loading the data. Please make sure the username is correct.");
      }
		});
	};

	this.loadData = function() {
		if(this.selected_ids.length < this.n_to_select || this.attempts > 30) {
			this.attempts++;
			var user_id = this.getRandomUserId(this.all_ids, this.selected_ids);
			var that = this;
			$.jsonp({
				url: 'https://api.twitter.com/1/statuses/user_timeline.json?callback=?&count=20&user_id=' + user_id,
				success: function(result) {
					var user_data = { user: {}, tweets: [] }
					user_data.user = {id: result[0].user.id, username: result[0].user.screen_name}
					$.each(result, function(index, tweet) {
						if(tweet.text[0] != '@') {
							user_data.tweets.push({id: tweet.id, text: tweet.text});
						}
					});
					if(user_data.tweets.length > 0) {
						that.selected_ids.push(user_id);
						that.data.push(user_data);
					}
				},
				complete: function(xhr) {
					that.loadData();
				}
			});
		}
		else {
			window.load_users(this.data);
		}
	};
	
	this.getRandomUserId = function(user_ids, used) {
		var length = user_ids.length;
		var user_id = null;
		do {
        var n = Math.floor((Math.random()*length)+1);
        user_id = user_ids[n];
        var found = false;
        for (i = 0; i < used.length; i++) {
          if (used[i] == user_id) { 
          	found = true;
          }
        }
    } while (found);
    return user_id;
	};
	
	this.setAnswer = function(user_id, tweet_id) {
		this.removeAnswer(user_id);
		this.answers.push({ user_id: user_id, tweet_id: tweet_id });
	};
	
	this.removeAnswer = function(user_id) {
	  var that = this;
		$.each(this.answers, function(index, answer) {
		  if (answer.user_id == user_id) {
		    that.answers.splice(index, 1);
		  }
		}); 
	};
	
	this.grade = function () {
    var correct_ans = 0;
    var that = this;
    $.each(this.answers, function(i, answer) {
      $.each(that.data, function(j, person) {
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

}