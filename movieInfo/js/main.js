window.onload = function(){
    let formInput = document.getElementById('searchForm');
    formInput.addEventListener('submit', getMovies);
}

function getMovies(e){
    //form input text
    //let movieName = e.target[0].value;
    let movieName = document.getElementById('searchText').value;
    //get data from external api
    axios.get('http://www.omdbapi.com?s='+movieName+'&apikey=thewdb')
        .then(response => {
            //get movies from response
            let movies = response.data.Search;
            let output = '';

            movies.forEach(movie => {
                output +=
                `<div class="card m-3 bg-secondary text-light" style="width: 15rem;">
                    <img class="card-img-top" src="${movie.Poster}" width="240" height="270">
                    <div class="card-body text-center">
                        <h5 class="card-title">${movie.Title}</h5>
                    </div>
                    <div class="card-footer text-center">
                        <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-primary">Movie Details</a>
                    </div>
                </div>`;
            });
            //add to index.html
            document.getElementById('movies').innerHTML = output;

      })
        .catch(err => console.log(err));
    e.preventDefault();
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=thewdb')
        .then((response) => {
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-4 m-2">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    
                    <div class="col-md-7">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item bg-dark"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item bg-dark"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item bg-dark"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item bg-dark"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item bg-dark"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item bg-dark"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item bg-dark"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row mt-2 mb-2">
                    <div class="col-md-12 text-center">
                        <h3>Plot</h3>
                        <p>${movie.Plot}</p>
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View Imdb</a>
                        <a href="index.html" class="btn btn-light">Go Back To Search</a>
                    </div>
                </div>
            `;

            document.getElementById('movie').innerHTML = output;
        })
        .catch((err) => {
            console.log(err);
        });
}
