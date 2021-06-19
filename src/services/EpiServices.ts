import { getCustomRepository } from 'typeorm'
import { EpiRepository } from '../repositories/EpiRepository'
import { FuncionarioRepository } from '../repositories/FuncionarioRepository'

interface IEpiCreate {
  funcionario_id: string;
  nome_epi: string;
  data_entrega: Date;
  quantidade_entregue: number;
}

interface IEpiUpdate {
  id: string;
  funcionario_id: string;
  nome_epi: string;
  data_entrega: Date;
  quantidade_entregue: number;
}

interface IEpiShow {
  id: string
}

class EpiServices {
  async create({ funcionario_id, nome_epi, data_entrega, quantidade_entregue }: IEpiCreate) {
    const epiRepository = getCustomRepository(EpiRepository)
    const funcionarioRepository = getCustomRepository(FuncionarioRepository)
    
    const procurarFuncionario = await funcionarioRepository.findOne({
      id: funcionario_id
    })

    if (!procurarFuncionario) {
      throw new Error('Nenhum responsável encontrado com esse id')
    }

    const epi = epiRepository.create({
      funcionario_id,
      nome_epi,
      data_entrega,
      quantidade_entregue
    })

    await epiRepository.save(epi)

    return epi
  }
  async index() {
    const epiRepository = getCustomRepository(EpiRepository)

    const epis = await epiRepository.find({
      relations: ['funcionario']
    })

    return epis
  }

  async show({ id }: IEpiShow) {
    const epiRepository = getCustomRepository(EpiRepository)
    
    const epi = await epiRepository.findOne(id, {
      relations: ['funcionario']
    })

    if (!epi) {
      throw new Error('Nenhuma Epi foi encontrada')
    }


    return epi
  }

  
  async delete({ id }: IEpiShow) {
    const epiRepository = getCustomRepository(EpiRepository)

    const epi = await epiRepository.findOne({ id })

    if (!epi) {
      throw new Error('Nenhuma Epi foi encontrada')
    }

    return await epiRepository.delete({ id })
  }

  async update({ id, quantidade_entregue, data_entrega, funcionario_id, nome_epi }: IEpiUpdate) {
    const epiRepository = getCustomRepository(EpiRepository)
    const funcionarioRepository = getCustomRepository(FuncionarioRepository)
    
    const buscarEpi = await epiRepository.findOne({
      id
    })

    if (!buscarEpi) {
      throw new Error('Nenhum entrega encontrada')
    }

    const funcionario = await funcionarioRepository.findOne({
      id: funcionario_id
    })

    if (!funcionario) {
      throw new Error('Nenhum funcionario encontrado')
    }

    epiRepository.update(id, {
      quantidade_entregue,
      data_entrega,
      funcionario_id,
      nome_epi
    })

    const epi = epiRepository.findOne(id)
    return epi
  }
}

export { EpiServices }