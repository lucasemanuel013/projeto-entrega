import { Router } from "express";
import { EpiController } from "./controllers/EpiController";
import { FuncionarioController } from './controllers/FuncionarioController'

const routes = Router()

const funcionarioController = new FuncionarioController()
const episController = new EpiController()

routes.post('/funcionarios', funcionarioController.create)
routes.get('/funcionarios', funcionarioController.index)

routes.post('/entregaepi', episController.create)
routes.get('/entregaepi', episController.index)
routes.get('/entregaepi/:id', episController.show)
routes.delete('/entregaepi/:id', episController.delete)
routes.put('/entregaepi/:id', episController.update)

export { routes }