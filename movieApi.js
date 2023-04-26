// http://www.omdbapi.com/?i=tt3896198&apikey=1e6b4e23
// старый способ запроса AJAX
// let xhr = new XMLHttpRequest();
// xhr.open('GET','http://www.omdbapi.com/?s=batman&apikey=1e6b4e23', false);
// xhr.send();
// console.log(xhr.response);
// старый способ запроса AJAX




const apiKey = '1e6b4e23';
const apiUrl ='http://www.omdbapi.com/';

export async function getMovieTitle(title, page=1) {
    let response = await fetch(`${apiUrl}?s=${title}&apikey=${apiKey}&page=${page}`)
    console.log('попал');
   let json = await response.json(); // ждём пока идёт запрос, потом ждём пока респонс сконвертируется в json
    return json; // возвращаем json
    
}