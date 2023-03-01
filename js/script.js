/** Récupération des élèments depuis l'API **/

let projets = []; /** variable globale */

function getInfosGallery() {
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        /**console.log("tableau: ", data);**/
        loadInfosGallery(data);
        projets = data;
    })
    .catch((error) => {
        console.log("error :", error);
    });
};
getInfosGallery();

function loadInfosGallery(infos) {
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
  
loadInfosGallery(projets);

const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", function () {
    const tousFiltrees = projets.filter(function (projet) {
        return projet;
    });
    /**console.log("tous", tousFiltrees);**/
    document.querySelector(".gallery").innerHTML = "";
    loadInfosGallery(tousFiltrees);
});

const boutonObjets = document.querySelector(".btn-objets");

boutonObjets.addEventListener("click", function () {
    const objetsFiltrees = projets.filter(function (projet) { /*projets.filter(projet => (projet.categoryId == 1));*/
        return (projet.categoryId == 1);
    });
   /**console.log("objet", objetsFiltrees);**/
   document.querySelector(".gallery").innerHTML = "";
    loadInfosGallery(objetsFiltrees);
});

const boutonAppartements = document.querySelector(".btn-appartements");

boutonAppartements.addEventListener("click", function () {
    const appartementsFiltrees = projets.filter(function (projet) {
        return (projet.categoryId == 2);
    });
   /**console.log("appart", appartementsFiltrees);**/
   document.querySelector(".gallery").innerHTML = "";
    loadInfosGallery(appartementsFiltrees);
});

const boutonHotels = document.querySelector(".btn-hotels");

boutonHotels.addEventListener("click", function () {
    const hotelsFiltrees = projets.filter(function (projet) {
        return (projet.categoryId == 3);
    });
   /**console.log("hotel", hotelsFiltrees);**/
   document.querySelector(".gallery").innerHTML = "";
    loadInfosGallery(hotelsFiltrees);
});
