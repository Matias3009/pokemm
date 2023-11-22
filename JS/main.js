let pokemones = [];
const urld = "../pokemons.json";
let containerC;

var quesoquesoqueso22 = "jhdskjajk";
//.------------------------------------------
async function reqq(){
    try{
        const response = await fetch(urld);

        if(response.status === 404){
            throw new Error("Error 404!");
        }

        let data = await response.json();
        return data;
    }
    catch(error){
        console.log("Error al leer <func reqq>!");
        return ("Error de lectura!");
    }
}


function abili(num){
    let txt = "<br>";
    for (let i = 0; i < pokemones[num].abilities.length; i++) {
        const element = pokemones[num].abilities[i];
        txt += ("&nbsp &nbsp-"+element+"<br>");
    }
    return txt;
}
function debili(num){
    let txt = "<br>";
    for (let i = 0; i < pokemones[num].weakness.length; i++) {
        const element = pokemones[num].weakness[i];
        txt += ("&nbsp &nbsp-"+element+"<br>");
    }
    return txt;
}

function typesns(num){
    let txt = "<br>";
    for (let i = 0; i < pokemones[num].type.length; i++) {
        const element = pokemones[num].type[i];
        txt += ("&nbsp &nbsp-"+element+"<br>");
    }
    return txt;
}

function displayAll(nt){
    for (let i = 0; i < 151; i++) {
        const element = nt[i];
        containerC.innerHTML += `<div class="cardd ${nt[i].type[0]}"><div style="grid-row:1;">
        <h2>${nt[i].name}</h2><br>
        <img src="${nt[i].ThumbnailImage}">
        </div><div class="description" style="grid-row:2;">
        Name: ${nt[i].name}<br>
        <div class="contText">
        Pokedex n°: ${nt[i].number}<br>
        Tipo/s: ${typesns(i)}
        Altura promedio: ${nt[i].height}cm<br><br>
        Habilidades: ${abili(i)}<br>
        Debilidades: ${debili(i)}<br>
        </div>
        </div>
        </div>`;
        
    }
}
function filt(nd){
    let nombrespk = {};
    nd = nd.filter(function(po){
        if(!nombrespk[po.name]){
            nombrespk[po.name] = true;
            return true;
        }
        return false;
    });
    return nd
}

//console.log(reqq());

async function llamada(){
    const datatt = await reqq();

    //filtrar:
    let filters = filt(datatt);
    pokemones = filters
    console.log(filters);

    //display:
    displayAll(filters);
}

function loadd(){
    //defs:
    containerC = document.getElementById("contt");

    //calls:
    llamada();
};
