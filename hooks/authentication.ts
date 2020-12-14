import firebase from "firebase/app";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { User } from "../models/User";

const userState = atom<User>({
  key: "user",
  default: null,
});

/**
 * ユーザー認証を実施する
 */
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
        const loginUser: User = {
          uid: user.uid,
          isAnonymous: user.isAnonymous,
        };
        setUser(loginUser);
        createUserIfNotFound(loginUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return { user };
};

/**
 * 匿名ユーザーをfirestoreへ格納する
 * @param user
 */
const createUserIfNotFound = async (user: User) => {
  const userRef = firebase.firestore().collection("users").doc(user.uid);
  const doc = await userRef.get();
  if (doc.exists) return;

  await userRef.set({
    name: "user:" + new Date().getTime(),
  });
};
