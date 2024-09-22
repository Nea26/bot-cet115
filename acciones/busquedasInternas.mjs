import { consultar, notFound } from "./index.mjs";

export const acciones = [
  {
    id: 1,
    command: "consultar",
    fn: consultar
  }
];

export const buscarAccion = (text)=> acciones.find((element)=> text.includes(element.command))?.fn ?? notFound;
