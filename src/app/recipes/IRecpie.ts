import { Integredient } from "../interfaces/integredient";

export interface IRecpie {
    name:string,
    description:string,
    imagePath:string,
    ingredients:Integredient[]
}