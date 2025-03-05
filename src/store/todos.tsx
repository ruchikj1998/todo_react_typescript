import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type MyTodoType = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: MyTodoType[];
    handleAddToDo: (tas: string) => void; // Call Signature
    toggleTodoAsCompleted: (id: string) => void;
    handleDelete: (id: string) => void;
}

// Context
export const todosContext = createContext<TodosContext | null>(null);


// Provider Component
export const TodosProvider = ({ children }: TodosProviderProps) => {

    const [todos, setTodos] = useState<MyTodoType[]>(() => {

        try {

            const todoLocalData = localStorage.getItem("todos") || "[]";
            return JSON.parse(todoLocalData) as MyTodoType[];

        } catch (error) { return [] }

    })

    // Add new task
    const handleAddToDo = (task: string) => {

        setTodos((prev) => {

            const newTodos: MyTodoType[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;

        })

    }

    // Toggle Todo Completion
    const toggleTodoAsCompleted = (id: string) => {

        setTodos((prev) => {

            let newTodos = prev.map((todo) => {

                if (todo.id == id) return { ...todo, completed: !todo.completed }
                return todo;

            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;

        })

    }

    // Delete a Task
    const handleDelete = (id: string) => {

        setTodos((prev) => {

            let newTodos = prev.filter((todo) => todo.id != id)
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;

        })
    }

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({ todos, handleAddToDo, toggleTodoAsCompleted, handleDelete }),
        [todos]
    );

    return <todosContext.Provider value={contextValue}>
        {children}
    </todosContext.Provider>
}


// Custom hook to consume TodosContext
export const useTodos = () => {

    const todosConsumer = useContext(todosContext);
    if (!todosConsumer) throw new Error("useTodos used outside the provider.");
    return todosConsumer;

}