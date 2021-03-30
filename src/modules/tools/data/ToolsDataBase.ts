import { DataBase } from "../../../shared/infra/data/DataBase";
import { BaseError } from "../../../shared/infra/error/BaseError";
import { DuplicateEntryError } from "../../../shared/infra/error/DuplicateEntryError";
import { ITagOutputDTO } from "../../tags/interfaces/Tag";
import { ITool, IToolOutputDTO } from "../interfaces/Tools";

export class ToolsDataBase extends DataBase {

    private static TABLE_NAME = 'Tools';
    private static INTER_TABLE_NAME = 'Tools_And_Tag';

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

    async get(): Promise<IToolOutputDTO[]>{

        try {

            const result = await DataBase.connection()
            .select('*')
            .from(ToolsDataBase.TABLE_NAME);

            const tools: IToolOutputDTO[] = [];

            for (let tool of result) {

                const tags: ITagOutputDTO[] = [];

                const toolTag = await DataBase.connection.raw(`
                SELECT tg.name
                FROM ${ToolsDataBase.TABLE_NAME} tl
                JOIN ${ToolsDataBase.INTER_TABLE_NAME} tltg
                ON tl.id = tltg.tools_id
                JOIN Tag tg
                ON tltg.tag_id = tg.id
                WHERE tl.id = "${tool.id}"
                `);

                for (let tag of toolTag[0]) {
                    tags.push({name: tag.name});
                }

                tools.push({
                    id: tool.id,
                    title: tool.title,
                    link: tool.link,
                    description: tool.description,
                    tags: tags.map(t => t.name)
                });
                
            }

            return tools

        } catch (error) {
            throw new BaseError(error.message || error.sqlMessage);
        }
    }

    async getByTag(tag: string): Promise<IToolOutputDTO[]>{

        try {

            const result = await DataBase.connection.raw(`
            SELECT tl*
            FROM ${ToolsDataBase.TABLE_NAME} tl
            JOIN ${ToolsDataBase.INTER_TABLE_NAME} tltg
            ON tl.id = tltg.tools_id
            JOIN Tag tg
            ON tltg.tag_id = tg.id
            WHERE tg.name = "${tag}"
            `)

            const tools: IToolOutputDTO[] = [];

            for (let tool of result) {

                const tags: ITagOutputDTO[] = [];

                const toolTag = await DataBase.connection.raw(`
                SELECT tg.name
                FROM ${ToolsDataBase.TABLE_NAME} tl
                JOIN ${ToolsDataBase.INTER_TABLE_NAME} tltg
                ON tl.id = tltg.tools_id
                JOIN Tag tg
                ON tltg.tag_id = tg.id
                WHERE tl.id = "${tool.id}"
                `);

                for (let tag of toolTag[0]) {
                    tags.push({name: tag.name});
                }

                tools.push({
                    id: tool.id,
                    title: tool.title,
                    link: tool.link,
                    description: tool.description,
                    tags: tags.map(t => t.name)
                });
                
            }

            return tools

        } catch (error) {
            throw new BaseError(error.message || error.sqlMessage);
        }
    }

}