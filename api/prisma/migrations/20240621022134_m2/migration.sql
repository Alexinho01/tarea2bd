-- CreateTable
CREATE TABLE "Correo" (
    "id_correo" SERIAL NOT NULL,
    "id_remitente" INTEGER NOT NULL,
    "id_destinatario" INTEGER NOT NULL,

    CONSTRAINT "Correo_pkey" PRIMARY KEY ("id_correo")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id_favorito" SERIAL NOT NULL,
    "id_usuario_favorito" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id_favorito")
);

-- CreateTable
CREATE TABLE "Bloqueado" (
    "id_bloqueado" SERIAL NOT NULL,
    "id_usuario_bloqueado" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Bloqueado_pkey" PRIMARY KEY ("id_bloqueado")
);

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_id_usuario_favorito_fkey" FOREIGN KEY ("id_usuario_favorito") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloqueado" ADD CONSTRAINT "Bloqueado_id_usuario_bloqueado_fkey" FOREIGN KEY ("id_usuario_bloqueado") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
