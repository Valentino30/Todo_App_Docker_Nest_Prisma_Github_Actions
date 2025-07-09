import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  createTodo(@Body('title') title: string) {
    return this.todoService.createTodo(title);
  }

  @Patch(':id')
  toggleTodo(@Param('id') id: string, @Body('completed') completed: boolean) {
    return this.todoService.toggleTodo(Number(id), completed);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(Number(id));
  }
}
