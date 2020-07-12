import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { TaskSatatus } from "./task-status.enum";

@Entity('Task')
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;
    
    @Column()
    status:TaskSatatus
}