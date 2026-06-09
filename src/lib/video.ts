export type VideoPlatform = "vimeo" | "youtube";

export function getVideoUrl(platform: VideoPlatform, id: string) {
  switch (platform) {
    case "vimeo":
      return `https://player.vimeo.com/video/${id}`;
    case "youtube":
      return `https://www.youtube.com/embed/${id}`;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}