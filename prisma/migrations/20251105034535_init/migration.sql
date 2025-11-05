-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ABERTA', 'FECHADA', 'RESOLVIDA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "senha" TEXT,
    "email_verificacao_token" VARCHAR(255),
    "email_verificado" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email_verificacao_token_expira_em" TIMESTAMP(3),
    "ano_ingresso" INTEGER,
    "eixoId" INTEGER,
    "poloId" INTEGER,
    "especialidadeId" INTEGER,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eixo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Eixo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "polo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "polo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "especialidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "especialidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duvidas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ABERTA',
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alunoId" UUID NOT NULL,
    "professorId" UUID,

    CONSTRAINT "duvidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagens" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duvidaId" INTEGER NOT NULL,
    "autorId" UUID NOT NULL,
    "autorNome" TEXT NOT NULL,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Eixo_nome_key" ON "Eixo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "polo_nome_key" ON "polo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "especialidade_nome_key" ON "especialidade"("nome");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_eixoId_fkey" FOREIGN KEY ("eixoId") REFERENCES "Eixo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "polo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_especialidadeId_fkey" FOREIGN KEY ("especialidadeId") REFERENCES "especialidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duvidas" ADD CONSTRAINT "duvidas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duvidas" ADD CONSTRAINT "duvidas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_duvidaId_fkey" FOREIGN KEY ("duvidaId") REFERENCES "duvidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
