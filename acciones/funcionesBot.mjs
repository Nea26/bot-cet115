import bwipjs from 'bwip-js';
import { join } from 'path';
import fs from 'fs';


export const notFound = (text)=> `No se encontro la accion ${text}`;

export const consultar = (text)=> `estas consultando por ${text}`;

export const validarNumero = (numero)=>{
    if(!numero || !validarTelefono(numero)){
        throw new Error('No se proporciono un numero valido')
    }
    return true
}

export const validarTelefono = (numero)=> /^[67]\d{3}-?\d{4}$/.test(numero);

const indiceRandom = (max=3, min=0)=> Math.floor(Math.random() * (max - min + 1)) + min;

const generarNPE = (longitud = 30)=>{
    let npe = '';
    for (let i = 0; i < longitud; i++) {
        // Generar un número aleatorio entre 0 y 9
        const digito = Math.floor(Math.random() * 10);
        npe += digito;
    }
    return npe;
}

const generateBarcode = (text, numero=null) => {
    return new Promise((resolve, reject) => {
        const barcodePath = join(process.cwd(), 'barcode.png');

        bwipjs.toBuffer({
            bcid: 'code128',
            text: text,
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: 'center'
        }, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                fs.writeFile(barcodePath, buffer, (writeErr) => {
                    if (writeErr) {
                        reject(writeErr);
                    } else {
                        resolve(barcodePath);
                    }
                });
            }
        });
    });
};

export const generarPago = async (text) => {
    const [, telefono ] = text.split(' ');
    validarNumero(telefono)
    const codigo = generarNPE();
    const barcodePath = await generateBarcode(codigo);
    return barcodePath; 
};

const respuestas = [
    { estado: "no_encontrado", mensaje: "El número no se encuentra registrado." },
    { estado: "mora", mensaje: "El número tiene dos meses de mora. Por favor, acérquese a una agencia para resolverlo." },
    { estado: "a_tiempo", mensaje: "El número está al día. Ya ha cancelado su factura" },
    { estado: "puede_cancelar", mensaje: "El número está a tiempo de cancelar su factura. Podemos apoyarle por este medio. Indique /pago seguido de su numero" }
];
export const buscarNumeroTelefonico = (text)=>{
    const [, busqueda] = text.split(' ');
    validarNumero(busqueda)
    const respuesta = respuestas[indiceRandom()]
    return respuesta.mensaje;
}

