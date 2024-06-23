/*
  Warnings:

  - A unique constraint covering the columns `[id_usuario_favorito]` on the table `Favorito` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorito_id_usuario_favorito_key" ON "Favorito"("id_usuario_favorito");
