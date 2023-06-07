export interface iTask {
    id?:string;
    title: string;
    description: string;
    dueDate: Date | null;
    createdOn: Date;
    complete: boolean;
}