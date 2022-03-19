export interface Cliente {
    id:string,
    co_cliente: String,
    razon_social: String,
    rif: String,
    direccion_fiscal: String,
    direccion_entrega: String,
    email: String,
    telefono: String,
    inactivo: String,
    agente_retencion: String,
    porcentaje_desc_global: String,
    estatus: String,
    id_zona:number,
    id_tipo_cliente:number,
    id_segmento:number,
    id_vendedor:number,
    id_condiciones_pagos:number
}