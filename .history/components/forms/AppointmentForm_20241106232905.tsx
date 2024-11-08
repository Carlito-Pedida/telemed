"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { Physician } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";

const AppointmentForm = ({
  userId,
  patientId,
  type
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  });

  async function onSubmit({
    name,
    email,
    phone
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section>
            <h1 className="header">New appointment</h1>
            <p>Request a new appointment in 10 seconds</p>
          </section>

          {type !== "cancel" && (
            <>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Physician"
                placeholder="Select Physician"
                iconAlt="appointment"
                iconSrc="/assets/icons/appointments.svg"
              >
                {Physician.map((doc) => (
                  <SelectItem key={doc.name} value={doc.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        height={32}
                        width={32}
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doc.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Appointment date selector"
                showTimeSelect
                dateFormat="MM/dd/yyy - h:mm aa"
                placeholder="Select your appointment date"
              />

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reasonForApppointment"
                  label="Reason for Apppointment"
                  placeholder="ex. Annual/Monthly checkup..."
                />

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="commentsAndNotes"
                  label="Additional Commnents and Notes"
                  placeholder="ex. Prefer afternoon if possible..."
                />
              </div>
            </>
          )}
          <SubmitButton isLoading={isLoading}>
            Submit Request and Continue
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
