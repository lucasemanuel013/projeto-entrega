import { EntityRepository, Repository } from "typeorm";
import { Funcionario } from "../entities/Funcionario";


@EntityRepository(Funcionario)
class FuncionarioRepository extends Repository<Funcionario> {}

export { FuncionarioRepository }