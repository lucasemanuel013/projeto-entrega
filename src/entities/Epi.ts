import { Entity, PrimaryColumn, CreateDateColumn, Column, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'

import { v4 as uuid } from 'uuid'
import { Funcionario } from './Funcionario';

@Entity('entregaEPI')
class Epi {

  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: 'funcionario_id' })
  @ManyToOne(() => Funcionario)
  funcionario: Funcionario;

  @Column()
  funcionario_id: string;

  @Column()
  nome_epi: string;

  @Column()
  data_entrega: Date;

  @Column()
  quantidade_entregue: number;

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

export { Epi }