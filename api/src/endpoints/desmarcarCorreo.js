import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const desmarcarCorreo = new Elysia()
    .delete("api/desmarcarcorreo", async ({body}) => {
        try{
            const usuario = await prisma.usuario.findUnique({
                where: {
                    direccion_correo: body.correo
                }
            })

            const usuario_bloquear = await prisma.usuario.findUnique({
                where: {
                    direccion_correo: body.correo_favorito
                }
            })
            if (usuario == null){
                return {
                    "estado": 200,
                    "mensaje": "No existe el usuario"
                }
            }
            else if (usuario_bloquear == null){
                return{
                    "estado":200,
                    "mensaje": "No existe el usuario favorito"
                }
            }


            if (usuario.password == body.clave){
                
                const favoritoDesmarcar = await prisma.usuario.findUnique({
                    where:{
                        direccion_correo: body.correo_favorito
                    }
                })

                if(favoritoDesmarcar != null){

                    await prisma.favorito.delete({
                        where:  {
                            id_usuario_favorito: favoritoDesmarcar.id_usuario_favorito
                        }
                    })
                    console.log(body.correo + "ha desmarcado el correo " + favoritoDesmarcar.id_favorito + "como favorito")
                    return{
                        "estado": 200,
                        "mensaje": "Se ha eliminado el correo marcado como favorito"
                    }
                }
                else{
                    return{
                        "estado": 400,
                        "mensaje": "No existe el correo a desmarcar"
                    }
                }
            }

        }catch(error){
            console.log(error)
            return{
                "estado": 400,
                "mensaje": "No se ha podido eliminar el Favorito"
            }
        }})
