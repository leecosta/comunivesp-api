const { buscarUsuario } = require("../services/usuarioServices");
const prisma = require("../lib/prisma");

async function getUser(req, res) {
  const userId = req.params.id;

  const usuario = await prisma.usuarios.findUnique({
    where: { id: userId },
    include: {
      eixo: true,
      polo: true,
      especialidade: true,
    },
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  return res.json({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    criadoEm: usuario.criado_em,
    anoIngresso: usuario.ano_ingresso,
    eixoId: usuario.eixoId,
    eixo: usuario.eixo
      ? {
          id: usuario.eixo.id,
          nome: usuario.eixo.nome,
        }
      : null,
    poloId: usuario.poloId,
    polo: usuario.polo
      ? {
          id: usuario.polo.id,
          nome: usuario.polo.nome,
        }
      : null,
    especialidadeId: usuario.especialidadeId,
    especialidade: usuario.especialidade
      ? {
          id: usuario.especialidade.id,
          nome: usuario.especialidade.nome,
        }
      : null,
  });
}

async function listarEixos(req, res) {
  const eixos = await prisma.eixo.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  return res.json(eixos);
}

async function listarPolos(req, res) {
  const polos = await prisma.polo.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  return res.json(polos);
}

async function listarEspecialidades(req, res) {
  const especialidades = await prisma.especialidade.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  return res.json(especialidades);
}

async function atualizarUsuario(req, res) {
  const userId = req.params.id;
  const { nome, eixoId, poloId, especialidadeId, anoIngresso } = req.body;

  // Verifica se o usuário está tentando editar seus próprios dados
  if (userId !== req.usuarioId) {
    throw new Error("Não autorizado a editar dados de outro usuário.");
  }

  const usuario = await prisma.usuarios.findUnique({
    where: { id: userId },
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  // Converte dados para número se existirem
  const eixoIdNumber = eixoId ? Number(eixoId) : null;
  const poloIdNumber = poloId ? Number(poloId) : null;
  const especialidadeIdNumber = especialidadeId
    ? Number(especialidadeId)
    : null;
  const anoIngressoNumber = anoIngresso ? Number(anoIngresso) : null;

  const usuarioAtualizado = await prisma.usuarios.update({
    where: { id: userId },
    data: {
      nome,
      eixoId: eixoIdNumber,
      poloId: poloIdNumber,
      especialidadeId: especialidadeIdNumber,
      ano_ingresso: anoIngressoNumber,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      eixoId: true,
      poloId: true,
      especialidadeId: true,
      ano_ingresso: true,
      criado_em: true,
      eixo: {
        select: {
          id: true,
          nome: true,
        },
      },
      polo: {
        select: {
          id: true,
          nome: true,
        },
      },
      especialidade: {
        select: {
          id: true,
          nome: true,
        },
      },
    },
  });

  return res.json({
    ...usuarioAtualizado,
    eixo: usuarioAtualizado.eixo
      ? {
          id: usuarioAtualizado.eixo.id,
          nome: usuarioAtualizado.eixo.nome,
        }
      : null,
    polo: usuarioAtualizado.polo
      ? {
          id: usuarioAtualizado.polo.id,
          nome: usuarioAtualizado.polo.nome,
        }
      : null,
    especialidade: usuarioAtualizado.especialidade
      ? {
          id: usuarioAtualizado.especialidade.id,
          nome: usuarioAtualizado.especialidade.nome,
        }
      : null,
  });
}

module.exports = {
  getUser,
  listarEixos,
  listarPolos,
  listarEspecialidades,
  atualizarUsuario,
};
