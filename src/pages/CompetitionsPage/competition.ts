export interface Competition {
    competitionName: string;
    icon: string;
    year: string;
    stats: {
        "In Prizes"?: number;
        Signups?: number;
        Teams?: number;
        Submissions?: number;
        Matches?: number;
    };
    description: string;
    link?: string;
    leaderboard?: string;
    signup?: string;
}