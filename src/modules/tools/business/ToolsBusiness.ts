import { BaseError } from "../../../shared/infra/error/BaseError";
import { InvalidInputError } from "../../../shared/infra/error/InvalidInputError";
import { IdGenerator } from "../../../shared/infra/services/IdGenerator";
import { TagBusiness } from "../../tags/business/TagBusiness";
import { ITag } from "../../tags/interfaces/Tag";
import { ToolsDataBase } from "../data/ToolsDataBase";
import { ITool, IToolInputDTO, IToolOutputDTO } from "../interfaces/Tools";

export class ToolsBusiness {
    constructor(
        private toolsDataBase: ToolsDataBase,
        private tagBusiness: TagBusiness,
        private idGenerator: IdGenerator
    ) {}

    async create(input: IToolInputDTO): Promise<ITool> {

        if (!input.title || !input.link || !input.description || !input.tags.length) {
            throw new InvalidInputError('Invalid entry for registration. Enter the title, link, description and tag.')
        }

        const existingTag = await this.tagBusiness.get();

        const checkedTag = existingTag.filter((tag: ITag) => {
            return input.tags.includes(tag.name)
        });

        if (checkedTag.length < 1) {
            for (let tag of input.tags) {
                await this.tagBusiness.create(tag)
            }
        }

        const id = this.idGenerator.generate();

        const tools: ITool = {
            id,
            title: input.title,
            link: input.link,
            description: input.description,
            tags: checkedTag,
            
        }

        return await this.toolsDataBase.create(tools)

    }

    async get(): Promise<IToolOutputDTO[]> {

        const tools: IToolOutputDTO[] = await this.toolsDataBase.get();

        if (!tools) {
            throw new BaseError('No tools have been created yet')
        }

        return tools
    }

    async getByTag(tag: string): Promise<IToolOutputDTO[]> {

        if (!tag) {
            throw new InvalidInputError('Invalid Input. Insert the tag.')
        }

        const tools: IToolOutputDTO[] = await this.toolsDataBase.getByTag(tag);

        if (!tools) {
            throw new BaseError('No tools have been created yet')
        }

        return tools
    }

    async delById(id: string): Promise<any> {

        if(!id) {
            throw new InvalidInputError('Enter the tool id by params ')
        }

        return await this.toolsDataBase.delById(id)
    }

}