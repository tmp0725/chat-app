import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <div className="h-screen bg-slate-200">
      <header className="p-5 text-lg pl-3 font-black text-center bg-slate-400">
        Bulletin board
      </header>

      <div className="flex justify-center items-center h-3/4 space-x-20">
        <Link href="/openchat">
          <button className="h-36 w-36 cursor-pointer bg-slate-600 rounded-md">
            <div className="text-center text-white font-black">Open Chat</div>
          </button>
        </Link>

        <Link href="joinprivateroom">
          <button className="h-36 w-36 cursor-pointer bg-slate-600 rounded-md">
            <div className="text-center text-white font-black">
              Private Chat
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
