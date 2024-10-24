import Loader from "@/components/Loader";
import ProfileUploader from "@/components/ProfileUploader";
import TrainerTechCheckbox from "@/components/TrainerTechCheckbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config";
import { TrainerValidation } from "@/lib/validation";
import { useAllTechnologies } from "@/react-query/technology";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const TrainerForm = () => {
  const navigate = useNavigate();
  const { allTechnologies } = useAllTechnologies();
  const [technologies, setTechnologies] = useState<String[]>([]);
  const form = useForm<z.infer<typeof TrainerValidation>>({
    resolver: zodResolver(TrainerValidation),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      tech: "",
      location: "",
      file: [],
    },
  });

  const { mutate: addTrainer, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.post(`${BACKEND_URL}/trainer/add`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
    onSuccess: () => {
      navigate("/admin/trainers");
      return toast({
        title: "Added Successfully",
        description: "New trainer have been added to the portal.",
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
    const data = { ...values, tech: technologies };
    addTrainer(data);
  }

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="relative flex flex-col bg-gradient-to-br from-gray-50 to-gray-100/90 border-[1px] border-gray-300 rounded-md p-6 shadow-md gap-3 max-w-md w-full">
        <div className="absolute left-0 -top-[3rem]">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
            Back
          </Button>
        </div>
        <h2 className="text-3xl font-[600] text-center mb-6">Add Trainer</h2>
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
                        placeholder="Trainer's Full Name"
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
                        placeholder="Trainer's Email"
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
                        placeholder="Trainer's Contact Info"
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Trainer's Location"
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
              name="tech"
              render={() => (
                <FormItem>
                  <div className="shadcn-form-row">
                    <FormLabel className="shadcn-form-label">
                      Tech Stack
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Technologies" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[150px]">
                            <div className="flex flex-col gap-2 overscroll-auto px-3 py-2">
                              {allTechnologies?.data.map(
                                (tech: { name: string }) => (
                                  <TrainerTechCheckbox
                                    key={tech.name}
                                    value={tech.name}
                                    technologies={technologies}
                                    setTechnologies={setTechnologies}
                                  />
                                )
                              )}
                            </div>
                          </SelectContent>
                        </Select>
                      </FormControl>
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
                    <ProfileUploader fieldChange={field.onChange} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-3" disabled={isPending}>
              {isPending ? <Loader /> : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TrainerForm;
