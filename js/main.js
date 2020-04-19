'use strict';
const ul = document.querySelector('ul');
const searchtext = document.getElementById('hakuteksti');
const searchbutton = document.getElementById('hakunappi');
const  getTvSerie = async (haku)=>{
    /*const fetchOptions = {
         method: 'POST',
         headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer: sdljhfjasndf4oirhkjg',
         },
         body: JSON.stringify(objekti),
    }*/
    ul.innerHTML = "";
    try {

        const vastaus = await fetch("http://api.tvmaze.com/search/shows?q=" + haku);
        if (!vastaus.ok) throw new Error('jokin meni pieleen');
        const programs = await vastaus.json();
        console.log(programs);

        programs.forEach((serie) => {


            ul.innerHTML += `
        <li>
        <h2>${serie.show.name}</h2>
        <a href="${serie.show.officialSite == null ? 
                serie.show.url : 
                serie.show.officialSite}" >Link to Site</a>
        <img src="${serie.show.image === null ? 
                'http://placekitten.com/320/200':
                serie.show.image.medium}" alt="${serie.show.name}">
        <p>${serie.show.summary}</p>
         </li>`;
        });
    }
    catch(error) {
        console.log(error)
    }
};

searchbutton.addEventListener('click', ()=>{

    getTvSerie(searchtext.value);
});


