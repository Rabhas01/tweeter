// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function () {

  $( ".submitForm" ).submit(function( event ) {
    let query = $( this ).serialize();
    let tweetLength = $('#tweet-text').val().length
    if (tweetLength === 0) {
      event.preventDefault()
      alert("uh oh, an error was encountered.\nCannot post an empty tweet\nPlease say something to post.")
    } else if (tweetLength > 140) {
      event.preventDefault()
      alert("Oops!\nYou have exceeded the 140 character limit\nPlease shorten your tweet");
    } else {
   
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: query 
    }).then(function(response) {
      // console.log(response)
      $('#tweet-text').val('');
      $('.tweet-container').empty();
      loadTweets(response);
    });
}
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

// renderTweets(data);

const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "/tweets/",
    dataType: 'JSON'
  }).then(function(data) {
    renderTweets(data)
  });
}

loadTweets()

});

