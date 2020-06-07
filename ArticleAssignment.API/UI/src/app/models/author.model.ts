export class Author {

    public id: number;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public about: string;
    public birthDate: Date;
    public createDate: Date;
    public updateDate: Date;
}

export function AuthorFullName(author: Author): string {
    if (!author) {
        return '';
    }
    if (author.middleName) {
        return `${author.firstName}  ${author.middleName} ${author.lastName}`;
    }
    return `${author.firstName}  ${author.lastName}`;
}
