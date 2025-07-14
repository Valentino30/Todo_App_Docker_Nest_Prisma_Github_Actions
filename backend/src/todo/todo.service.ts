import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  private async getTodoOrThrow(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  async getTodos() {
    return this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async createTodo(title: string) {
    return this.prisma.todo.create({
      data: { title: title.trim() },
    });
  }

  async editTodoTitle(id: number, title: string) {
    await this.getTodoOrThrow(id);
    return this.prisma.todo.update({
      where: { id },
      data: { title: title.trim() },
    });
  }

  async toggleTodo(id: number) {
    const todo = await this.getTodoOrThrow(id);
    return this.prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed },
    });
  }

  async deleteTodo(id: number) {
    await this.getTodoOrThrow(id);
    return this.prisma.todo.delete({ where: { id } });
  }
}
