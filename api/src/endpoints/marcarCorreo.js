import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const marcarCorreo = new Elysia()
    .post("/api1-1/marcarCorreo", async({ body }) => {

        try{
            const usuario_marcador = await prisma.usuario.findUnique({
                where: {
                    direccion_correo: body.correo
                }
            })

            const usuario_marcado = await prisma.usuario.findUnique({
                where: {
                    direccion_correo: body.correo_favorito
                }
            })

            if (usuario_marcado == null || usuario_marcador == null){
                return {
                    "estado": 404,
                    "mensaje": "Tu usuario o el usuario a marcar no existe"
                }
            }

            if (usuario_marcador.password == body.clave){
                
                const nuevoFavorito = await prisma.favorito.create({
                    data: {
                        id_usuario: usuario_marcador.id_usuario,
                        id_usuario_favorito: usuario_marcado.id_usuario
                    } 
                })

                console.log(usuario_marcador.direccion_correo + " ha agregado a " + usuario_marcado.direccion_correo + " como favorito.")

                return {
                    "estado": 200,
                    "mensaje": "El usuario ha sido agregado a favoritos con éxito."
                }
            }

            else{
                return {
                    "estado": 401,
                    "mensaje": "Las credenciales no coinciden."
                }
            }

        } catch (error) {
            console.log(error)
            return {
                "estado": 400,
                "mensaje": "No se ha podido marcar al contacto."
            }
        }
    })

