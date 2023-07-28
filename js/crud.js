export class DataBase {
    constructor(id, nombre, apellPat, apellMat, corrElectr, contraseña, ciudad) {
        this.id = id;
        this.nombre = nombre;
        this.apellPat = apellPat;
        this.apellMat = apellMat;
        this.corrElectr = corrElectr;
        this.contraseña = contraseña;
        this.ciudad = ciudad;
    }
}

export class RecetaUsuario {
    constructor(id, nombreComida, precioComida, cantComida, horario, descripcion, imagenComida) {
        this.id = id;
        this.nombreComida = nombreComida;
        this.precioComida = precioComida;
        this.cantComida = cantComida;
        this.horario = horario;
        this.descripcion = descripcion;
        // this.imagenComida = imagenComida;
    }
}