import Head from "next/head";
import Link from "next/link";
import { useAuthenticate } from "../hooks/authentication";

export default function Home() {
  const { user } = useAuthenticate();

  return (
    <>
      <Head>
        <title>Page2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>{user?.uid || "not logged in"}</p>
      <Link href="/">
        <a>Go back</a>
      </Link>
    </>
  );
}
