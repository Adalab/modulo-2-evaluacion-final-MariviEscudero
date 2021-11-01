'use strict';
const showsPainted = document.querySelector('.js_showlistcontainer');
const searchBtn = document.querySelector('.js_searchbtn');
const searchText = document.querySelector('.js_searchtext');
const favoriteShowsPainted = document.querySelector(
  '.js_favoriteshowscontainer'
);
const favoritesResetBtn = document.querySelector('.js_resetfavsbtn');

let showsList = [];
let favoriteShows = [];

//funcion para pintar favoritos


function paintFavorites() {
  let html = '';
  for (const favShow of favoriteShows) {
    html += `<li class="main__favorites--showlist"   id="${favShow.id}">`;
    html += `<img class="main__favorites--showlist__image" src="${favShow.showImage}" alt="${favShow.name}"/>`;
    html += `<h2 class="main__favorites--showlist__showtitle">${favShow.name}</h2>`;
    html +=
      '<button class="main__favorites--showlist__delbtn js_favoritedelbtn"><i class="fas fa-times-circle"></i></button>';
    html += '</li>';
  }
  favoriteShowsPainted.innerHTML = html;
  const favoritesDelBtns = document.querySelectorAll('.js_favoritedelbtn');
  for (const favoritesDelBtn of favoritesDelBtns) {
    favoritesDelBtn.addEventListener('click', handleDelFavBtn);
  }
}

//funcion para seleccionar favoritos

function handleListenedContainers(ev) {
  ev.preventDefault();
  const selectedShow = parseInt(ev.currentTarget.id);
  const contentClicked = showsList.find((showItem) => {
    return showItem.id === selectedShow;
  });
  const indexOfContentClicked = favoriteShows.findIndex((showItem) => {
    return showItem.id === selectedShow;
  });
  if (indexOfContentClicked === -1) {
    favoriteShows.push(contentClicked);
  } else {
    favoriteShows.splice(indexOfContentClicked, 1);
  }
  paintFavorites();
  paintShows();
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
  for (const listenedContainer of listenedContainers) {
    listenedContainer.addEventListener('click', handleListenedContainers);
  }
}

function isFavorite(showItem){
  const favoriteFound = favoriteShows.find((fav) =>{
    return fav.id === showItem.id;
  });
  if(favoriteFound === undefined){
    return false;
  }
  else{
    return true;
  }
}

//funcion para pintar imagenes y titulos

function paintShows() {
  let html = '';
  let favClassBg = '';
  let favClassTx = '';
  for (const showItem of showsList) {
    const isFav = isFavorite(showItem);
    if(isFav){
      favClassBg = 'selected';
      favClassTx = 'text_color';
    }else{
      favClassBg = '';
      favClassTx = '';
    }
    html += `<li class="main__showlist--item js_showcontainer ${favClassBg}"  id="${showItem.id}">`;
    html += `<img class="main__showlist--item__image js_showimage" src="${showItem.showImage}" alt="${showItem.name}"/>`;

    html += `<h4 class="main__showlist--item__showtitle js_showtitle ${favClassTx}">${showItem.name}</h4>`;
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
      showsList = data.map(dat =>{
        return({
          id: dat.show.id,
          name: dat.show.name,
          showImage: dat.show.image!==null ? dat.show.image.medium : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV',
        }
        );
      });
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

function handleDelFavBtn(ev) {
  const favoriteClicked = ev.currentTarget.parentElement.id;
  const contentClickedIndex = favoriteShows.findIndex((favItem) => {
    return favItem.id === parseInt(favoriteClicked);
  });
  favoriteShows.splice(contentClickedIndex, 1);
  //removeClassSelected();
  saveFavoritesInLocalStorage();
  paintFavorites();
  paintShows();
}

//boton de reset de favoritos

function handleFavoritesResetBtn() {
  const arrayLength = favoriteShows.length;
  favoriteShows.splice(0, arrayLength);
  localStorage.removeItem('favoriteShows');
  localStorage.removeItem('favoriteSelectedShows');
  paintFavorites();
  paintShows();
}
favoritesResetBtn.addEventListener('click', handleFavoritesResetBtn);
