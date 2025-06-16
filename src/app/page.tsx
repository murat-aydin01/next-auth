import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col grow items-center justify-center text-gray-100 ">
      <div className="flex flex-col items-center border-2 p-4 gap-y-4 border-gray-500 rounded-2xl bg-gray-800">
        <h1 className="text-4xl font-bold">Next.js + Auth.js + Auth0</h1>
        <p className="text-lg">
          Detaylı bilgi için readme bölümüne bakınız:
        </p>
        <Link href="https://github.com/murat-aydin01/next-auth" className="text-blue-500 hover:underline">
          https://github.com/murat-aydin01/next-auth
        </Link>
      </div>
    </div>
  );
}
