"use client";

import { Form } from "@/components/ui/form";
import { Physician } from "@/constants";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";
import { FormFieldType } from "./PatientForm";

const AppointmentForm = ({
  userId,
  patientId,
  type = "create"
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: ""
    }
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      default:
        status = "pending";
        break;
    }

    console.log("BEFORE THE TYPE", type);

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status
        };
        const newAppointment = await createAppointment(appointment);

        console.log(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;

    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;

    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;

    default:
      break;
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
                  name="note"
                  label="Additional Notes"
                  placeholder="ex. Type in notes"
                />
              </div>
            </>
          )}

          {type === "cancel" && (
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReaso"
              label="Reason for cancellation"
              placeholder="Please provide reason for cancellation."
            />
          )}

          <SubmitButton
            isLoading={isLoading}
            className={`${
              type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
            } w-full`}
          >
            {buttonLabel}
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;