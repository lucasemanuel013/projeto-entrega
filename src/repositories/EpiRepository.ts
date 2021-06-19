import { EntityRepository, Repository } from "typeorm";
import { Epi } from "../entities/Epi";

@EntityRepository(Epi)
class EpiRepository extends Repository<Epi> {}

export { EpiRepository }