export type VideoPlatform = "vimeo" | "youtube";

export function getVideoUrl(platform: VideoPlatform, id: string, autoplay: number) {
  switch (platform) {
    case "vimeo":
      return `https://player.vimeo.com/video/${id}?autoplay=${autoplay}`;
    case "youtube":
      return `https://www.youtube.com/embed/${id}?autoplay=${autoplay}`;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}