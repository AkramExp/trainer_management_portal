import { useSearchParams } from "react-router-dom";
import RatingFilter from "./RatingFilter";
import Sort from "./Sort";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

const Filter = () => {
  const [_, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  function resetParams() {
    setSearchParams({});
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
    }, 100);
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-6">
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-gray-800 font-semibold bg-gray-200 py-1 px-2 rounded-md">
          Sort
        </h3>
        <Sort />
      </div>

      <div className="flex flex-col gap-3 items-center ">
        <h3 className="text-gray-800 font-semibold bg-gray-200 py-1 px-2 rounded-md">
          Rating
        </h3>
        <RatingFilter />
      </div>
      <Button onClick={resetParams}>Reset</Button>
    </div>
  );
};

export default Filter;
