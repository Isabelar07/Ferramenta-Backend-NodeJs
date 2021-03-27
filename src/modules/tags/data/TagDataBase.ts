import { DataBase } from "../../../shared/infra/data/DataBase";
import { BaseError } from "../../../shared/infra/error/BaseError";
import { DuplicateEntryError } from "../../../shared/infra/error/DuplicateEntryError";
import { ITag } from "../interfaces/Tag";

export class TagDataBase extends DataBase {

    private static TABLE_NAME = 'Tag';

    async create(tag: ITag): Promise<void> {

        try {
            await DataBase.connection()
            .insert({
                id: tag.id,
                tag: tag.tag
            }).into(TagDataBase.TABLE_NAME);

        } catch (error) {
            if (error.errno === 1062) {
                throw new DuplicateEntryError();
            }
            
            throw new BaseError(error.message || error.sqlMessage);
        }
    }
}