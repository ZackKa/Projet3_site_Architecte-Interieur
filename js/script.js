/** Récupération des élèments depuis l'API **/

let projets = []; /** variable globale */

function getInfosGallery() {
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        console.log("tableau: ", data);
        loadInfosGallery(data);
        projets = data;
        afficheFiltres();
    })
    .catch((error) => {
        console.log("error :", error);
    });
};
getInfosGallery();

function loadInfosGallery(infos) {
    document.querySelector(".gallery").innerHTML = "";

    for (let i = 0; i < infos.length; i++){
        const imageUrl = infos[i].imageUrl;
        const title = infos[i].title;

        const sectionFiches = document.querySelector(".gallery");
        const pieceElement = document.createElement("figure");

        const image = document.createElement("img");
        image.src = imageUrl;
        const nom = document.createElement("figcaption");
        nom.innerHTML = title;

        sectionFiches.appendChild(pieceElement)
        pieceElement.appendChild(image);
        pieceElement.appendChild(nom);

    }
};

function afficheFiltres (){
    const categories = projets.map(function(projet){
        return projet.category;
    });
    console.log(categories);
    let tmp = [];
    categories.forEach(function(c) {
        if (!tmp.some(function(t){ return t.id == c.id })) tmp.push(c);
    });
    console.log(tmp);
    tmp.forEach(function(category){
        document.querySelector(".filtres").insertAdjacentHTML("beforeend",`<button class="btn-tous" data-categoryId="${category.id}">${category.name}</button>`);
    });
    const boutonsFiltres = document.querySelectorAll(".filtres > button");
    boutonsFiltres.forEach(function(bouton) {
        bouton.addEventListener("click", function (event) {
            const categoryId = event.target.getAttribute("data-categoryId");
            const tousFiltrees = projets.filter(function (projet) {
                return projet.category.id == categoryId || categoryId == 0 ;
            });
            console.log("tous", tousFiltrees);
            loadInfosGallery(tousFiltrees);
        });
    });
};
