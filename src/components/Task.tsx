import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export interface TaskInterface {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskProps {
  task: TaskInterface;
  toggleTaskCompletion: (id: number, completed: boolean) => void;
  deleteTask: (id: number) => void;
}

export default function Task({
  task,
  toggleTaskCompletion,
  deleteTask,
}: TaskProps) {
  return (
    <div
      key={task.id}
      className={`flex items-center justify-between bg-card p-3 rounded-md ${
        task.completed ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center">
        <Checkbox
          checked={task.completed}
          className="mr-2"
          onCheckedChange={() => toggleTaskCompletion(task.id, task.completed)}
        />
        <span
          className={`text-card-foreground ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTask(task.id)}
        className="text-muted-foreground hover:text-foreground "
      >
        <TrashIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
