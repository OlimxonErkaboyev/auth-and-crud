import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { addTodo, todos, updateTodo } from "@/store/todos/todosActions";
import { DataTable } from "../../components/ui/data-table";
import { setSelectedTodo, setTodos, TodosItem } from "@/store/todos/todosSlice";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionColumn } from "./components/ActionColumn";
import { logout } from "@/store/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Todos = useSelector((state: RootState) => state.todos.todos);
  const User = useSelector((state: RootState) => state.auth.user);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newTodoValue, setNewTodoValue] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch(setTodos(JSON.parse(storedTodos)));
    } else {
      dispatch(todos());
    }
  }, [dispatch]);

  useEffect(() => {
    if (Todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(Todos));
      dispatch(setTodos(Todos));
    }
  }, [Todos]);

  const dialogClose = () => {
    setIsOpen(false);
  };

  const createNewTodo = async () => {
    const userId = User?.id;
    if (userId) {
      const newTodo = {
        todo: newTodoValue,
        completed: false,
        userId: userId,
        id: Todos.length > 0 ? Todos[Todos.length - 1].id + 1 : 1,
      };

      const postNewTodo = await dispatch(addTodo(newTodo));
      setIsOpen(false);

      if (postNewTodo) {
        const updatedTodos = [...Todos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        dispatch(setTodos(updatedTodos));
      }
    }
  };

  const handleupdateTodo = async (value: boolean, row: TodosItem) => {
    const success = await dispatch(updateTodo({ completed: value }));
    dispatch(setSelectedTodo(row.id));

    if (success) {
      const updatedTodo = Todos.map((todo) =>
        todo.id === row.id ? { ...todo, completed: value } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      dispatch(setTodos(updatedTodo));
      console.log(updatedTodo);
    }
  };

  const columns: ColumnDef<TodosItem>[] = [
    {
      accessorKey: "completed",
      header: "Completed",
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={row.original.completed}
            onCheckedChange={(value: boolean) =>
              handleupdateTodo(value, row.original)
            }
            aria-label="Select row"
          />
        );
      },
    },
    {
      accessorKey: "todo",
      header: "Todo",
      cell: ({ row }) => {
        const isCompleted = row.original.completed;
        return (
          <div className={isCompleted ? "line-through" : ""}>
            {row.original.todo}
          </div>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "",
      cell: (props) => <ActionColumn row={props.row.original} />,
    },
  ];

  return (
    <div className="container my-10">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold ">Welcome, {User?.firstName}!</h1>
        <div className="flex gap-5">
          <Button
            className={buttonVariants({ variant: "default" })}
            onClick={() => setIsOpen(true)}
          >
            Add
          </Button>
          <Button
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => dispatch(logout())}
          >
            Log out
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={Todos} />
      <Dialog open={isOpen} onOpenChange={dialogClose}>
        <DialogContent
          className="sm:max-w-[425px]"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Add todo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                defaultValue=""
                placeholder="Write new todo"
                className="col-span-4"
                autoComplete="off"
                onChange={(evt) => setNewTodoValue(evt.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createNewTodo}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
