import { setTodos, TodosItem } from "@/store/todos/todosSlice";
import { useDispatch } from "react-redux";
import { HiOutlineTrash } from "react-icons/hi";
import { deleteTodo } from "@/store/todos/todosActions";
import { AppDispatch } from "@/store";

export const ActionColumn = ({ row }: { row: TodosItem }) => {
  const dispatch = useDispatch<AppDispatch>();
  const onDelete = async () => {
    try {
      const success = await dispatch(deleteTodo(row?.id));
      const allTodos =
        JSON.parse(localStorage.getItem("todos") as string) || [];

      if (success) {
        const updatedProducts = allTodos.filter(
          (todo: TodosItem) => todo.id !== row?.id
        );
        localStorage.setItem("todos", JSON.stringify(updatedProducts));
        dispatch(setTodos(updatedProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center text-xl ">
      <span
        className="cursor-pointer p-2 hover:text-red-500"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  );
};
