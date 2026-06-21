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

const localVideos = import.meta.glob<{ default: string }>( '/src/content/**/*.{mp4,webm,mov,ogg}',  { eager: true } );

export function resolveLocalVideo(input: string, propName: string = "src"): string {
    const isRemoteOrAbsolute = /^https?:\/\//.test(input) || input.startsWith("/");
    if (isRemoteOrAbsolute) return input;

    const filename = input.replace(/^\.{1,2}\//, "");
    const match = Object.keys(localVideos).find((key) => key.endsWith(`/${filename}`));

    if (!match) {
    throw new Error(
        `resolveLocalVideo: could not resolve "${propName}" path "${input}". ` +
        `Looked for a file ending in "/${filename}" under "/src/content/**". ` +
        `Make sure the video actually lives under src/content, or pass an absolute/external URL instead.`
    );
    }

    return localVideos[match].default;
}