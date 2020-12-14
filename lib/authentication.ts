import firebase from "firebase/app";

const authenticate = () => {
  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      console.log(user.isAnonymous);
    } else {
      // Signed out
    }
  });
};

if (process.browser) {
  authenticate();
}
