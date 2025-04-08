import { auth, signIn, signOut } from "@/auth";
import { ModeToggle } from "./ui/modal-toggle";
import Logo from "./ui/logo-theme";
import Link from "next/link";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function NavBar() {
  const session = await auth();

  return (
    <header className="px-5 sticky top-0 backdrop-blur-xl z-50 shadow-2xl md:px-8 py-3 md:py-5 font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-5">
          {session ? (
            <>
              <Link href="/lots/create">
                <span className="text_span_medium max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  className="text_span_medium max-sm:hidden"
                  type="submit"
                >
                  Logout
                </button>
                <button type="submit" className="flex">
                  <LogOut className="size-6 sm:hidden text-red-600" />
                </button>
              </form>
              <Link href={`/seller/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button className="text_span_medium" type="submit">
                LogIn
              </button>
            </form>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
