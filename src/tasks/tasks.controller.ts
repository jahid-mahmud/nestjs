import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseBoolPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/TaskStatusValidationPipe';
import { TaskSatatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/GetTaskFilterDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
    /**
     *
     */
    constructor(private taskService :TasksService) {
        
        
    }

    @Get()
    getTasks (@Query() filterDto : GetTaskFilterDto) :Promise<Task[]> {
        
            return this.taskService.getTasks(filterDto)
        
    }

    @Get('/:id')
    getTaskByID (@Param('id' ,ParseIntPipe) id :number) : Promise<Task> {
        console.log("id" ,id)
       return this.taskService.getTaskById(id);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(
      @Body() createTaskDto : CreateTaskDto
    ) :Promise<Task> {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask (@Param('id',ParseIntPipe) id :number):Promise<void> {
       return this.taskService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe) id: number,
        @Body('status',TaskStatusValidationPipe) status:TaskSatatus
    ) :Promise<Task>
    {
        return this.taskService.updateTaskStatus(id,status)
    }


}
