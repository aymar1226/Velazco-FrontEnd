export interface Producto{
    id: number;
    nombre: String;
    descripcion: String;
    stock: String;
    precio: number;
    imagen: any;
    estado: String;
    categoria: Categoria

}

export interface Categoria{
    id: number;
    nombre: String;
    descripcion: String;
    estado: String;
}

export interface Credentials{
    email: string;
    password: string;
}

export interface Carrito{
    id:number;
    usuario_id:number;
    fecha_Creacion:Date;
    fecha_actualiz:Date;
    total:number;
}

export interface CarritoItem{
    id:number;
    carrito:Carrito;
    producto: Producto;
    cantidad:number;
    total : number;
}

export interface ProductoDTO{
    id:number;
    cantidad: number;
}

export interface Persona{
    id:number;
    documento: String;
    nombre: String;
    ap_paterno: String;
    ap_materno: String;
    telefono: String;
    direccion: String;
    estado: String;
}

export interface Cliente{
    id:number;
    persona:Persona;
    estado:String;
}

export interface Empleado{
    id:number;
    persona:Persona;
    cargo:Cargo;
    estado:String;
}

export interface Cargo{
    id:number;
    nombre: String;
    estado: String;
}



export interface Usuario{
    id:number;
    correo: String;
    password: String;
    privilegio :Privilegio;
    estado: String;
    persona: Persona;

}

export interface Privilegio{
    id: number;
    nombre:String;
    estado:String;
}


export interface Proveedor{
    id: number;
    nombre:String;
    telefono:String;
    correo: String;
    direccion:String;
    estado:String;
}

export interface Orden{
    id : number;
    fecha_venta: Date;
    total : number;
    codigo : string;
    estado : string;
    usuario : Usuario;
}

export interface DetalleOrden{
    id : number;
    cantidad : number;
    precioxunidad : number;
    total : number;
    estado : string;
    orden : Orden;
    producto : Producto;
}


export interface RegistroDTO{
    correo: String;
    password: String;    
    documento: String;
    nombre: String;
    ap_paterno: String;
    ap_materno: String;
    telefono: String;
    direccion: String;
    
}

export interface PersonaUsuarioDTO{

    personaId:number;
    personaNombre:String;
    usuarioId:number;
    usuarioPrivilegio:String;
    usuarioCorreo:String;
    usuarioContrasenia:String;
    estadoUsuario:String;
}

export interface PaymentDTO{
    paymentIntentId:string;
    clientSecret:string;
}

export interface InfoDTO{
    documento :string;
    nombre :string;
    ap_paterno :string;
    ap_materno :string;
    telefono :string;
    direccion :string;
    correo :string;
}






