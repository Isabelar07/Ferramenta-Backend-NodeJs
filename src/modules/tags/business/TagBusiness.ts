import { BaseError } from "../../../shared/infra/error/BaseError";
import { InvalidInputError } from "../../../shared/infra/error/InvalidInputError";
import { IdGenerator } from "../../../shared/infra/services/IdGenerator";
import { TagDataBase } from "../data/TagDataBase";
import { ITag } from "../interfaces/Tag";

export class TagBusiness {
    constructor(
        private tagDataBase: TagDataBase,
        private idGenerator: IdGenerator,
    ) {}

    async create(tags: string): Promise<void> {

        try {

            if(!tags) {
                throw new InvalidInputError('Invalid entry for registration. Enter the tag.')   
            }
    
            const id = await this.idGenerator.generate();
    
            const tag: ITag = {
                id,
                name: tags
            }
            
            const tagDataBase = new TagDataBase()
            await tagDataBase.create(tag)

        } catch (error) {
            throw new BaseError(error.message || error.sqlMessage)
        }
        
}

    async get(): Promise<ITag[]> {
        
        try {

            const tag: ITag[] = await this.tagDataBase.get();

            if (!tag) {
                throw new BaseError('Tag not found')
            }

            return tag

        } catch (error) {
            throw new BaseError(error.message || error.sqlMessage)
        }
    }

}
