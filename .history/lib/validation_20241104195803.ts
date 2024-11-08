import { z } from "zod";

const UserFormValidation = z.object({
  username: z.string().min(2, "Name must be at least 2 characters")
});
