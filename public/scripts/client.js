const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function () {

  $( ".submitForm" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    let query = $( this ).serialize();
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: query 
    })
  });

const createTweetElement = function(tweetData) {
  const time = timeago.format(tweetData.created_at)
  const tweet = $(`
  <article class="tweet">
    <header> 
      <span class="name"> 
      <img src='${tweetData.user.avatars}'>
        ${tweetData.user.name}
      </span>
      <p class="tag">${tweetData.user.handle}</p>
    </header>
    <p class="text">${tweetData.content.text}</p>
    <footer> 
      <span class="days-ago">
        ${time}
      </span>
      <span class="icon">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i> 
      </span>
    </footer>
  </article>`);
  return tweet;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(let tweetData of tweets) { 
    const $tweet = createTweetElement(tweetData);
    $('.tweet-container').append($tweet); 
  }
}

renderTweets(data);

});