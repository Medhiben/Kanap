console.log("salut");
//Récupération des produits de L'API
//
fetch ("http://localhost:3000/api/products")
//La réponse donne/transforme les produits en json pour pouvoir les intérpréter en js
.then((res) => res.json())
//ce que l'on a reçu et traité  en json sera apellé en objetProduits
.then((objetProduits) => {
// Informations dans la console sur ce qui est récupéré en tableau
console.log(objetProduits);
//appel de la fonction d'affichage des produits
lesKanaps(objetProduits);
})
//Dans le cas d'une erreur
.catch((error) => {
document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
console.log("erreur 404, sur ressource API:" + err);
})

//fonction qui affiche des produits de l'API sur la page index
function lesKanaps(index) {
    //
    let zoneArticle = document.querySelector("#items");
    // boucle pour chaque indice nommé "article" dans l'index
    for (let article of index) {
    /*création  et ajout de zone d'article insertion de l'adresse produite via le chemin produit + paramètres(son id):
    la page index est htpp://127.0.0.1:5500/front/html/index.html donc la page du produit sera htpp://127.0.0.1:5500/front/html/product.html
    pour rajouter son paramètre on met ?, puis la clé (ici_id),associé(=) à sa valeur dynamique $(article._id) */
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
        <img src="${article.imageUrl}"alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
    </article>
   </a>`;
 }
}