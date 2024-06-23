import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const ver_fav = new Elysia()
    .get("api1-1/ver_fav", async ({ query }) => {

        try {

            const usuario = await prisma.usuario.findUnique({
                where: {
                    direccion_correo: query.correo
                }
            })

            if (usuario == null){
                return {
                    "estado": 200,
                    "mensaje": "No existe el usuario"
                }
            }
            
            if (usuario.password == query.clave){
                
                //Se obtienen los contactos del usuario a traves del usuario_id
                const favorito = await prisma.favorito.findMany({
                    where: {
                        id_usuario: usuario.id_usuario
                    },
                    select:{
                        usuario_favorito: {
                            select:
                            {
                                direccion_correo: true
                            }
                        },
                    }
                });

                const resultadoFormateado = favorito.map(favoritos => favoritos.usuario_favorito.direccion_correo);

                console.log(query.correo + " ha solicitado ver sus contactos.")

                return {
                    "estado": 200,
                    "correos": resultadoFormateado
                }
  
            }

            else{
                return {
                    "estado": 400,
                    "mensaje": "Las credenciales no coinciden"
                }
            }

        } catch (error) {
            console.log(error)
            return {
                "estado": 400,
                "mensaje": "No se han podido revisar los correos favoritos"
            }
            
        }
    })