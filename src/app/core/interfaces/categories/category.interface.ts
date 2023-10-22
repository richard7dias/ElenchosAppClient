export interface Category {
    idOwner: string;
    id: string;
    name: string;
    budget: number;
    expense: number,
    available: number,
    isAnnualCategory: boolean
}