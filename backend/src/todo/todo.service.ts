import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos() {
    return this.prisma.todo.findMany();
  }

  async createTodo(title: string) {
    if (!title || title.trim() === '') {
      throw new Error('Title cannot be empty');
    }

    return this.prisma.todo.create({
      data: { title: title.trim() },
    });
  }

  async toggleTodo(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return this.prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed },
    });
  }

  async deleteTodo(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return this.prisma.todo.delete({ where: { id } });
  }
}
