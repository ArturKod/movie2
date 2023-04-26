import * as movieApi from "./movieApi.js";
let tPages;
let cPages = 1;
let sLimit = 1; // количество страниц слева и справа(по одной)
let title;
document.forms.myForm.addEventListener('submit', async function () {
    event.preventDefault();
    title = document.querySelector('#nameFilm').value
   let movieData = await movieApi.getMovieTitle(title, cPages); // получаем и используем внешний js файл
   
   console.log(movieData); 
   tPages = Math.ceil(movieData.totalResults/10);
   console.log(tPages);

   let pag = {
    totalPages: tPages,
    currentPages: cPages,
    sizeLimit: sLimit
   }

   pagination(pag);
   drawMovie(movieData, true);
   document.querySelector('nav').hidden = false;
   document.forms.myForm.reset();
})
function drawMovie(movieData, isAdd) {
  if (!isAdd) {
    document.querySelector('.row').innerHTML = '';
  }
  for (const movie of movieData.Search) {
    document.querySelector('.row').insertAdjacentHTML('afterbegin',`

     <div class="col-4">
     <img src="${movie.Poster}" onerror="event.target.src='./img/no_img.png'"  class="card-img-top" alt="...">
     <div class="card-body">
     <h4>${movie.Title}</h4>
       <p class="card-text"> ${movie.Year}</p>
       </div>
    `) ;
   }
//   for (let i = 0; i < movieData.Search.length - 1; i++) {
//     document.querySelector('.row').insertAdjacentHTML('afterbegin', `
//     <div class="col-4">
//  <img src="${movie.Poster}" onerror="event.target.src='./img/no_img.png'"  class="card-img-top" alt="...">
//  <div class="card-body">
//  <h4>${movie.Title}</h4>
//    <p class="card-text"> ${movie.Year}</p>
//    </div>
//  `);

// }
}




function pagination(pag) {
  document.querySelector('.pagination'). innerHTML = '';  // чистим ul, чтобы перезаписать pagination, иначе сумируется с предыдущим результатом
  console.log(pag);
  if (pag.currentPages > 1) {
    document.querySelector('.pagination').insertAdjacentHTML('beforeend', `
      <li class="page-item"> <a class="page-link" href="#">Previous</a></li>
      `) 
  }
  for (let i = pag.currentPages - pag.sizeLimit; i <= pag.currentPages + pag.sizeLimit; i++){
    if (i >= 1 && i <= pag.totalPages) {
      if (i == pag.currentPages) {
      document.querySelector('.pagination').insertAdjacentHTML('beforeend', `
      <li class="page-item"><a class="page-link active" href="#">${i}</a></li>
      `) 
      } else {
      document.querySelector('.pagination').insertAdjacentHTML('beforeend', `
      <li class="page-item"><a class="page-link" href="#">${i}</a></li>
      `) 
      }
    }
  }
  if (pag.currentPages < pag.totalPages) {
    document.querySelector('.pagination').insertAdjacentHTML('beforeend', `
      <li class="page-item"> <a class="page-link" href="#">Next</a></li>
      `) 
  }
    }

document.querySelector('nav').addEventListener('click', async function (params) {
  if(event.target.innerHTML == 'Next') {
    cPages++;
  } else if (event.target.innerHTML == 'Previous') {
    cPages--;
  } else {
    cPages = +(event.target.innerHTML);
  }
    // this.innerHTML по умолчанию текст, поэтому форматируем в тип number
  console.log(typeof(cPages));  // проверяем тип данных в переменной
  let movieData = await movieApi.getMovieTitle(title, cPages); // получаем и используем внешний js файл

  let pag = {
    totalPages: tPages,
    currentPages: cPages,
    sizeLimit: sLimit
   }

   pagination(pag);
   drawMovie(movieData, false);
})