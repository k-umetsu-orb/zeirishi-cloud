import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head><title>404 - ページが見つかりません | 税理士クラウド</title></Head>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">ページが見つかりません</h1>
        <Link href="/" className="text-primary hover:underline">トップページへ戻る</Link>
      </div>
    </>
  );
}
