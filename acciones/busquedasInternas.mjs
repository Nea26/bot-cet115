import { consultar, notFound, buscarNumeroTelefonico, generarPago } from "./index.mjs";

export const acciones = [
  {
    id: 1,
    command: "consultar",
    fn: consultar
  },
  {
    id: 2, 
    command: "buscar",
    fn: buscarNumeroTelefonico
  },
  {
    id: 3, 
    command: "pago",
    fn: generarPago
  }
];

export const buscarAccion = (text)=> acciones.find((element)=> text.includes(element.command))?.fn ?? notFound;
