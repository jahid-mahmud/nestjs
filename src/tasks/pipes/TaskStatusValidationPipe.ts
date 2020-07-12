import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskSatatus } from "../task-status.enum";


export class TaskStatusValidationPipe implements PipeTransform{
    allowStatus=[
        TaskSatatus.DONE,
        TaskSatatus.OPEN,
        TaskSatatus.IN_PROGRESS
    ]
    transform(value :any){
        value = value.toUpperCase()
        if(!this.isSatatusValid(value)){
            throw new BadRequestException('invalid status')
        }
       return value;
    }
    isSatatusValid(status:any) {
        const index=this.allowStatus.indexOf(status)
        return index !== -1 ;
    }
}
