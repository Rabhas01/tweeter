$(document).ready(function() {
  //hidden error messages
  $('#empty').hide();
  $('#exceed').hide();

  $(".submitForm").submit(function(event) {
    let query = $(this).serialize();
    let tweetLength = $('#tweet-text').val().length;
    if (tweetLength === 0) {
      event.preventDefault();
      $('#exceed').hide();
      $('#empty').slideDown(500);
    } else if (tweetLength > 140) {
      event.preventDefault();
      $('#empty').hide();
      $('#exceed').slideDown(500);
    } else {
   
      event.preventDefault();
      $.ajax({
        method: "POST",
        url: "/tweets/",
        data: query
      }).then(function(response) {
      // console.log(response)
        $('#tweet-text').val('');
        $('.counter').val(140);
        $('.tweet-container').empty();
        loadTweets(response);
      });
    }
  });

  // escapes the input text to avoid cross-site scripting attacks -> used in createTweetElement
  const escape = function(str) {
  //creates a new element to append the text to
    let div = document.createElement("div");
    // appends the text to the element using createTextNode to escape unsafe characters
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    const time = timeago.format(tweetData.created_at);
    const tweet = $(`
      <article class="tweet">
        <header> 
          <span class="name"> 
          <img src='${escape(tweetData.user.avatars)}'>
            ${escape(tweetData.user.name)}
          </span>
          <p class="tag">${escape(tweetData.user.handle)}</p>
        </header>
        <p class="text">${escape(tweetData.content.text)}</p>
        <footer> 
          <span class="days-ago">
            ${escape(time)}
          </span>
          <span class="icon">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i> 
          </span>
        </footer>
      </article>`);
    return tweet;
  };

  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    for (let tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      $('.tweet-container').append($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets/",
      dataType: 'JSON'
    }).then(function(data) {
      renderTweets(data.reverse());
    });
  };

  loadTweets();

});