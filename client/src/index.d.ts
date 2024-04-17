interface NavItemsType {
    name: string;
    path: string;
}
interface footerType {
    title: string;
    items:
    {
        name: string;
        path: string;
    }[];
}

interface UserType {
    name?: string,
    username?: string,
    email: string,
    password: string,
}

interface userPayload {
    userId: string;
    photo: string | File | null,
    location: string,
    interests: string[],
    isVerified: Boolean,
}

interface CardType {
    id: number;
    imgUrl: string,
    title: string,
    para: string,
}

interface interestedCardType extends CardType {
    onCheck: (item: string, id:number) => void; 
}