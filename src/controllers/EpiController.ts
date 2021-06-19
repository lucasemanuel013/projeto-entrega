import { Request, Response } from 'express'
import { EpiServices } from '../services/EpiServices'

class EpiController {

  async create(request: Request, response: Response) {
    try {
      const { funcionario_id, nome_epi, data_entrega, quantidade_entregue} = request.body

      if (!funcionario_id || !nome_epi || !data_entrega || !quantidade_entregue) {
        throw new Error('Ausência de campo. Envie funcionario_id, nome_epi, data_entrega e quantidade_entregue')
      }

      const epiServices = new EpiServices()

      const epiCriada = await epiServices.create({
        funcionario_id, 
        nome_epi, 
        data_entrega, 
        quantidade_entregue
      })

      return response.json(epiCriada)
    } catch (error) {
      console.log(error)
      return response.json({ message: error.message })
    }
  }

  async index(request: Request, response: Response) {
    const epiServices = new EpiServices()
    const epis = await epiServices.index()
    return response.json(epis)
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params
      const epiServices = new EpiServices()
      const epi = await epiServices.show({id})
      return response.json(epi)
    } catch (error) {
      return response.json({ message: error.message })
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params
      const epiServices = new EpiServices()
      await epiServices.delete({id})
      return response.json({ message: 'Epi deletada' })
    } catch (error) {
      return response.json({ message: error.message })
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { funcionario_id, nome_epi, data_entrega, quantidade_entregue } = request.body

      if (!funcionario_id || !nome_epi || !data_entrega || !quantidade_entregue) {
        throw new Error('Ausência de campo. Envie funcionario_id, nome_epi, data_entrega e quantidade_entregue')
      }

      const epiServices = new EpiServices()
      
      const epiAtualizada = await epiServices.update({
        id,
        funcionario_id, 
        nome_epi, 
        data_entrega, 
        quantidade_entregue
      })

      return response.json(epiAtualizada)

    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

}

export { EpiController }