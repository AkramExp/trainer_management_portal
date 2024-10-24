import { Button } from "@/components/ui/button";
import { useRatingLabels } from "@/react-query/rating";
import { useRating } from "@/react-query/trainer";
import { ChevronLeft, Loader, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TechRating = () => {
  const { trainerId } = useParams();
  const { rating, isLoading } = useRating(trainerId || "");
  const { ratingLabels, isLoading: loadingLabels } = useRatingLabels();
  const navigate = useNavigate();

  const [rating1, setRating1] = useState(rating?.tech.rating1);
  const [rating2, setRating2] = useState(rating?.tech.rating2);
  const [rating3, setRating3] = useState(rating?.tech.rating3);
  const [rating4, setRating4] = useState(rating?.tech.rating4);
  const [rating5, setRating5] = useState(rating?.tech.rating5);

  useEffect(() => {
    setRating1(rating?.tech.rating1);
    setRating2(rating?.tech.rating2);
    setRating3(rating?.tech.rating3);
    setRating4(rating?.tech.rating4);
    setRating5(rating?.tech.rating5);
  }, [rating]);

  if (isLoading || loadingLabels)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="relative flex flex-col bg-gradient-to-br from-gray-50 to-gray-100/90 rounded-md p-6 shadow-md border-[1px] border-gray-300 gap-3 max-w-md w-full">
        <div className="absolute left-0 -top-[3rem]">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
            Back
          </Button>
        </div>

        <h2 className="text-2xl font-[700] text-center mb-6">Tech Rating</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">
              {ratingLabels?.data.tech.label1}
            </span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-400 ${
                        rating1 >= index + 1 && "fill-yellow-400"
                      }`}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">
              {ratingLabels?.data.tech.label2}
            </span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-400 ${
                        rating2 >= index + 1 && "fill-yellow-400"
                      }`}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">
              {ratingLabels?.data.tech.label3}
            </span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-400 ${
                        rating3 >= index + 1 && "fill-yellow-400"
                      }`}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">
              {ratingLabels?.data.tech.label4}
            </span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-400 ${
                        rating4 >= index + 1 && "fill-yellow-400"
                      }`}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between flex-col sm:flex-row text-center sm:text-left">
            <span className="text-lg font-semibold">
              {ratingLabels?.data.tech.label5}
            </span>
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(undefined)
                .map((_, index) => {
                  return (
                    <Star
                      key={index}
                      className={`cursor-pointer text-yellow-400 ${
                        rating5 >= index + 1 && "fill-yellow-400"
                      }`}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechRating;
