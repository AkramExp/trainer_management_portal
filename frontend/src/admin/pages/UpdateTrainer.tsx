import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { TrainerValidation } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "@/config";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import ProfileUploader from "@/components/ProfileUploader";
import { useTrainerById } from "@/react-query/trainer";
import { useEffect } from "react";

const UpdateTrainer = () => {
  const navigate = useNavigate();
  const { trainerId } = useParams();
  const { trainer, isLoading } = useTrainerById(trainerId || "");

  useEffect(() => {
    form.reset({
      name: trainer?.name || "",
      email: trainer?.email || "",
      contact: String(trainer?.contact) || "",
      tech: trainer?.tech || "",
      file: trainer?.avatar || [],
    });
  }, [trainer]);

  const form = useForm<z.infer<typeof TrainerValidation>>({
    resolver: zodResolver(TrainerValidation),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      tech: "",
      file: [],
    },
  });

  const { mutate: updateTrainer, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.patch(
        `${BACKEND_URL}/trainer/update/${trainerId}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    onSuccess: () => {
      navigate(`/admin/trainers/${trainerId}`);
      return toast({
        title: "Updated Successfully",
        description: "Trainer information have been updated.",
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        return toast({
          title: "Something went wrong",
          description: err.response?.data.message,
          variant: "destructive",
        });
      }
      return toast({
        title: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof TrainerValidation>) {
    console.log(values);

    updateTrainer(values);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-md p-6 shadow-md gap-3 max-w-md w-full">
        <h2 className="h2-bold text-center mb-6">Update Trainer</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Full Name"
                        {...field}
                        className="form-input"
                        required={true}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Email"
                        {...field}
                        type="email"
                        className="form-input"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Mobile No.
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Contact Info"
                        {...field}
                        className="form-input"
                        type="number"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tech"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Tech Stack
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Tech Stack"
                          {...field}
                          className="form-input mb-2"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription>
                        Add tech stack seperated by ","
                      </FormDescription>
                    </div>
                  </div>
                  <FormMessage className="text-start" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={trainer.avatar}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-3 mt-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader /> : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateTrainer;
