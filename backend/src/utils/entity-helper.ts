import * as crypto from 'node:crypto';
import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';

export class EntityHelper extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @BeforeInsert()
  private beforeInsert() {
    this.id = this.generateId();
  }

  private generateId(): string {
    const hash = crypto.createHash('sha256');

    hash.update(crypto.randomBytes(16).toString('hex'), 'utf-8');
    const hashValue = hash.digest('hex');
    return hashValue.slice(0, 8);
  }
}
