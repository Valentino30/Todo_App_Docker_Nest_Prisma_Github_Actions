import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoTitleDto } from './dto/edit-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto.title);
  }

  @Patch(':id/title')
  editTodoTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EditTodoTitleDto,
  ) {
    return this.todoService.editTodoTitle(id, body.title);
  }

  @Patch(':id/toggle')
  toggleTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.toggleTodo(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
