import { ITag } from "../../tags/interfaces/Tag";

export interface ITool {
    id:string,
    title: string,
    link: string,
    description: string,
    tags?: ITag[]
}

export interface IToolInputDTO {
    title: string,
    link: string,
    description: string,
    tags: string[]
}