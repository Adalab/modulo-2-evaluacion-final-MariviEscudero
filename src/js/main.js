'use strict';
const showsPainted = document.querySelector('.js_showlistcontainer');
const searchBtn = document.querySelector('.js_searchbtn');
const searchText = document.querySelector('.js_searchtext');
const favoriteShowsPainted = document.querySelector('.js_favoriteshowscontainer');


let showsList = [];
let showsImages = [];
let showsTitles = [];
let showsId = [];
let listenedItem = [];
let favoriteShows = [];
let favoriteShowsImages = [];
let favoriteShowsTitles = [];
let favoritesShowsId = [];

//funcion para pintar favoritos

function paintFavorites() {
  let html = '';
  for (const favShow of favoriteShows) {
    favoriteShowsImages = favShow.show.image;
    if (favoriteShowsImages === null) {
      favoriteShowsImages =
        'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      favoriteShowsImages = favShow.show.image.medium;
    }
    favoriteShowsTitles = favShow.show.name;
    favoritesShowsId = favShow.show.id;
    html += `<li class="favorite_container"   id="${favoritesShowsId}">`;
    html += `<img class="favorite_image" src="${favoriteShowsImages}" alt="${favoriteShowsTitles}"/>`;
    html += `<h2 class="favorite_title">${favoriteShowsTitles}</h2>`;
    html += '<button class="favorite__delbtn js_favoritedelbtn"><i class="fas fa-times favorite__delbtn--icon"></i></button>';
    html += '</li>';
  }
  favoriteShowsPainted.innerHTML = html;
  const favoritesDelBtn = document.querySelector('.favorite__delbtn');
  favoritesDelBtn.addEventListener('click', handleDelFavBtn);
}

//funcion para seleccionar favoritos

function handleListenedContainers(ev) {
  const selectedShowContent = ev.currentTarget;
  const selectedShowTitle = selectedShowContent.querySelector('.js_showtitle');
  const selectedShow = parseInt(ev.currentTarget.id);
  const contentClicked = showsList.find((showItem) => {
    return showItem.show.id === selectedShow;
  });
  const indexOfContentClicked = favoriteShows.findIndex((showItem) => {
    return showItem.show.id === selectedShow;
  });
  if (indexOfContentClicked === -1) {
    favoriteShows.push(contentClicked);
    selectedShowContent.classList.add('selected');
    selectedShowTitle.classList.add('text_color');
  } else {
    favoriteShows.splice(indexOfContentClicked, 1);
    selectedShowContent.classList.remove('selected');
    selectedShowTitle.classList.remove('text_color');
  }
  paintFavorites();
  saveFavoritesInLocalStorage();
}


//funcion para almacenar favoritos en localstorage

function saveFavoritesInLocalStorage() {
  const transformFavoritesArray = JSON.stringify(favoriteShows);
  localStorage.setItem('favoriteShows', transformFavoritesArray);
}

//funcion para escuchar favoritos de series

function listenShows() {
  const listenedContainers = document.querySelectorAll('.js_showcontainer');
  for (listenedItem of listenedContainers) {
    listenedItem.addEventListener('click', handleListenedContainers);
  }
}

//funcion para pintar imagenes y titulos

function paintShows() {
  let html = '';
  for (const showItem of showsList) {
    showsImages = showItem.show.image;
    if (showsImages === null) {
      showsImages =
        'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      showsImages = showItem.show.image.medium;
    }
    showsTitles = showItem.show.name;
    showsId = showItem.show.id;
    html += `<li class="show_container js_showcontainer"  id="${showsId}">`;
    html += `<img class="image js_showimage" src="${showsImages}" alt="${showsTitles}"/>`;
    html += `<h4 class="showtitle js_showtitle">${showsTitles}</h4>`;
    html += '</li>';
  }
  showsPainted.innerHTML = html;
  listenShows();
}

//funcion buscar series

function handleSearchShow(event) {
  event.preventDefault();
  const searchTextValue = searchText.value;
  const fetchUrl = `//api.tvmaze.com/search/shows?q=${searchTextValue}`;
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      showsList = data;
      paintShows();
    });
}
searchBtn.addEventListener('click', handleSearchShow);

//sacar datos de favoritos de localStorage

function getFavoritesFromLocalStorage() {
  const localStorageFavorites = localStorage.getItem('favoriteShows');
  if (localStorageFavorites !== null) {
    const favoritesArray = JSON.parse(localStorageFavorites);
    favoriteShows = favoritesArray;
    paintFavorites();
  }
}
getFavoritesFromLocalStorage();

//borrar favoritos

function handleDelFavBtn(ev){
  const favoriteClicked = ev.currentTarget.parentElement.id;
  const contentClickedIndex = favoriteShows.findIndex((favItem) => {
    return favItem.show.id === parseInt(favoriteClicked);
  });
  favoriteShows.splice(contentClickedIndex, 1);
  paintFavorites();
}


