import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title!: string;
}
