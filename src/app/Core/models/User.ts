export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    profilePic?: string;
    facebook?: boolean;
    google?: boolean;
    archive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LoginResp {
    user: User;
    token: string;
}
