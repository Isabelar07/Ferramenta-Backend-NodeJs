import { DataBase } from "../../../shared/infra/data/DataBase";
import { BaseError } from "../../../shared/infra/error/BaseError";
import { DuplicateEntryError } from "../../../shared/infra/error/DuplicateEntryError";
import { ITool } from "../interfaces/Tools";

export class ToolsDataBase extends DataBase {

    private static TABLE_NAME = 'Tools';

    async create(tool: ITool): Promise<ITool> {

        try {
            await DataBase.connection()
            .insert({
                id: tool.id,
                title: tool.title,
                link: tool.link,
                description: tool.description
            }).into(ToolsDataBase.TABLE_NAME);
            
            if (tool.tags) {
                for (let tag of tool.tags) {
                    await DataBase.connection
                    .raw(`INSERT INTO Tools_And_Tag (tag_id, tools_id) VALUES ("${tag.id}", "${tool.id}")`)
                }
            }

            return tool

        } catch (error) {
            if (error.errno === 1062) {
                throw new DuplicateEntryError();
            }
            
            throw new BaseError(error.message || error.sqlMessage);
        }
    }
}