import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title!: string;
}
