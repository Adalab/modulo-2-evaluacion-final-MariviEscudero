'use strict';
const showsContainer = document.querySelector('.js_showcontainer');
const searchBtn = document.querySelector('.js_searchbtn');
const searchText = document.querySelector('.js_searchtext');

let showsList = [];
let showsImages = [];
let showsName = [];

//funcion buscar series, escribe url del fetch,

function handleSearchShow(event){
  event.preventDefault();
  const searchTextValue = searchText.value;
  const fetchUrl = `//api.tvmaze.com/search/shows?q=${searchTextValue}`;
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showsList = data;
      console.log(showsList);
      for(const shows of showsList ){
        console.log(shows.show.image.original);
        showsImages = shows.show.image.original;
        showsName = shows.show.name;
      }
    });
}
searchBtn.addEventListener('click', handleSearchShow);
