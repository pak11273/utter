// api notes
// returns json
// 5000 requests per hour by api key
// requests must be cached for 24 hours
// image urls are temporary.  **store them to cdn, or have client download to their browser first**
// http 429 error "too many requests" if you go over quota

// params
// https://pixabay/
{
  /* 
key=api
q= search term ie. "yellow+flower"
lang= default: en
category= 
min_width=
min_height=
safesearch=true
page= <paginated page results: default 1>
per_page= <3-200: defaul: 20>

// rate limits
-RateLimit-Limit	The maximum number of requests that the consumer is permitted to make in 30 minutes.
X-RateLimit-Remaining	The number of requests remaining in the current rate limit window.
X-RateLimit-Reset	The remaining time in seconds after which the current rate limit window resets.
*/
}

var API_KEY = "12284340-ae329c7f48e191cb0c76643cd"
var URL =
  "https://pixabay.com/api/?key=" +
  API_KEY +
  "&q=" +
  encodeURIComponent("red roses")
$.getJSON(URL, function(data) {
  if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function(i, hit) {
      console.log(hit.pageURL)
    })
  else console.log("No hits")
})



