import { Request, Response } from 'express';
import { IdGenerator } from "../../../shared/infra/services/IdGenerator";
import { TagBusiness } from '../../tags/business/TagBusiness';
import { TagDataBase } from '../../tags/data/TagDataBase';
import { ToolsBusiness } from "../business/ToolsBusiness";
import { ToolsDataBase } from "../data/ToolsDataBase";
import { IToolInputDTO, IToolOutputDTO } from '../interfaces/Tools';

const toolsBusiness = new ToolsBusiness(
    new ToolsDataBase(),
    new TagBusiness(new TagDataBase(), new IdGenerator()),
    new IdGenerator(),
);

export class ToolsController {

    async create(req: Request, res: Response) {

        try {

            const { title, link, description, tags } = req.body as IToolInputDTO

            const toolData = await toolsBusiness.create({
                title,
                link,
                description,
                tags
            })

            const output: IToolOutputDTO = {
                title: title,
                link: link,
                description: description,
                tags: toolData.tags.map(t=>t.tags),
                id: toolData.id, 
            }

            return res.status(201).send(output)

        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}