import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * A WeChat-identified user. `openid` is the unique WeChat identity and the
 * only required field; nickname/avatar are optional and populated later.
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  openid!: string;

  @Column({ type: 'varchar', nullable: true })
  nickname!: string | null;

  @Column({ type: 'varchar', nullable: true })
  avatar!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
