import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { User } from "../../models/User";
import Layout from "../../components/Layout";
import firebase from "firebase/app";

type Query = {
  uid: string;
};

export default function UserShow() {
  const [user, setUser] = useState<User>(null);
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();
  const query = router.query as Query;

  useEffect(() => {
    if (query.uid === undefined) return;

    async function loadUser() {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(query.uid)
        .get();

      if (!doc.exists) return;

      const gotUser = doc.data() as User;
      gotUser.uid = doc.id;
      setUser(gotUser);
    }

    loadUser();
  }, [query.uid]);

  /**
   * 質問を送信する処理
   * @param e
   */
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSending(true);
    await firebase.firestore().collection("questions").add({
      sendUid: firebase.auth().currentUser.uid,
      receiverUid: user.uid,
      body,
      isReplied: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSending(false);

    setBody("");
    alert("質問を送信しました");
  }

  return (
    <Layout>
      {user && (
        <div className="text-center">
          <h1 className="h4">{user.name}さんのページ</h1>
          <div className="m-5">{user.name}さんに質問しよう</div>
        </div>
      )}
      <div className="row justify-content-center mb-3">
        <div className="col-12 col-md-6">
          <form onSubmit={onSubmit}>
            <textarea
              className="form-control"
              placeholder="お元気ですか？"
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
            <div className="m-3">
              {isSending ? (
                <div className="spinner-border text secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  質問を送信する
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
