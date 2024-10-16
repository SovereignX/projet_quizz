/* --------------SE CONNECTER-------------------- */


function Token(){
    // console.log('Test click');
    fetch('https://quizz.adrardev.fr/api/login_check',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "username":"gabnic@test.fr",
            "password":"123456789"
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
        //console.log("Token bien reçu",token);
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
        //console.log("token ok");

        Token();

        setInterval(()=>{
            refresh();
        },60000)
    }else{
        console.log("Pas de token trouvé")
    }
}
refresh();





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
    const div = document.getElementById('category');
    data.forEach(element => {
        let newp = document.createElement('p');
        newp.textContent = "L'id : " + element.id;
        let newp2 = document.createElement('p');
        newp2.textContent ="Title :" +  element.title;
        div.append(newp,newp2);
    });
    //console.log(data);
})
.catch(error=>{
    console.log("Erreur lors de la recuperation des catégories",error);
})



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
    console.log("Liste des quizz: ", data);
    const container = document.getElementById('quizz');

    data.forEach(quizz => {
        //console.log(`Quizz: ${quizz.id}, Title :${quizz.title} Description: ${quizz.description}`);
        let id_quizz = document.createElement("p");
        let title_quizz =document.createElement("p");
        let description_quizz = document.createElement("p");

        id_quizz.textContent = "Id : "+quizz.id;
        title_quizz.textContent = "Titre : "+quizz.title;
        description_quizz.textContent = "Description : " + quizz.description;

        container.append(id_quizz,title_quizz,description_quizz);

        quizz.categories.forEach(categories => {
            //console.log(`Catégorie: ${categories.title}`);
            let category_quizz = document.createElement('p');

            category_quizz.textContent = "Catégory : " + categories.title;

            container.append(category_quizz);

        });
        quizz.questions.forEach(question => {
            //console.log(`Question: ${question.title}, Valeur: ${question.value}`);
            let question_quizz = document.createElement('p');

            question_quizz.textContent = "Question : " + question.description;

            container.append(question_quizz);
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
