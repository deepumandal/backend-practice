import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({ enum: TaskStatus, example: TaskStatus.TODO })
  @IsEnum(TaskStatus, { message: 'Status must be TODO, IN_PROGRESS or DONE' })
  status: TaskStatus;
}
