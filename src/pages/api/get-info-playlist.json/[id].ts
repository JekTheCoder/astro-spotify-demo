import { allPlaylists, songs as allSongs } from "@/lib/data";
import { HttpResponse } from "@/lib/http";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return HttpResponse.notFound().finish();
  }

  const playlist = allPlaylists.find((p) => p.id === id);
  if (!playlist) {
    return HttpResponse.notFound().finish();
  }

  const songs = allSongs.filter((s) => s.albumId === playlist.albumId);

  return HttpResponse.ok().json({ playlist, songs });
};
