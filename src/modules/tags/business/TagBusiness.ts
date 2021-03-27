import { BaseError } from "../../../shared/infra/error/BaseError";
import { InvalidInputError } from "../../../shared/infra/error/InvalidInputError";
import { IdGenerator } from "../../../shared/infra/services/IdGenerator";
import { TagDataBase } from "../data/TagDataBase";
import { ITagInputDTO } from "../interfaces/Tag";

export class TagBusiness {
    constructor(
        private tagDataBase: TagDataBase,
        private idGenerator: IdGenerator,
    ) {}

    async create(input: ITagInputDTO): Promise<void> {

        try {

            if(!input.tag) {
                throw new InvalidInputError('Invalid entry for registration. Enter the tag.')   
            }
    
            const id = await this.idGenerator.generate();
    
            const tag = {
                id,
                tag: input.tag
            }
    
            await this.tagDataBase.create(tag)

        } catch (error) {
            throw new BaseError(error.message || error.sqlMessage)
        }
        
}

}
