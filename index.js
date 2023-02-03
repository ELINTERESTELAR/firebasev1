import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js"; 


const firebaseConfig = {
    apiKey: "AIzaSyCJVrFhotjl9h0_Q8LwcGkvR7dyPANsQgU",
    authDomain: "proyecto-a006d.firebaseapp.com",
    projectId: "proyecto-a006d",
    storageBucket: "proyecto-a006d.appspot.com",
    messagingSenderId: "673147133501",
    appId: "1:673147133501:web:376cb06ca5da54fd925454",
    measurementId: "G-WR42JVCZ6Q"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Autentificacion de las aplicaciones
const provider = new GoogleAuthProvider();
const provider2 = new FacebookAuthProvider();
const provider3 = new TwitterAuthProvider();

//Traer elementos de html a js mediante id
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const log = document.getElementById('log');
const crear = document.getElementById('crear');
const salir = document.getElementById('salir');
const google = document.getElementById('google');
const facebook = document.getElementById('facebook');
const twitter = document.getElementById('twitter');
const guardar = document.getElementById('guardar');


const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const edad = document.getElementById('edad');
const numero = document.getElementById('numero');
const correo = document.getElementById('correo');


//boton de crear usuario
crear.addEventListener('click', function () {
    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert ('si bueno');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert (errorCode + ' + ' + errorMessage);
            // ..
        });
});


//boton de iniciar sesion
log.addEventListener('click', function(){
    signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert ('si funciona')
        // ...
        })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert (errorCode + '+' + errorMessage)
        });

});

//Autentificacion
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // ...
  } else {
    /* const uid = user.uid; */
    console.log('no hay conexion')
  }
});


//Boton de salir
salir.addEventListener('click', function(){
    signOut(auth).then(() => {
        // Sign-out successful.
        alert('Salir de sesion')
      }).catch((error) => {
        // An error happened.
        alert('fallo al salir de sesion')
      });
});


//iniciar sesion mediante google
google.addEventListener('click', function(){
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    alert('no bueno señores')
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    alert('de que te sirve estar vivo si estas bien p@nche p#ndej$')
  });
});


//Iniciar sesion mediante facebook
facebook.addEventListener('click', function(){
signInWithPopup(auth, provider2)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
    alert('saludos a memeball y cuevana nos pirateo')
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    alert('tablos esta controlando mi mente')
    // ...
  });
});

//Iniciar sesion mediante twitter
twitter.addEventListener('click', function(){
    signInWithPopup(auth, provider3)
  .then((result) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;

    // The signed-in user info.
    const user = result.user;
    // ...
    alert('a sus ordenes general tablos')
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
    // ...
    alert('eres una nenaza')
  });

});

//guardar datos de un formulario mediante un boton de guardar
guardar.addEventListener('click', async() => {
  try {
      const docRef = await addDoc(collection(db, "users"), {
        nombres: `${nombre.value}`,
        apellidos: `${apellido.value}`,
        edad: `${edad.value}`,
        numero: `${numero.value}`,
        correo: `${correo.value}`

      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('estas bien pend#j0')
    }
    
});

