/** Récupération des élèments depuis l'API **/

let projets = []; /** variable globale */

function getInfosGallery() {
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        console.log("tableau: ", data);
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
        console.log(imageUrl);
        console.log(title);

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
}
loadInfosGallery();    

