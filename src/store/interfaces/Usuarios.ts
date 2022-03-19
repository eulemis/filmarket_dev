export interface Usuarios {
    id:string,
    name:string,
    device_name:string,
    email:string,
    password:string,
    password_confirmation:string,
    is_admin:number
    razon_social:string,
    rif:string, 
    direccion_fiscal:string,
    agente_retencion:boolean,
    porcentaje_desc_global:number
    cedula:string,
    telefono:string
}