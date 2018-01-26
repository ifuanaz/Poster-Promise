'use strict';

var templatePoster = function templatePoster(poster) {
    return '\n        <div class="item">\n            <h2 class="item__title">' + poster.Title + '</h2>\n            <img class="item__poster" src="' + poster.Poster + '" alt="no photo">\n            <div class="item__information">\n                <p class="item__type">\n                    <b>Type:</b>\n                    ' + poster.Type + '\n                 </p>\n                <span class="item__year">\n                    <b>Year:</b>\n                    ' + poster.Year + '\n                </span>\n            </div>\n        </div>\n    ';
};

(function () {
    var key = '3a5f52e9';
    var contentPosters = document.getElementById('posters');

    function loadData(url) {
        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url);
            xhttp.onload = function () {
                if (this.statusText === 'OK' && this.status === 200) {
                    var data = JSON.parse(this.response).Search;
                    resolve(data);
                }
            };
            xhttp.onerror = function () {
                reject('Something went wrong!');
            };
            xhttp.send();
        });
    };

    // Make requests to API
    var fantasticFour = loadData('http://www.omdbapi.com/?s=fantastic%20four&apikey=' + key);
    var harryPotter = loadData('http://www.omdbapi.com/?s=harry%20potter&apikey=' + key);
    var turtles = loadData('http://www.omdbapi.com/?s=turtles%20ninja&apikey=' + key);

    Promise.all([fantasticFour, harryPotter, turtles]).then(function (data) {
        for (var i in data) {
            data[i].forEach(function (poster) {
                return contentPosters.innerHTML += templatePoster(poster);
            });
        }
    }).catch(function (error) {
        return contentPosters.innerHTML = '<div class="error">' + error + '</div>';
    });
})();