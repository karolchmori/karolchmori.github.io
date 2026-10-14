import type { CreditEntry } from '../objects/CreditEntry';

const POSTER_ROOTPATH = '/credits/posters';
const STUDIO_ROOTPATH = '/credits/studios';

const TYPE_COLORS: Record<CreditEntry['type'], string> = {
    Film: '#c65370',
    Series: '#9a5a8f',
    Short: '#a8472a',
    Commercial: '#46749a', 
    Game: '#587848',
};

const rawCredits = [
    {
        id: 1,
        title: "Tales of the East",
        studio: "Cartoon Surfers",
        type: "Film",
        year: 2024,
        role: "Tool Dev",
        posterPath: "TalesOfTheEast_Poster_LOW.jpg",
        studioPath: "warner-bros",
        link: "https://example.com",
        posterMargin: "9cqi",
    },
    {
        id: 2,
        title: "Here Be Dragons",
        studio: "TEST",
        type: "Short",
        year: 2025,
        role: "Tool Dev",
        posterPath: "HereBeDragons_Poster_LOW.jpg",
        studioPath: "warner-bros",
        link: "https://example.com",
        posterMargin: "19cqi",
    },
    {
        id: 3,
        title: "Paper-Thin",
        studio: "TEST",
        type: "Short",
        year: 2025,
        role: "Tool Dev",
        posterPath: "PaperThin_Poster_LOW.jpg",
        studioPath: "warner-bros",
        link: "https://example.com",
        posterMargin: "18cqi",
    },

] as const;



export const creditLibrary: CreditEntry[] = rawCredits.map(credit => ({
    ...credit,
    posterPath: credit.posterPath ? `${POSTER_ROOTPATH}/${credit.posterPath}` : undefined,
    studioPath: credit.studioPath ? `${STUDIO_ROOTPATH}/${credit.studioPath}` : undefined,
    color: TYPE_COLORS[credit.type],
}));

