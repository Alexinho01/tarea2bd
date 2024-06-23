import {Elysia} from "elysia";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const verificar = new Elysia()
    .get("/api1-1/verificar", async ({ query }) => {

        try{

            const {correo,password} = query

            const user = await prisma.usuario.findUnique({
                where: {
                    direccion_correo: correo,
                    password: password
                }
            })

            if (user && user.password === password){
                return{
                    "estado": 200,
                    "credenciales": true
                }

            }else{
                return{
                    "estado": 400,
                    "credenciales": false
                }
            }
        }catch(error){
            return error
        }
    })