import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskSatatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/GetTaskFilterDto';

@Injectable()
export class TasksService {
  /**
   *
   */
  tasks:Task[] =[]
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto:GetTaskFilterDto) {
    return this.taskRepository.getTasks(filterDto);
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`task with Id "${id}" not found`);
    }
    return found;
  }

  async deleteTaskById (id :number):Promise <void> {
      const result = await this.taskRepository.delete(id)
          if(result.affected === 0) {
          throw new NotFoundException(`task with Id "${id}" not found`)
      }
  }

  async updateTaskStatus(id:number,status:TaskSatatus) :Promise<Task> {
     var task=await this.getTaskById(id);
     task.status =status;
    await task.save();
    return task
  }


  // updateTaskStatus(id:string,status:TaskSatatus) {
  //     const task =this.getTaskById(id);
  //     this.deleteTaskById(id)
  //     task.status=status;
  //     this.tasks.push(task)
  //     return task
  // }

  // getTaskByFilter(filterDto :GetTaskFilterDto) :Task [] {
  //   const {status ,search} =filterDto;
  //   let tasks =this.getAllTasks()
  //   if(status) {
  //       tasks = tasks.filter(task => task.status == status)
  //   }
  //   if(search) {
  //       tasks = tasks.filter(task => {
  //           task.title.includes(search) || task.description.includes(search)
  //       })
  //   }
  //   return tasks
  // }
}
