const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const eixos = [
      { nome: "Gestão" },
      { nome: "Tecnologia" },
      { nome: "Produção" },
    ];

    for (const eixo of eixos) {
      await prisma.Eixo.upsert({
        where: { nome: eixo.nome },
        update: {},
        create: eixo,
      });
    }

    console.log("Eixos da UNIVESP foram populados com sucesso!");
  } catch (error) {
    console.error("Erro durante o seed:", error);
    throw error;
  }

  try {
    const eixos = require("./data/eixos");

    for (const eixo of eixos) {
      await prisma.Eixo.upsert({
        where: { nome: eixo.nome },
        update: {},
        create: eixo,
      });
    }

    console.log("Eixos da UNIVESP foram populados com sucesso!");
  } catch (error) {
    console.error("Erro durante o seed:", error);
    throw error;
  }

  try {
    const polos = require("./data/polos");

    for (const polo of polos) {
      await prisma.polo.upsert({
        where: { nome: polo.nome },
        update: {},
        create: polo,
      });
    }

    console.log("Polos da UNIVESP foram populados com sucesso!");
  } catch (error) {
    console.error("Erro durante o seed:", error);
    throw error;
  }

  try {
    const especialidades = require("./data/especialidades");

    for (const especialidade of especialidades) {
      await prisma.especialidade.upsert({
        where: { nome: especialidade.nome },
        update: {},
        create: especialidade,
      });
    }

    console.log("Especialidades foram populados com sucesso!");
  } catch (error) {
    console.error("Erro durante o seed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Erro fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
