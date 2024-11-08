"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const CustomformField = () => {
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomformField;
