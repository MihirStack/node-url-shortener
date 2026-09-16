export interface CreateUrlInput {
    originalUrl: string;
    expiresAt?: Date | null;
}

export interface UrlResponse { 
    id: string;
    originalUrl: string;
    shortCoede: string;
    shortUrl: string;
    clickCount: number;
    expiresAt?: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}