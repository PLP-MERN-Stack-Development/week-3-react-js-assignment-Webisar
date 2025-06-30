import { useState, useEffect } from "react";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

export default function App() {
    // Initialize state, loading from localStorage if data exists
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [
            { id: 1, title: "Write Lesson Plan", completed: false },
            { id: 2, title: "Review MongoDb Quiz", completed: true }
        ];
    });

    // Persist tasks whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Toggle task completed status immutably
    const toggleTask = (id) => {
        setTasks(current =>
            current.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    // Add new task
    const addTask = (title) => {
        setTasks(current => [
            ...current,
            {
                id: Date.now(),
                title,
                completed: false
            }
        ]);
    };

    // Delete task
    const deleteTask = (id) => {
        setTasks(current => current.filter(task => task.id !== id));
    };

    return (
        <div className="container mx-auto max-w-md p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <TaskForm onAdd={addTask} />
            <div className="mt-4 space-y-2">
                {tasks.length === 0 && (
                    <p className="text-gray-500">No tasks yet. Add one above!</p>
                )}
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                ))}
            </div>
            {tasks.length > 0 && (
                <p className="mt-4 text-sm text-gray-500">
                    {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
                </p>
            )}
        </div>
    );
}