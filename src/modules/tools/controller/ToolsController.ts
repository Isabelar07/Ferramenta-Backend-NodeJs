import { Request, Response } from 'express';
import { IdGenerator } from "../../../shared/infra/services/IdGenerator";
import { TagBusiness } from '../../tags/business/TagBusiness';
import { TagDataBase } from '../../tags/data/TagDataBase';
import { ToolsBusiness } from "../business/ToolsBusiness";
import { ToolsDataBase } from "../data/ToolsDataBase";
import { IToolInputDTO, IToolOutputDTO } from '../interfaces/Tools';

//TODO: resolver: quando a primeira ferramenta foi criada não apareceu a tag, somente nas outras que aparecerão. Fazer funcionar: filtrar ferramentas por tag e deletar ferramenta pelo id

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
                tags: toolData.tags.map(t=>t.name),
                id: toolData.id 
            }

            return res.status(201).send(output)

        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    async get(req: Request, res: Response) {

        try {

            const tools = await toolsBusiness.get()

            return res.status(200).send(tools)

        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    async delById(req: Request, res: Response) {

        try {

            const { id } = req.params

            await toolsBusiness.delById(id);

            return res.status(204).send({message: 'tool successfully deleted.'});

        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    // async getByTag(req: Request, res: Response) {

    //     try {

    //         const { tag } = req.query 

    //         const tags = await toolsBusiness.getByTag({tag})

    //         // const output: ITagOutputQueryDTO {
    //             name: tags.tag.map(t => t.name)
    //         // }

    //         return res.status(200).send(tags)

    //     } catch (error) {
    //         return res.status(500).send({ error: error.message });
    //     }
    // }

}