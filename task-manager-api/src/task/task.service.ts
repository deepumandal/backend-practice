import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private count = 1;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getAllTasksById(id: number): Task[] {
    console.log(id);
    console.log(
      this.tasks,
      this.tasks.filter((task) => task.id === id),
    );
    return this.tasks.filter((task) => task.id === id);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  createTask({ description, title }: CreateTaskDto): Task {
    const task: Task = {
      id: this.count++,
      title,
      description,
      status: TaskStatus.TODO,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: number, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  getTaskById(id: number): Task {
    return this.tasks.find((task) => task.id === id);
  }
}
