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

export interface IToolOutputDTO {
    title: string,
    link: string,
    description: string,
    tags: string[],
    id: string
}