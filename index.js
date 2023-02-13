import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { collection, addDoc,  getDocs } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js"; 


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
const leer = document.getElementById('leer');
const actualizar = document.getElementById('actualizar');
const borrar = document.getElementById('borrar');


const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const edad = document.getElementById('edad');
const numero = document.getElementById('numero');
const correo = document.getElementById('correo');
const formulario = document.getElementById('formulario');

const mapa = document.getElementById('mostrarmapa1');
const quitarmapa = document.getElementById('quitarmapa1')

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
        document.getElementById('formulario').style.display = "block"
        document.getElementById('email').style.display = "none"
        document.getElementById('pass').style.display = "none"
        document.getElementById('log').style.display = "none"
        document.getElementById('crear').style.display = "none"
        document.getElementById('salir').style.display = "block"
        document.getElementById('google').style.display = "none"
        document.getElementById('facebook').style.display = "none"
        document.getElementById('twitter').style.display = "none"

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
        document.getElementById('formulario').style.display = 'none'
        document.getElementById('email').style.display = "block"
        document.getElementById('pass').style.display = "block"
        document.getElementById('log').style.display = "block"
        document.getElementById('crear').style.display = "block"
        document.getElementById('salir').style.display = "none"
        document.getElementById('google').style.display = "block"
        document.getElementById('facebook').style.display = "block"
        document.getElementById('twitter').style.display = "block"
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

leer.addEventListener('click', async() => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    document.getElementById('fomulario').innerHTML = `${doc.data().nombre}`
   });
});


mapa.addEventListener('click', function(){
  document.getElementById('mostrarmapa1').style.display = "none"
  document.getElementById('quitarmapa1').style.display = "block"
  document.getElementById('map').style.display = "block"
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpdWQyMDA0IiwiYSI6ImNsZHdwc2Q0bDA5bW0zcW9sNTF5bDc1djgifQ.qmPZAQVbA4PXPXP0A3JxYg';
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });
});

quitarmapa.addEventListener('click', function(){
  document.getElementById('mostrarmapa1').style.display = "block"
  document.getElementById('quitarmapa1').style.display = "none"
  document.getElementById('map').style.display = "none"
});




/*
HTML.btnNuevo.addEventListener("click", async () => {
  try {
      await setDoc(doc(db, "users", HTML.inputNombre.value), {
          name: HTML.inputNombre.value,
          edad: HTML.inputEdad.value,
      });
      alert(`Documento ${HTML.inputNombre.value} creado!`);
  } catch (error) {
      alert(error);
  }
});

HTML.btnActualiza.addEventListener("click", async () => {
  HTML.tabla.innerHTML =
      `<tr>
      <td>Id</td>
      <td>Nombre</td>
      <td>Edad</td>
      <td>Actions</td>
  </tr>`;
  

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {

      console.log(doc.id, " => ", doc.data());
      HTML.tabla.innerHTML +=
          `<tr>
          <td>${doc.id}</td>
          <td>${doc.data().name}</td>
          <td>${doc.data().edad}</td>
      </tr>`;
  });
});

HTML.btnBuscar.addEventListener("click", async () => {
  const docRef = doc(db, "users", HTML.inputIdU.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      HTML.inputNombreU.value = docSnap.data().name;
      HTML.inputEdadU.value = docSnap.data().edad;
      console.log("Document data:", docSnap.data());
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
});

HTML.btnGuardar.addEventListener("click", async() => {
  const elementRef = doc(db, "users", HTML.inputIdU.value);

  await updateDoc(elementRef, {
      name: HTML.inputNombreU.value,
      edad: HTML.inputEdadU.value,
  });
});

HTML.btnBuscarE.addEventListener("click", async()=>{
  const docRef = doc(db, "users", HTML.inputIdE.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      HTML.inputNombreE.value = docSnap.data().name;
      HTML.inputEdadE.value = docSnap.data().edad;
      console.log("Document data:", docSnap.data());
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
});

HTML.btnEliminar.addEventListener("click", async()=>{
  await deleteDoc(doc(db, "users", HTML.inputIdE.value));
})
*/