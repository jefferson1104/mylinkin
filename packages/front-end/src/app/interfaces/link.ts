export interface ILink {
    code: string;
    created_at: Date;
    id: number;
    original_url:  string;
};

export interface ILinkMetric {
    clicks: number;
    code: string;
    created_at: Date;
    original_url: string;
};

export interface ISimpleLinkMetric {
    shortLinkId: number;
    clicks: number;
};
