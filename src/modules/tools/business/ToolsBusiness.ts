import { InvalidInputError } from "../../../shared/infra/error/InvalidInputError";
import { IdGenerator } from "../../../shared/infra/services/IdGenerator";
import { TagBusiness } from "../../tags/business/TagBusiness";
import { TagDataBase } from "../../tags/data/TagDataBase";
import { ITag } from "../../tags/interfaces/Tag";
import { ToolsDataBase } from "../data/ToolsDataBase";
import { IToolInputDTO } from "../interfaces/Tools";

export class ToolsBusiness {
    constructor(
        private toolsDataBase: ToolsDataBase,
        private tagBusiness: TagBusiness,
        private idGenerator: IdGenerator
    ) {}

    async create(input: IToolInputDTO): Promise<void> {

        if (!input.title || !input.link || !input.description || !input.tags.length) {
            throw new InvalidInputError('Invalid entry for registration. Enter the title, link, description and tag.')
        }

        const existingTag = await this.tagBusiness.get();

        const checkedTag = existingTag.filter((tag: ITag) => {
            return input.tags.includes(tag.tags)
        });

        if (checkedTag.length < 1) {
            for (let tag of input.tags) {
                await this.tagBusiness.create(tag)
            }
        }

        const id = this.idGenerator.generate();

        const tools = {
            id,
            title: input.title,
            link: input.link,
            description: input.description,
            tag: checkedTag,
            
        }

        return await this.toolsDataBase.create(tools)

    }

}