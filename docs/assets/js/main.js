"use strict";const showsPainted=document.querySelector(".js_showlistcontainer"),searchBtn=document.querySelector(".js_searchbtn"),searchText=document.querySelector(".js_searchtext"),favoriteShowsPainted=document.querySelector(".js_favoriteshowscontainer"),favoritesResetBtn=document.querySelector(".js_resetfavsbtn");let showsList=[],showsImages=[],showsTitles=[],showsId=[],listenedItem=[],favoriteShows=[],favoriteShowsImages=[],favoriteShowsTitles=[],favoritesShowsId=[];function paintFavorites(){let e="";for(const s of favoriteShows)favoriteShowsImages=s.show.image,favoriteShowsImages=null===favoriteShowsImages?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":s.show.image.medium,favoriteShowsTitles=s.show.name,favoritesShowsId=s.show.id,e+=`<li class="favorite_container"   id="${favoritesShowsId}">`,e+=`<img class="favorite_image" src="${favoriteShowsImages}" alt="${favoriteShowsTitles}"/>`,e+=`<h2 class="favorite_title">${favoriteShowsTitles}</h2>`,e+='<button class="favorite__delbtn js_favoritedelbtn"><i class="fas fa-times favorite__delbtn--icon"></i></button>',e+="</li>";favoriteShowsPainted.innerHTML=e;document.querySelector(".favorite__delbtn").addEventListener("click",handleDelFavBtn)}function handleListenedContainers(e){const s=e.currentTarget,t=s.querySelector(".js_showtitle"),o=parseInt(e.currentTarget.id),a=showsList.find(e=>e.show.id===o),i=favoriteShows.findIndex(e=>e.show.id===o);-1===i?(favoriteShows.push(a),s.classList.add("selected"),t.classList.add("text_color")):(favoriteShows.splice(i,1),s.classList.remove("selected"),t.classList.remove("text_color")),paintFavorites(),saveFavoritesInLocalStorage()}function saveFavoritesInLocalStorage(){const e=JSON.stringify(favoriteShows);localStorage.setItem("favoriteShows",e)}function listenShows(){const e=document.querySelectorAll(".js_showcontainer");for(listenedItem of e)listenedItem.addEventListener("click",handleListenedContainers)}function paintShows(){let e="";for(const s of showsList)showsImages=s.show.image,showsImages=null===showsImages?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":s.show.image.medium,showsTitles=s.show.name,showsId=s.show.id,e+=`<li class="show_container js_showcontainer"  id="${showsId}">`,e+=`<img class="image js_showimage" src="${showsImages}" alt="${showsTitles}"/>`,e+=`<h4 class="showtitle js_showtitle">${showsTitles}</h4>`,e+="</li>";showsPainted.innerHTML=e,listenShows()}function handleSearchShow(e){e.preventDefault();const s=searchText.value;fetch("//api.tvmaze.com/search/shows?q="+s).then(e=>e.json()).then(e=>{showsList=e,paintShows()})}function getFavoritesFromLocalStorage(){const e=localStorage.getItem("favoriteShows");if(null!==e){const s=JSON.parse(e);favoriteShows=s,paintFavorites()}}function handleDelFavBtn(e){const s=e.currentTarget.parentElement.id,t=favoriteShows.findIndex(e=>e.show.id===parseInt(s));favoriteShows.splice(t,1),saveFavoritesInLocalStorage(),paintFavorites()}function handleFavoritesResetBtn(){const e=favoriteShows.length;favoriteShows.splice(0,e),localStorage.removeItem("favoriteShows"),paintFavorites()}searchBtn.addEventListener("click",handleSearchShow),getFavoritesFromLocalStorage(),favoritesResetBtn.addEventListener("click",handleFavoritesResetBtn);