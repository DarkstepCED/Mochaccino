export interface StaffItem {
    id: string;
    type: "staff";
    team: string;
    name: string;
    role: string;
    roblox: string;
    discord: string;
    bio: string;
    image: string;
}

export interface EventItem {
    id: string;
    type: "event";
    title: string;
    iso: string;
    loc: string;
    desc: string;
}

export interface AllianceItem {
    id: string;
    type: "alliance";
    name: string;
    role: string;
    desc: string;
    link: string;
}

// Это общий тип для модального окна (может быть кем угодно из трех)
export type ModalItem = StaffItem | EventItem | AllianceItem;