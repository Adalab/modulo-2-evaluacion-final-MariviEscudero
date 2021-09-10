'use strict';
const showsPainted = document.querySelector('.js_showcontainer');
const searchBtn = document.querySelector('.js_searchbtn');
const searchText = document.querySelector('.js_searchtext');

let showsList = [];
let showsImages = [];
let showsTitles = [];

//funcion buscar series

function handleSearchShow(event){
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

//funcion para pintar imagenes y titulos

function paintShows(){
  let html = '';
  for(const showItem of showsList){
    showsImages = showItem.show.image;
    if(showsImages === null){
      showsImages = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    }else{
      showsImages = showItem.show.image.medium;
    }
    showsTitles = showItem.show.name;
    html += '<li class="show_container">';
    html += `<img class="image" src="${showsImages}" alt="${showsTitles}"/>`;
    html += `<h2 class="showtitle">${showsTitles}</h2>`;
    html += '</li>';
  }
  showsPainted.innerHTML = html;
}

//funcion para seleccionar favoritos

