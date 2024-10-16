console.log("test script");

/*  CREATION COMPTE UTILISATEUR == */
/*
fetch ('https://quizz.adrardev.fr/api/user',{
        method:'POST',
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify({
            "firstname":"Prenom",
            "lastname":"Nom",
            "email":"email2@gmail.com",
            "password":"password123"
        })
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        return response.json().then(err =>Promise.reject(err));
    })
    .then(data =>{
        console.log("Compte crée avec succès",data);
    })
    .catch(error => {
        if(error.error ==="Email déjà utilisé"){
            console.log("Erreur : l'email est déjà utilisé.");
        }else{
            console.log("Erreur : ",error);
        }
    });
*/

/*  AFFICHER LISTE COMPTE == */
/*
fetch('https://quizz.adrardev.fr/api/users',{
    method:'GET',
    headers:{
        'authorization':"token..."
    }
})
.then(response=>{
    if(response.ok){
        return response.json();
    }else if(response.status === 401){
        return response.json().then(err=> Promise.reject(err));
    }
})
.then(data=> {
    console.log("liste des comptes :",data);
})
.catch(error => {
    if (error.message === "Invalid JWT Token"){
        console.log("Erreur : token invalide");
    }else if (error.message === "Expired JWT Token"){
        console.log("Erreur : Token JWT Expiré");
    }else {
        console.log("Erreur :",error);
    }
})
*/

/* --------------SE CONNECTER-------------------- */


function Token(){
    // console.log('Test click');
    fetch('https://quizz.adrardev.fr/api/login_check',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "username":"teemo.flute@gmail.com",
            "password":"password"
        })
    })
    .then(response =>{
        if(!response.ok){
            return response.json().then(err=> Promise.reject(err));
        }
        return response.json();
    })
    .then(data =>{
        const token = data.token;
        console.log("Token bien reçu",token);
        localStorage.setItem('jwtToken',token);
        return token;
    })
    .catch(error=>{
        if(error.message == "Invalid credentials."){
            console.log("Erreur : Identifiants invalides.");
        }else{
            console.log("Erreur :",error)
        }
    });
    // event.preventDefault();
}
Token();

const token = localStorage.getItem('jwtToken');


/*FONCTION REFRESH TOKEN */

function refresh(){
    let token = localStorage.getItem("jwtToken");

    if(token){
        console.log("token ok");

        Token();

        setInterval(()=>{
            refresh();
        },60000)
    }else{
        console.log("Pas de token trouvé")
    }
}
refresh();

/* --------------AFFICHER SON COMPTE-------------------- */
/*


fetch('https://quizz.adrardev.fr/api/me',{
    method:'GET',
    headers:{
        'Authorization':'Bearer ' + token
    }
})
.then(response =>{
    if(!response.ok){
        return response.json().then(err=>Promise.reject(err));
    }
    return response.json();
})
.then(data => {
    console.log("Mon compte : ",data);

    //Cibler la div d'arrivé


    //Creation des elements (noeuds)


    //Ajout du style


    //Ajout des elements dans div d'arrivé

})
.catch(error =>{
    if(error.message === "Invalid JWT Token"){
        console.log("Erreur : Token JWT invalide");
    }else {
        console.log("Erreur :",error);
    }
});
*/

/*------------------------------ CATEGORIE--------------------- */

/* --------------Creer une catégorie-------------------- */

const btn_category = document.getElementById('ajout-category');

btn_category.addEventListener('click', (event)=>{

    let category = document.getElementsByName('category')[0].ariaValueMax;
    

    event.preventDefault();
    fetch('https://quizz.adrardev.fr/api/category', {
        method:'POST',
        headers:{
            'Authorization': "Bearer " + token,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "title":category
        })
    })
    .then(response =>{
        if(!response.ok){
            return response.json().then(err=>Promise.reject(err));
        }
        return response.json();
    })
    .then(data =>{
        console.log("Catégorie ajoutée avec succès",data);
        document.getElementsByName('category').refresh();
        //Afficher pk pas le resultat en petit ou notif
    })
    .catch(error =>{
        if(error.error === "Cette catégorie existe déjà"){
            console.log("Erreur : La catégorie existe déjà");
        }else {
            console.log("Erreur : ",error)
        }
    });
})



/* --------------Afficher liste catégorie-------------------- */

fetch('https://quizz.adrardev.fr/api/category/all',{
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    },
})
.then(response=>{
    if(!response.ok){
        return response.json().then(err=>Promise.reject(err));
    }
    return response.json();
})
.then(data =>{
    //Affichage des elements dans html

    console.log(data);
})
.catch(error=>{
    console.log("Erreur lors de la recuperation des catégories",error);
})



/* ----------------CREATION DES QUESTIONS------------------ */
//Creation de fonction pour les questions ?
/*
const test_question = {
    "title":"Personnage de lol",
    "description": "Quel perso possède un bouclier",
    "pointNumber":4,
    "answers":[
        {"text":"Hamtaro","valid":false},
        {"text":"LuckyLuck", "valid":false},
        {"text":"KhaZix","valid":false},
        {"text":"Braum", "valid":true}
    ]
};

fetch('https://quizz.adrardev.fr/api/question',{
    method:"POST",
    headers:{
        'Authorization': "Bearer " + token,
        'Content-Type': "application/json"
    },
    body: JSON.stringify(test_question)
})
.then(response =>{
    if(!response.ok){
        return response.json().then(err => Promise.reject(err));
    }
    return response.json();
})
.then(data =>{
    console.log("Question ajoutée avec succès:", data);
})
.catch(error=>{
    console.log("Erreur lors de l'ajout de la question",error);
})

*/





/* ----------------Afficher QUESTIONS & reponse------------------ */

/*
fetch('https://quizz.adrardev.fr/api/question/all',{
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    }
})
.then(response =>{
    if(!response.ok){
        return response.json().then(err => Promise.reject(err));
    }
    return response.json();
})
.then(data => {
    console.log("Liste des questions :",data);

    data.forEach(question => {
        console.log(`ID: ${question.id}`);
        console.log(`Titre : ${question.title}`);
        console.log(`Descript: ${question.description}`);
        console.log(`Valeur : ${question.value}`);

        console.log("Réponse :");
        question.answers.forEach(reponse => {
            console.log(`Id: ${reponse.id}, Texte: ${reponse.text}, Valide : ${reponse.valid}`);
        });
        console.log("---------------------------------");
    });
})
.catch(error=>{
    console.log("Erreur lors de la récupération des question :",error)
})
*/




/* ------------------------CREATION D'UN QUIZZ --------------------*/
/*
const quizz = {
    "title": "League of Legend",
    "description": "test d'un quizz sur lol",
    "categories": [
        { "id": 14 },    
    ],
    "questions": [
        { "id": 21 },   
        { "id": 22 }, 
        { "id": 23 }, 
        { "id": 24 }, 
    ]
};

fetch('https://quizz.adrardev.fr/api/quizz', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token,  
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(quizz)
})
.then(response => {
    if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
    }
    return response.json();
})
.then(data => {
    
    console.log("Quizz créé avec succès:", data);
    // Afficher en html pour prévenir de la creation du quizz
})
.catch(error => {
    if (error.error === "Category not found") {
        console.log("Erreur : Catégorie non trouvée");
    } else if (error.error === "Question not found") {
        console.log("Erreur : Question non trouvée");
    } else {
        console.log("Erreur :", error);
    }
});
*/






/*------------------ AFFICHER UN QUIZZ (id)--------------------------- */

/*
const quizzId = 5; 

fetch(`https://quizz.adrardev.fr/api/quizz/${quizzId}`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
    }
    return response.json();
})
.then(data => {
    console.log("Détails du quizz:", data);
})
.catch(error => {
    if (error.error === "Quizz not found") {
        console.log("Erreur : Le quizz n'existe pas.");
    } else {
        console.log("Erreur :", error);
    }
});
*/




/* AFFICHER TOUS LES QUIZZS  */
/*
fetch('https://quizz.adrardev.fr/api/quizzs/all', {
    method: 'GET',
    headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
    }
    return response.json();
})
.then(data => {
    console.log("Liste des quizz:", data);
    data.forEach(quizz => {
        console.log(`Quizz: ${quizz.id}, Title :${quizz.title} Description: ${quizz.description}`);
        quizz.categories.forEach(categories => {
            console.log(`Catégorie: ${categories.title}`);
        });
        quizz.questions.forEach(question => {
            console.log(`Question: ${question.title}, Valeur: ${question.value}`);
        });
    });
})
.catch(error => {
    if (error.error === "Quizz not found") {
        console.log("Erreur : Aucun quizz trouvé.");
    } else {
        console.log("Erreur :", error);
    }
});
*/
