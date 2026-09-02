import type { CreditEntry } from '../objects/CreditEntry';

const POSTER_ROOTPATH = '/credits/posters';
const STUDIO_ROOTPATH = '/credits/studios';

const rawCredits = [
    {
        id: 1,
        title: "Some Film",
        type: "Film",
        year: 2024,
        role: "Lookdev",
        duration: "1h 47m",
        studioPath: "warner-bros",
        link: "https://example.com",
    },

] as const;



export const creditLibrary: CreditEntry[] = rawCredits.map(credit => ({
    ...credit,
}));

