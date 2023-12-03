"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/Hooks/useAuthModal";
import { useUser } from "@/Hooks/useUser";
import useUploadModal from "@/Hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/Hooks/useOnPlay";
import useSubscribeModal from "@/Hooks/useSubscribeModal";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) return authModal.onOpen();
    if (!subscription) return subscribeModal.onOpen();

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 text-md font-medium">Your Library </p>
        </div>
        <AiOutlinePlus
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white  transition"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            onClick={(id: string) => {
              onPlay(id);
            }}
            key={song.id}
            data={song}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
