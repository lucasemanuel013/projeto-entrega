import { Request, Response } from 'express'
import { FuncionarioServices } from '../services/FuncionarioServices'

class FuncionarioController {
  async create(request: Request, response: Response) {
    try {
      const { nome, cpf, funcao } = request.body

      if (!nome || !cpf || !funcao) {
        throw new Error('Ausência de campo. Envie nome, cpf e funcao')
      }

      const funcionarioServices = new FuncionarioServices()
      const funcionarioCriado = await funcionarioServices.create({
        nome,
        cpf,
        funcao
      })
      
      return response.json(funcionarioCriado)

    } catch (error) {
      return response.json({ message: error.message })
    }
  }

  async index(request: Request, response: Response) {
    const funcionarioServices = new FuncionarioServices()
    const funcionarios = await funcionarioServices.index()
    return response.json(funcionarios)
  }

}

export { FuncionarioController }