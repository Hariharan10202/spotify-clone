"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Box from "./Box";
import SideBarItem from "./SideBarItem";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/Hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        `
    flex 
    h-full
    `,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex w-[300px] flex-col p-2 gap-y-2 bg-black h-full">
        <Box>
          <div className="flex flex-col px-5 py-4 gap-y-4">
            {routes.map((item) => (
              <SideBarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full oveflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full w-full flex overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
