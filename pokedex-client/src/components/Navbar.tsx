import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import Link from "next/link";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CatchingPokemonRoundedIcon from '@mui/icons-material/CatchingPokemonRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useRouter } from "next/router";
import { cn } from "@/lib/tailwind";
import { useCollection } from "@/contexts/CollectionProvider";

export default function Navbar() {

  const { isAuthenticated, logout, data: session } = useAuth();
  const router = useRouter();
  const {count} = useCollection();
  return (
    <div className={cn("w-[max(80%,450px)] m-auto mt-6 h-16 md:px-4 bg-white text-sky-800 rounded-lg shadow-lg shadow-pokeblue/[.2]", {
      "bg-[#F5F8FC] shadow-none" : router.pathname === "/"})}
      >
      <ul className="flex w-full gap-x-[4vw] text-lg items-center justify-between">
        <div className="hidden md:block"></div>
        <div className="flex">
          <NavbarItem href={"/"} title={"Home"}>
            <HomeRoundedIcon />
          </NavbarItem>
          <NavbarItem href={"/explore"} title={"Explore"}>
            <CatchingPokemonRoundedIcon />
          </NavbarItem>
          <NavbarItem href={"/wishlist"} title={"Wish List"}>
            <BookmarkRoundedIcon />
          </NavbarItem>
          {session?.user.role === "ADMIN" &&
            <NavbarItem href={"/admin"} title={"Admin"}>
              <AdminPanelSettingsRoundedIcon />
            </NavbarItem>}
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <span>{count}</span><div className="logo pokeball" />
          {isAuthenticated && <button onClick={logout}><LogoutRoundedIcon fontSize="large"/></button>}
        </div>
      </ul>
    </div>
  )
}

export const NavbarItem = ({ children, href, title }: { children: React.ReactNode, href: string, title: string }) => {
  
  const router = useRouter();
  return (
    <Link href={href} className="hover:text-sky-900">
      <div className={cn("w-28 md:w-32 h-[64px] flex justify-center items-center gap-x-2", {
        "border-b-4 border-red-500 text-red-500" : router.pathname === href
      })}>
        {children}
        <span className="text-[1rem]">{title}</span>
      </div>
    </Link>
  )

}