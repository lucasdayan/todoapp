import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskInterface } from "@/components/Task";

export default function Board({ tasks }: { tasks: TaskInterface[] }) {
  const completedTasks = tasks?.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="flex">
      <Card className="p-0 w-full">
        <CardHeader>
          <CardTitle className="text-green-300 text-center">
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-muted-foreground text-center">
            {completedTasks}
          </span>
        </CardContent>
      </Card>
      <Card className="p-0 w-full">
        <CardHeader>
          <CardTitle className="text-yellow-300 text-center">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-muted-foreground text-center">
            {pendingTasks}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
