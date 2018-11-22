let formInput = document.getElementById('searchForm');
formInput.addEventListener('submit', getMovies);

function getMovies(e){
    //form input text
    let movieName = e.target[0].value;

    //get data from external api
    axios.get('http://www.omdbapi.com?s='+movieName+'&apikey=thewdb')
        .then(response => {
            //get movies from response
            let movies = response.data.Search;
            let output = '';

            movies.forEach(movie => {
                output +=
                `<div class="text-center">
                    <img src="${movie.Poster}" alt="Image not found">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>`;
            });
            //add to index.html
            document.getElementById('movies').innerHTML = output;

      })
        .catch(err => console.log(err));
    e.preventDefault();
}




















