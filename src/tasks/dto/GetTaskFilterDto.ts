import { TaskSatatus } from "../task-status.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";


export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskSatatus.OPEN,TaskSatatus.IN_PROGRESS,TaskSatatus.DONE])
    status:TaskSatatus;
    @IsOptional()
    @IsNotEmpty()
    search:string
}
