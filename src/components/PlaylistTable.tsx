import PlaylistSongRow from "@/components/PlaylistSongRow.tsx";
import type { Song } from "@/lib/data";

function Time({ class: klass }: { class?: string }) {
  return (
    <svg
      class={klass}
      role="img"
      height="16"
      width="16"
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
      <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
    </svg>
  );
}

export type Props = {
	playlistId: string;
  songs: Song[];
};

export default function PlaylistTable({ songs, playlistId }: Props) {
  return (
    <table class="w-full border-collapse border-spacing-0 text-[#a7a7a7] font-normal text-left relative z-20">
      <thead class="">
        <tr>
          <th class="text-center pb-4 px-0">
            <p class="pr-2  border-b border-glass pb-3">#</p>
          </th>
          <th class="pb-4 px-0">
            <p class="border-b border-glass pb-3">Artist</p>
          </th>
          <th class="pb-4 px-0">
            <p class="border-b border-glass pb-3">Album</p>
          </th>
          <th class="pb-4 px-0">
            <div class="flex justify-center border-b border-glass pb-4 pt-1 pr-3">
              <Time class="w-4 h-4" />
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        {songs.map((song, i) => (
          <PlaylistSongRow {...song} playlistId={playlistId} index={i} />
        ))}
      </tbody>
    </table>
  );
}
