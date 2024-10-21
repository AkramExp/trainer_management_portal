import FilterButton from "@/components/FilterButton";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import TrainersList from "@/components/TrainersList";
import { useAllTrainers } from "@/react-query/trainer";
import { CirclePlus, Loader } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminTrainers = () => {
  const { allTrainers, loadingTrainers } = useAllTrainers();

  if (loadingTrainers)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 items-center min-h-[83vh]">
      <div className="w-full max-w-[400px]">
        <SearchInput />
      </div>
      <div className="flex justify-center mb-5 items-center gap-4">
        <NavLink
          to="/admin/trainers/add"
          className="flex items-center gap-2 font-semibold text-lg px-4 py-2 rounded-md border-[1px] hover:border-gray-100 hover:bg-gray-100"
        >
          <CirclePlus className="w-5 h-5 text-blue-500" /> Add Trainer
        </NavLink>
        <FilterButton />
      </div>

      <div className="overscroll-auto w-full flex-1">
        <TrainersList isAdmin={true} />
      </div>

      <div className="flex items-center justify-center mt-4">
        <Pagination totalPages={allTrainers?.totalPages} />
      </div>
    </div>
  );
};

export default AdminTrainers;
