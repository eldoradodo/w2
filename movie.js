document.addEventListener('DOMContentLoaded', function () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmZiNGNjMDVlY2UzYmVlYzA5YzFlZWE0MTA1YjY1ZSIsInN1YiI6IjY2MjY0MWM5NjNlNmZiMDE3ZWZjZDU5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iV4EB4KeKrhxS9-JgkN2hfI9gkbQb5GmenzTWvEdv8A'
    }
  };

  // 영화 정보 불러오기
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => displayMovies(data.results))
    .catch(err => console.error(err));

  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const movieContainer = document.getElementById('movieContainer');

  // 검색 입력란에 포커스
  searchInput.focus();

  // 검색 함수
  function searchMovies(query) {
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmZiNGNjMDVlY2UzYmVlYzA5YzFlZWE0MTA1YjY1ZSIsInN1YiI6IjY2MjY0MWM5NjNlNmZiMDE3ZWZjZDU5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iV4EB4KeKrhxS9-JgkN2hfI9gkbQb5GmenzTWvEdv8A';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

    fetch(apiUrl, options)
      .then(response => response.json())
      .then(data => {
        displayMovies(data.results);
      })
      .catch(error => console.log('Error:', error));
  }

  // 영화 정보를 화면에 표시하는 함수
  function displayMovies(movies) {
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
      const { id, title, overview, poster_path, vote_average } = movie;
      const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/150';

      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h3>${title}</h3>
        <p>${overview}</p>
        <p>평점: ${vote_average}</p>
      `;
      movieCard.addEventListener('click', () => {
        alert(`선택한 영화 ID: ${id}`);
      });
      movieContainer.appendChild(movieCard);
    });
  }

  // 검색 버튼 눌렀을 때 이벤트 처리
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query !== '') {
      searchMovies(query);
    }
  });

  // Enter 키로 검색 실행
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });
});
