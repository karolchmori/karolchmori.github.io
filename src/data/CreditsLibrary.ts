import type { CreditEntry } from '../objects/CreditEntry';

const POSTER_ROOTPATH = '/credits/posters';
const STUDIO_ROOTPATH = '/credits/studios';

const rawCredits = [
    {
        id: 1,
        title: "Some Film",
        studio: "Test Studio",
        type: "Film",
        year: 2024,
        role: "Lookdev",
        duration: "1h 47m",
        posterPath: "TalesOfTheEast_Poster.jpg",
        studioPath: "warner-bros",
        link: "https://example.com",
    },

] as const;



export const creditLibrary: CreditEntry[] = rawCredits.map(credit => ({
    ...credit,
    posterPath: credit.posterPath ? `${POSTER_ROOTPATH}/${credit.posterPath}` : undefined,
    studioPath: credit.studioPath ? `${STUDIO_ROOTPATH}/${credit.studioPath}` : undefined,
}));

