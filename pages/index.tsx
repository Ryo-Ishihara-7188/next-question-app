import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useAuthenticate } from "../hooks/authentication";

export default function Home() {
  const { user } = useAuthenticate();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p>{user?.uid || "not logged in"}</p>

        <Link href="/page2">
          <a>page2</a>
        </Link>
      </main>
    </div>
  );
}
