/** Récupération des élèments depuis l'API **/

let projets = []; /** variable globale */

function getInfosGallery() {
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        console.log("tableau: ", data);
        loadInfosGallery(data);
        projets = data;
        getFiltres();
        afficheBoutons ();
        loadModalBody(projets);
        console.log("projet", projets);
    })
    .catch((error) => {
        console.log("error :", error);
    });
};
getInfosGallery();
// Création balises et afficher les projets//
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
// Sert à afficher les filtre dynamiquement//
function getFiltres (){
    fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
        console.log("tableau categories: ", data);
        loadCategories(data);
        addGallery (data);
    })
    .catch((error) => {
        console.log("error :", error);
    });
};

function loadCategories(infos){
    const id = infos.id;
    const name = infos.name;
    console.log("infosss", infos);
    infos.forEach(function(category){
        document.querySelector(".filtres").insertAdjacentHTML("beforeend",`<button data-categoryId="${category.id}">${category.name}</button>`);
    });
    const boutonsFiltres = document.querySelectorAll(".filtres > button");
    boutonsFiltres.forEach(function(bouton) {
        bouton.addEventListener("click", function (event) {
            const categoryId = event.target.getAttribute("data-categoryId");
            const tousFiltrees = projets.filter(function (projet) {
                return projet.category.id == categoryId || categoryId == 0 ;
            });
            console.log("tous2:", tousFiltrees);
            loadInfosGallery(tousFiltrees);
        });
    });
};

const strInfoToken = window.sessionStorage.getItem("dataToken");
let infoToken = JSON.parse(strInfoToken);
//console.log(infoToken)
// Afficher mes boutons modifier//
function afficheBoutons (){
    if (strInfoToken === null){
        document.querySelector(".btn-modif1").style.display = "none";
        document.querySelector(".btn-modif2").style.display = "none";
        document.querySelector(".btn-modif3").style.display = "none";
        document.querySelector(".barre-noir").style.display = "none";
        document.querySelector("a").innerText = "login";
    }else{
        document.querySelector(".filtres").style.display = "none";
        document.querySelector("a").innerText = "logout";
    };
};

//Sert à afficher la modal//
function showModal(show=true) {
    const modal1 = document.querySelector(".modal1");
    if (!show){
        modal1.classList.add("hide");
    }else{
        modal1.classList.remove("hide");
    }
}
//Sert à afficher la deuxième modal//
function showModal2(show=true) {
    const modal2 = document.querySelector(".modal2");
    if (!show){
        modal2.classList.add("hide");
    }else{
        modal2.classList.remove("hide");
    }
}
// modal de suppression //
document.querySelector(".btn-modif3").addEventListener("click", function() {
    showModal(true);
});
document.querySelector(".modal1").addEventListener("click", function() {
    showModal(false);
});
document.querySelector(".modal-content").addEventListener("click", function(e) {
    e.stopPropagation();
});
document.querySelector(".fermerbt").addEventListener("click", function(e) {
    e.preventDefault();
    showModal(false);
});
// modal d'ajout //
document.querySelector(".bouton-ajout").addEventListener("click", function() {
    showModal2(true);
});
document.querySelector(".modal2").addEventListener("click", function() {
    showModal2(false);
    showModal(false);
});
document.querySelector(".modal2-content").addEventListener("click", function(e) {
    e.stopPropagation();
});
document.querySelector(".fermerbt2").addEventListener("click", function(e) {
    e.preventDefault();
    showModal2(false);
    showModal(false);
});
document.querySelector(".retour").addEventListener("click", function(e) {
    e.preventDefault();
    showModal2(false);
    showModal(true);
});

//Charge les projets dans la modal//
function loadModalBody(infos) {
    document.querySelector(".modal-body").innerHTML = "";

    for (let i = 0; i < infos.length; i++){
        const imageUrl = infos[i].imageUrl;
        const titleId = infos[i].id;

        const sectionFiches = document.querySelector(".modal-body");
        const pieceElement = document.createElement("figure");

        const image = document.createElement("img");
        image.src = imageUrl;
        const editer = document.createElement("p");
        editer.innerHTML = "éditer";
        editer.classList.add("editer");
    
        const nom = document.createElement("button");
        nom.setAttribute("class", "fa-solid fa-trash-can btn-poubelle");
        nom.setAttribute("data-id",titleId);
        
        const fleche = document.createElement("p");
        fleche.setAttribute("class", "fa-solid fa-arrows-up-down-left-right fleche")
        
        sectionFiches.appendChild(pieceElement)
        pieceElement.appendChild(image);
        pieceElement.appendChild(nom);
        pieceElement.appendChild(editer);
        pieceElement.appendChild(fleche);
    };
    const suppTravaux = document.querySelectorAll(".btn-poubelle");
    suppTravaux.forEach(function(bouton) {
        bouton.addEventListener("click", function (event) {
            let idImg = event.target.getAttribute("data-id");
            console.log("categoriiiee:", idImg);

            fetch(`http://localhost:5678/api/works/${idImg}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + infoToken.token },
                body: null,
            })
            .then((response) => {
                if(response.ok){
                    // On supprime l'élèment dans le tableau//
                    projets = projets.filter(function(p){
                        return p.id != idImg;
                    });
                    // on rafraichit l'affichage//
                    loadInfosGallery(projets);
                    loadModalBody(projets);
                }
            });
        });
    });   
};

// Ajout projet //

function addGallery (infos){
    const id = infos.id;
    const name = infos.name;
    infos.forEach(function(category){
        const listeElement = document.querySelector("select");
        const categorieListe = document.createElement("option");
        categorieListe.innerHTML = category.name;
        categorieListe.value = category.id;
        //`<option value=${category.id} data-categoryId="${category.id}">${category.name}`;

        listeElement.appendChild(categorieListe);
    });
    
    const ajoutTravaux = document.querySelector(".modal2-content");
    ajoutTravaux.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const chargeUtile = new FormData();
        chargeUtile.append("image", image.files[0]);
        chargeUtile.append("title", title.value);
        chargeUtile.append("category", category.value);
        console.log("image element :", chargeUtile);
        
        // alert("Veuillez compléter tous les champs!")

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Authorization": "Bearer " + infoToken.token },
            body: chargeUtile 
        })
        .then((response) => response.json())
        .then((data) => {
            // Verification des données de l'api //
            console.log("dataAdd :", data);
            if(data.error){
                throw data.error
            }
            // Rafraichissement des listes de projets //
            projets.push(data);
            loadInfosGallery(projets);
            loadModalBody(projets);
            // Réinitialisation du formulaire //
            document.querySelector(".modal2-content").reset();
            verifieChampsOk();
            showImageForm(false);

        })
        .catch((error) => {
            console.log("error :", error);
        });
    });
};

function showImageForm(show=true) {
    const form = document.querySelector(".contenueImg");
    const divImage = document.getElementById("imgSelect");
    if (!show){
        form.classList.remove("hide");
        divImage.classList.add("hide");
    }else{
        form.classList.add("hide");
        divImage.classList.remove("hide");
    }
};
// Verifie que mes champs sont rempli//
function verifieChampsOk(){
    const inputImage = document.querySelector("[name='imageInput']").files[0];
    const inputTitre = document.querySelector("#title").value;
    const inputCategory = document.querySelector("#category").value;
    if (inputImage!== undefined && inputTitre!=="" && inputCategory!==""){
        document.querySelector(".bouton-valider").disabled = false;
    }else{
        document.querySelector(".bouton-valider").disabled = true;
    }
    console.log("inputtest",inputImage, inputCategory, inputTitre);
};
// Sert à afficher l'image et changer l'apparence du bouton valider//
function changerBouton(){
    const changeBouton1 = document.getElementById("image");
    changeBouton1.addEventListener("change", function(event){
        event.preventDefault();
        const image = document.querySelector("[name='imageInput']").files[0];
        const img = document.querySelector(".imageSelectionnee");
        img.src = URL.createObjectURL(image);
        showImageForm(true);
        verifieChampsOk();
        
    });
    const changeBouton2 = document.getElementById("title");
    changeBouton2.addEventListener("change", function(){
        verifieChampsOk();
    });
    const changeBouton3 = document.getElementById("category");
    changeBouton3.addEventListener("change", function(){
        verifieChampsOk();
    });
    document.querySelector(".imageSelectionnee").addEventListener("click", function(){
        document.querySelector("[name='imageInput']").click();
    })
};  
changerBouton();