import { Request, Response } from 'express';
import { IdGenerator } from "../../../shared/infra/services/IdGenerator";
import { TagBusiness } from "../business/TagBusiness";
import { TagDataBase } from "../data/TagDataBase";
import { ITag } from '../interfaces/Tag';

const tagBusiness = new TagBusiness (
    new TagDataBase(),
    new IdGenerator()
);

export class TagController {

    async create(req: Request, res: Response) {

        try {

            const tags = req.body

            await tagBusiness.create(tags)

            res.status(201).send({message: 'tag created sucessfully'});

        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
}