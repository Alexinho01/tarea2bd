import {Elysia} from "elysia";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const bloquear = new Elysia()
    .post("/api1-1/bloquear", async ({ body }) => {
    //const { correo, pass, correo_bloquear } = body;

    try {
        const bloqueador = await prisma.usuario.findUnique({
            where: {direccion_correo: body.correo}
        })

        const bloqueado = await prisma.usuario.findUnique({
            where: {
                direccion_correo: body.correo_bloquear
            }
        })

        if (bloqueador == null || bloqueado == null ){
            return {
                "estado": 404,
                "mensaje": "El usuario no existe"
            }
        }

        if (bloqueador.password != body.clave ){
            return {
                "estado": 401,
                "mensaje": "clave no coincide"
            }
        }

        if (bloqueador.password == body.clave){

            const nuevoBloqueado = await prisma.bloqueado.create({
                data: {
                    id_usuario_bloqueado: bloqueado.id_usuario,
                    id_usuario: bloqueador.id_usuario
                }
            })
            return{
                "estado": 200,
                "mensaje": "Usuario  bloqueado exitosamente"
            }
        }

    } catch (error) {
        console.error("Error al bloquear usuario:", error);
        return {
            "estado": 400,
            "mensaje": "Ocurrió un error al intentar bloquear al usuario"
        };
    }
});