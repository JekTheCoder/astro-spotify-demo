import PlaylistSongRow from "@/components/PlaylistSongRow.tsx";
import type { Song } from "@/lib/data";

export type Props = {
  songs: Song[];
};

export default function PlaylistTable({ songs }: Props) {
  return (
    <table class="w-full text-[#a7a7a7] font-normal text-left relative z-20">
      <thead class="">
        <tr>
          <th class="text-center pb-4">
            <p class="pr-2  border-b border-glass pb-3">#</p>
          </th>
          <th class="pb-4 ">
            <p class="border-b border-glass pb-3">Artist</p>
          </th>
          <th class="pb-4">
            <p class="border-b border-glass pb-3">Album</p>
          </th>
          <th class="pb-4">
            <div class="flex justify-center border-b border-glass pb-3">
              time
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        {songs.map((song, i) => (
          <PlaylistSongRow {...song} index={i} />
        ))}
      </tbody>
    </table>
  );
}
