import type { Accessor } from "solid-js";

type Props = {
  song: Accessor<{
    id: number;
    albumId: number;
    title: string;
    image: string;
    artists: string[];
  }>;
};

export default function SongPlayed({ song }: Props) {
  const joinedArtists = () => song().artists.join(", ");

  return (
    <div class="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4">
      <picture class="aspect-square">
        <img
          class="object-cover w-full h-full rounded-md"
          src={song().image}
          alt={`Cover of ${song().title} by ${joinedArtists()}`}
          width={48}
          height={48}
          loading="eager"
        />
      </picture>

      <div class="flex flex-col justify-end">
        <p class="font-semibold truncate">{song().title}</p>
        <p class="text-sm text-soft truncate">{joinedArtists()}</p>
      </div>
    </div>
  );
}
