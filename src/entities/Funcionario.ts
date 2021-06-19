import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Column } from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity('funcionarios')
class Funcionario {

  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  funcao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Funcionario }
