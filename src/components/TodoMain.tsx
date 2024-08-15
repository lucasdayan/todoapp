"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Board from "@/components/Board";
import Task, { TaskInterface } from "@/components/Task";

export default function TodoMain() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/todo");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim() !== "") {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (response.ok) {
        const task = await response.json();
        setTasks([...tasks, task]);
        setNewTask("");
      }
    }
  };

  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    const response = await fetch("/api/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, completed: !completed }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    }
  };

  const deleteTask = async (id: number) => {
    const response = await fetch(`/api/todo?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex flex-col w-full max-w-md mx-auto p-6 bg-background rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 mr-2 rounded-md border-gray-300 focus:border-primary focus:ring-primary"
          />
          <Button
            onClick={addTask}
            className="bg-blue-500 text-primary-foreground rounded-md px-4 py-2 hover:bg-blue-300"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          ))}
        </div>
        <Board tasks={tasks} />
      </div>
    </div>
  );
}
