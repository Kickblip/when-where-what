import Header from "@/components/Header";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  async function startOnboarding(formData: FormData) {
    "use server";

    const email = formData.get("email");

    redirect("/onboarding");
  }

  return (
    <div className="flex flex-col min-h-screen items-center text-center justify-center bg-white font-sans">
      <Image
        src="/friends.jpg"
        alt="Logo"
        width={200}
        height={200}
        className="mb-4"
      />
      <Header />

      <h2 className="text-sm text-zinc-700 mt-2 max-w-md">
        Get personalized recommendations for events happening on and around
        campus every week in your inbox.
      </h2>

      <form className="flex mt-6 w-full max-w-sm" action={startOnboarding}>
        <input
          type="email"
          placeholder="What's your email?"
          className="flex-1 px-3 py-2 border-l border-t border-b border-zinc-200 rounded-l-sm focus:outline-none text-sm font-medium"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-orange-600 text-white rounded-r-sm hover:bg-orange-500 transition-colors duration-200 focus:outline-none text-sm font-medium"
        >
          Join
        </button>
      </form>

      <div className="mt-4 text-sm text-zinc-700 italic">
        Built by and for longhorns at UT Austin
      </div>
    </div>
  );
}
