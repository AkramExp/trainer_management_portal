import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import UsersList from "@/components/UsersList";
import { useAllUsers } from "@/react-query/user";
import { NavLink } from "react-router-dom";

const AdminUsers = () => {
  const { allUsers } = useAllUsers();

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full max-w-[400px]">
        <SearchInput />
      </div>
      <div className="flex justify-center mb-5">
        <Button className="font-semibold text-lg" asChild>
          <NavLink to="/admin/users/add">Add User</NavLink>
        </Button>
      </div>
      <UsersList />
      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allUsers?.totalPages} />
      </div>
    </div>
  );
};

export default AdminUsers;
