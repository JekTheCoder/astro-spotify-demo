import { useStore } from "@/store";
import { musicPlayedStore } from "@/store/played";
import { Play } from "./solid-buttons";

export type Props = {
  index: number;
  id: number;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
};

export default function PlaylistSongRow({
  index,
  id,
  image,
  title,
  artists,
  album,
  duration,
}: Props) {
  const music = useStore(musicPlayedStore);

  const tdClass = `truncate py-2 
		first:rounded-tl-lg first:rounded-bl-lg first:pl-4 
		last:rounded-tr-lg last:rounded-br-lg last:pr-4`;

  const active = () => {
    const { data } = music();
    if (!data) return false;

    return data.song.id === id;
  };

  const tdHoverClass = "group-hover:bg-glass";
  const tdActiveClass = "bg-glass-dark";
  const tdBgClass = () => (active() ? tdActiveClass : tdHoverClass);

  const play = () => music().playSong(id);
  return (
    <tr
      class="group"
      onDblClick={play}
      onKeyUp={(e) => e.code === "Enter" && play()}
      tabindex={0}
    >
      <td class={`${tdClass} ${tdBgClass()}`}>
        <div class="w-6 flex justify-end">
          <p class="group-hover:hidden pr-2">{index + 1}</p>

          <Play class="hidden group-hover:block w-6 h-6 text-white" />
        </div>
      </td>

      <td class={`${tdClass} ${tdBgClass()}`}>
        <div class="grid grid-cols-[auto_1fr] gap-x-4">
          <picture class="aspect-square h-10">
            <img class="w-full h-full rounded-md" src={image} alt="" />
          </picture>

          <div class="flex flex-col">
            <span class="text-white font-bold">{title}</span>
            <span>{artists.join(",")}</span>
          </div>
        </div>
      </td>

      <td class={`${tdClass} ${tdBgClass()}`}>{album}</td>

      <td class={`text-center ${tdClass} ${tdBgClass()}`}>{duration}</td>
    </tr>
  );
}
