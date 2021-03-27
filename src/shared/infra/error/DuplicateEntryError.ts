import { BaseError } from "./BaseError";

export class DuplicateEntryError extends BaseError{
    constructor(){
        super("Valor duplicado", 406);
    }
}