// Library
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";

/*-----------------------------------------------------------------------------------*/

export const LOCAL_STORAGE_KEY = "todos";

export type Todo = { id: number; todo: string; completed: boolean; editing?: boolean; };

export type FormValues = {
    task: string;
}

export const useList = (todoList: Todo[], setTodoList: Dispatch<SetStateAction<Todo[]>>) => {
    const { data, error, isLoading } = useQuery<{ todos: Todo[] }, Error>({
        queryKey: ["initialTasks"],
        queryFn: async () => {
            const res = await fetch("https://dummyjson.com/todos");
            const json = await res.json();
            return { todos: json.todos };
        },
        staleTime: Infinity
    });

    const [list, setList] = useState<Todo[]>(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        if ((!list || list.length === 0) && data?.todos) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.todos));
            setList(data.todos);
        }
    }, [data, list]);

    const addTodo = (data: FormValues, reset: UseFormReset<FormValues>) => {
        const listItem: Todo = { id: todoList[todoList.length - 1]?.id + 1, todo: data.task, completed: false };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...todoList, listItem]))
        reset();
        setTodoList([...todoList, listItem])
    }

    const removeTodo = (id: number) => {
        const listItem = todoList.filter((item) => item.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listItem))
        setTodoList(listItem)
    }

    const readTodo = (id: number) => {
        const updatedList = todoList.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
        setTodoList(updatedList);
    };

    return { list, error, isLoading, addTodo, removeTodo, readTodo };
};
