import firebase from "firebase/app";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { User } from "../models/User";

const userState = atom<User>({
  key: "user",
  default: null,
});

export const useAuthenticate = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user !== null) return;

    firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
        console.error(error);
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          isAnonymous: user.isAnonymous,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return { user };
};
