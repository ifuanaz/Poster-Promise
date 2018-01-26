const templatePoster = (poster) => {
    return `
        <div class="item">
            <h2 class="item__title">${poster.Title}</h2>
            <img class="item__poster" src="${poster.Poster}" alt="no photo">
            <div class="item__information">
                <p class="item__type">
                    <b>Type:</b>
                    ${poster.Type}
                 </p>
                <span class="item__year">
                    <b>Year:</b>
                    ${poster.Year}
                </span>
            </div>
        </div>
    `;
};

(function() {
    const key = '3a5f52e9';
    const contentPosters = document.getElementById('posters');

    function loadData(url) {
        return new Promise(function (resolve, reject) {
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", url);
            xhttp.onload = function () {
                if(this.statusText === 'OK' && this.status === 200) {
                    let data = JSON.parse(this.response).Search;
                    resolve(data);
                }
            }
            xhttp.onerror = function () {
                reject('Something went wrong!');
            }
            xhttp.send();
        });
    };

    // Make requests to API
    const fantasticFour = loadData(`http://www.omdbapi.com/?s=fantastic%20four&apikey=${key}`);
    const harryPotter = loadData(`http://www.omdbapi.com/?s=harry%20potter&apikey=${key}`);
    const turtles = loadData(`http://www.omdbapi.com/?s=turtles%20ninja&apikey=${key}`);

    Promise.all([
        fantasticFour,
        harryPotter,
        turtles
    ])
    .then(data => {
        for (var i in data) {
            data[i].forEach(poster => contentPosters.innerHTML += templatePoster(poster))
        }
    })
    .catch(error => contentPosters.innerHTML = `<div class="error">${error}</div>`)

}());
