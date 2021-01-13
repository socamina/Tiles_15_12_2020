// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_9b6rynw32QLsVErVcaoZe2PMigDtXzE",
  authDomain: "tiles-bd040.firebaseapp.com",
  databaseURL: "https://tiles-bd040-default-rtdb.firebaseio.com",
  projectId: "tiles-bd040",
  storageBucket: "tiles-bd040.appspot.com",
  messagingSenderId: "327492910640",
  appId: "1:327492910640:web:79bdfdac67bb26671e37f5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// NE PAS OUBLIER DE CONFIGURER FIREBASE AUTH TO ANONYMOUS !!!

// SIGN ANONYMOUS USER ----
firebase.auth().onAuthStateChanged((user) => {
  console.log("onAuthStateChanged");
  if (user) {
    // console.log(user);
    // User is signed in.
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    // console.log(uid);
  } else {
    // No user is signed in.
  }
});

firebase
  .auth()
  .signInAnonymously()
  .catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log("anonymously auth error ----- " + errorCode);
    console.log(errorCode);
  });

DATABASE = firebase.database();

// SEND_MESSAGE('TILES/id/hello/wtf/lol', 4)

// DATABASE.ref("TILES/id").on("value", function (snapshot) {
//   let values = snapshot.val();
//   console.log(values);
// });

function SEND_MESSAGE(_type, _data) {
  // _data = {'data': _data, 't_created': Date.now()};
  DATABASE.ref(_type).set(_data);
}
