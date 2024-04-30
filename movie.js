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
  // 14번줄까지 tdmb 세팅 코드. 


  //html 요소 가져오기
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const movieContainer = document.getElementById('movieContainer');

  // 검색 입력란에 포커스
  searchInput.focus();

  // 검색 버튼 눌렀을 때 이벤트 처리
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query !== '') {
      searchMovies(query);
    }
  });

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
    // documentFragment를 생성.

    movieContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    movies.forEach(movie => {
      const {
        id,
        title,
        overview,
        poster_path,
        vote_average
      } = movie;
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
        movies.map(movie => {
          if (movie.id === id) {
            alert(`선택한 영화 ID: ${movie.id}`);
          }
        });
      });

      // fragment에 movieCard를 추가.
      fragment.appendChild(movieCard);
    });

    // movieContainer에 한 번에 fragment를 추가.
    movieContainer.appendChild(fragment);
  };

  // Enter 키로 검색 실행
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });

  // TypeIt 효과 적용
  new TypeIt("#multipleStrings", {
    strings: ["내일 배움 캠프", "영화 검색 사이트"],
    speed: 50,
    waitUntilVisible: true,
  }).go();
});


// let, const 만을 사용하여 변수 선언 O
// 화살표 함수 사용 O
// 배열 메소드 예시 중 2개 이상 사용 O (forEach, map)
// DOM 제어 - 예시 목록 중 2개 이상 사용  O (document.addEventListener, document.createElement)
/*대소문자 관계 없이 검색 가능하도록 하기 O*/
/*키보드 엔터키를 입력해도 검색버튼 클릭한 것과 동일하게 검색 실행 O*/