
/*<=========================================\\CREATION COMPTE UTILISATEUR//================================================> */

// console.log(prenom);
// console.log(nom);
// console.log(email);
// console.log(mdp);
// console.log(confir_mdp);

const btn_inscription = document.getElementById('btn-inscription');
// console.log(btn_inscription);
btn_inscription.addEventListener('click' ,(event)=>{

    event.preventDefault();

    const prenom = document.getElementsByName('prenom')[0].value.trim();
    const nom = document.getElementsByName('nom')[0].value.trim();
    const email = document.getElementsByName('email_inscription')[0].value;
    //console.log(email);
    const mdp = document.getElementsByName('mdp_inscription')[0].value;
    //console.log(mdp);
    const confir_mdp = document.getElementsByName('mdp2')[0].value.trim();
    //console.log(confir_mdp);

    if (mdp !== confir_mdp){
        alert("Les mots de passe sont différents !!!!!");
        return;
    }

    const body = JSON.stringify({
        "firstname": prenom,
        "lastname": nom,
        "email": email,  
        "password": mdp
    });
    
    //console.log("Données envoyées :", body);
    
    fetch('https://quizz.adrardev.fr/api/user', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        //console.log(data);
        if (data.error === "Email déjà utilisé") {
            alert("Erreur : l'email est déjà utilisé.");
        } else {
            alert("Compte créé avec succès");
            //console.log("Compte créé avec succès", data);
            document.getElementById('inscription').reset();
        }
    })
    .catch(error => {
        //console.log("Erreur lors de la création du compte :", error);
        alert("Erreur lors de la création du compte.");
    });
});



/*<===================================================\\SE CONNECTER//================================================> */

const connexion = document.getElementById('btn-Conect');

connexion.addEventListener('click', function Token(event){

    event.preventDefault();
    let email = document.getElementsByName('email-connection')[0].value;
    let password = document.getElementsByName('mdp-connection')[0].value;
    // console.log('Test click');
    fetch('https://quizz.adrardev.fr/api/login_check',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "username":email,
            "password":password
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
        document.getElementById('connexion').reset();
        window.location.href = "./formulaire.html";
        return token;
    })
    .catch(error=>{
        if(error.message == "Invalid credentials."){
            console.log("Erreur : Identifiants invalides.");
        }else{
            console.log("Erreur :",error)
        }
    });
});

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