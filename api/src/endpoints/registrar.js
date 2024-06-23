import {Elysia} from "elysia";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const registrar = new Elysia()
    .post("/api1-1/registrar", async({body}) => {
        
        if(
            body.correo == undefined || body.nombre ==undefined || body.pass == undefined || body.descripcion == undefined
        ){
            return {
                "estado": 400,
                "mensaje": "Ha habido un error"
            }
        }
        const usuario = await prisma.usuario.findUnique({
            where:{
                direccion_correo: body.correo
            }
        })
        if (usuario){
            return{
                "estado": 400,
                "mensaje": "El correo a crear ya existe, intente con otra"
            }
        }
        try{
            const nuevoUsuario = await prisma.usuario.create(
                {
                    data:{
                        direccion_correo:body.correo,
                        password:body.pass,
                        nombre: body.nombre,
                        descripcion: body.descripcion,
                    }
                }
            );
            console.log("Se ha registrado un nuevo usuario")
        }catch (error){
            return{
                "estado": 400,
                "mensaje": "No se ha podido registrar el usuario"
            }
        }
        return {
            "estado": 200,
            "mensaje": "El usuario se ha registrado correctamente"
        };
    })
    