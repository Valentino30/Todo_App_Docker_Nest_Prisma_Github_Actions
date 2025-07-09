import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos() {
    return this.prisma.todo.findMany();
  }

  async createTodo(title: string) {
    return this.prisma.todo.create({ data: { title } });
  }

  async toggleTodo(id: number, completed: boolean) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed },
    });
  }

  async deleteTodo(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
