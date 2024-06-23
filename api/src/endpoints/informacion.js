import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const informacion = new Elysia()
    .get("/api1-1/informacion/:correo", async ({ params }) => {
        const { correo } = params;

        if (!correo){
            return {
                "estado": 400,
                "mensaje": "Debe proporcionar un correo electrónico"
            };
        }

        try {  
            const usuario = await prisma.usuario.findUnique({
                where: {
                    direccion_correo: correo,
                }
            });

            if (!usuario) {
                return {
                    "estado": 404,
                    "mensaje": "Usuario no encontrado"
                };
            }

            return {
                "estado": 200,
                "nombre": usuario.nombre,
                "correo": usuario.direccion_correo,
                "descripcion": usuario.descripcion
            };
        } catch (error) {
            return {
                "estado": 500,
                "mensaje": "Error del servidor",
                "detalle": error.message
            };
        }
    });

