function loginUsers() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        // Création du couple email/mot de passe //
        const couple = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        // Création de la charge utile au format JSON //
        const chargeUtile = JSON.stringify(couple);
        // Appel de la fonction fetch avec toutes les informations nécessaires //
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile 
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("data: ", data)
        })
    });
};
loginUsers();

/*fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: "sophie.bluel@test.tld",
        password: "S0phie"
    })
})
.then((response) => response.json())
.then((data) => {
    console.log("tableau: ", data)
})**/