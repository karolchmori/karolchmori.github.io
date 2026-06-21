export type ImageSource = ImageMetadata | string;

const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/content/**/*.{jpeg,jpg,png,gif,webp,avif}',
    { eager: true }
);

export function resolveImage(src: ImageSource, propName: string): ImageSource {
    if (typeof src !== 'string') return src; // already an imported asset

    const isRemoteOrAbsolute = /^https?:\/\//.test(src) || src.startsWith('/');
    if (isRemoteOrAbsolute) return src;

    const filename = src.replace(/^\.{1,2}\//, '');
    const match = Object.keys(images).find((key) => key.endsWith(`/${filename}`));

    if (!match) {
        throw new Error(
        `resolveImage: could not resolve "${propName}" path "${src}". ` +
        `Looked for a file ending in "/${filename}" under "/src/content/**". ` +
        `Make sure the image actually lives under src/content, or pass an imported asset instead.`
        );
    }

    return images[match].default;
}