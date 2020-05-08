export class Comment {

    public id: number;
    public content: string;
    public authorId: number;
    public articleId: number;
    public createDate: Date;
    public updateDate?: Date;
}