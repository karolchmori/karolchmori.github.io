export interface CreditEntry {
    id: number;
    title: string;
    studio: string;
    type: 'Film' | 'Series' | 'Short' | 'Commercial' | 'Game';
    year: number;
    role: string;
    duration?: string;
    posterPath?: string;
    studioPath?: string;
    link?: string;
    color?: string;
}