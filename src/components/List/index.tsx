// Library
import { Fragment, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { styled } from "styled-components";

// Hook
import { useList, type FormValues, type Todo } from "../../hooks/useList";

/*-----------------------------------------------------------------------------------*/

export const List = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const { list, error, isLoading, addTodo, removeTodo, readTodo } = useList(todoList, setTodoList);
    const { register, watch, handleSubmit, reset } = useForm<FormValues>();
    const taskValue = watch("task", "");

    useEffect(() => {
        setTodoList(list);
    }, [list]);

    return (
        <Fragment>
            <FormContainer onSubmit={handleSubmit((data) => addTodo(data, reset))}>
                <TaskInput
                    type="text"
                    {...register("task")}
                    placeholder="Enter a task"
                    aria-label="Task input"
                />
                <AddButton
                    type="submit"
                    disabled={taskValue.trim().length < 3}
                    aria-disabled={taskValue.trim().length < 3}
                >
                    Add Task
                </AddButton>
            </FormContainer>

            {isLoading && <p>Loading initial tasks...</p>}
            {error && <p>Error loading tasks: {error.message}</p>}

            {!isLoading && !error && (
                <ListContainer role="list">
                    {todoList.map((task) => (
                        <ListItem key={`${task.id}_${Math.random()}`} role="listitem">
                            <TaskId completed={task.completed}>{task.id}.</TaskId>
                            <TaskText
                                completed={task.completed}
                                aria-checked={task.completed}
                                role="checkbox"
                            >
                                {task.todo}
                            </TaskText>
                            <Actions>
                                <IconButton
                                    title="Read Task"
                                    aria-label={task.completed ? "Mark as unread" : "Mark as read"}
                                    aria-pressed={task.completed}
                                    onClick={() => readTodo(task.id)}
                                    completed={task.completed}
                                >
                                    {task.completed ? <FaEnvelopeOpen /> : <FaEnvelope />}
                                </IconButton>
                                <IconButton
                                    aria-label="Remove Task"
                                    onClick={() => removeTodo(task.id)}
                                >
                                    <FiTrash2 />
                                </IconButton>
                            </Actions>
                        </ListItem>
                    ))}
                </ListContainer>
            )}
        </Fragment>
    );
};

const ListContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  background: ${({ theme: { colors } }) => colors.background};
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: ${({ theme: { colors } }) => colors.hoverBackground};
  }
`;

const TaskId = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== "completed",
}) <{ completed: boolean }>`
  margin-right: 1rem;
  font-size: 1rem;
  min-width: 100px;
  color: ${({ completed, theme: { colors } }) => (completed ? colors.completed : colors.text)};
`;

const TaskText = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== "completed",
}) <{ completed: boolean }>`
  flex: 1;
  margin-right: 1rem;
  font-size: 1rem;
  color: ${({ completed, theme: { colors } }) => (completed ? colors.completed : colors.text)};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "completed",
}) <{ completed?: boolean }>`
  border: none;
  background: transparent;
  color: ${({ completed, theme: { colors } }) => (completed ? colors.completed : colors.lightText)};
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.25rem;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: #e9ecef;
    color: ${({ completed, theme: { colors } }) => (completed ? colors.completed : colors.text)};
  }
`;

const FormContainer = styled.form`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 10px;
  padding-bottom: 50px;
`;

const TaskInput = styled.input`
  flex: 1 1 75%;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 50px;

  &:focus {
    outline: none;
    border-color: #1c7ed6;
    box-shadow: 0 0 0 2px rgba(28, 126, 214, 0.2);
  }
`;

const AddButton = styled.button`
  flex: 0 0 25%;
  background-color: ${({ theme: { colors } }) => colors.primaryButton};
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  height: 50px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme: { colors } }) => colors.primaryButtonHover};;
  }

  &:disabled {
    background-color: ${({ theme: { colors } }) => colors.primaryButtonDisabled};;
    cursor: not-allowed;
  }
`;
