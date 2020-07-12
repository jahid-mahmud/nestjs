import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskSatatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/GetTaskFilterDto";
import { async } from "rxjs";
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto:CreateTaskDto) {
        const {title,description} =createTaskDto
    const task =new Task();
    task.title=title;
    task.description=description;
    task.status=TaskSatatus.OPEN;
    await task.save()
    return task

    }

    async getTasks(filterDto :GetTaskFilterDto) :Promise<Task []> {
        const {status,search} =filterDto;
        const query = this.createQueryBuilder('task');

        if(status) {
           query.andWhere('task.status = :status',{status})
        }
        if(search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)' , {search : `%${search}%`})
        }

        const tasks =await query.getMany();
        return tasks

    }
}