import { getCustomRepository } from 'typeorm'
import { FuncionarioRepository } from '../repositories/FuncionarioRepository'

interface IFuncionarioCreate {
  nome: string;
  cpf: string;
  funcao: string;
}

class FuncionarioServices {

  async create({ nome, cpf, funcao }: IFuncionarioCreate) {

    const funcionarioRepository = getCustomRepository(FuncionarioRepository)

    const verificarSeFuncionarioExiste = await funcionarioRepository.findOne({
      nome
    })

    if (verificarSeFuncionarioExiste) {
      throw new Error('Esse funcionario já foi cadastrado!')
    }

    const funcionario = funcionarioRepository.create({
      nome,
      cpf,
      funcao
    })

    await funcionarioRepository.save(funcionario)

    return funcionario
  }

  async index() {
    const funcionarioRepository = getCustomRepository(FuncionarioRepository)

    const funcionarios = await funcionarioRepository.find()

    return funcionarios;
  }

}

export { FuncionarioServices }