const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmZiNGNjMDVlY2UzYmVlYzA5YzFlZWE0MTA1YjY1ZSIsInN1YiI6IjY2MjY0MWM5NjNlNmZiMDE3ZWZjZDU5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iV4EB4KeKrhxS9-JgkN2hfI9gkbQb5GmenzTWvEdv8A'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));