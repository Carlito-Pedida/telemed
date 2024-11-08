import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function NewAppointment() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* {TODO: OTP Verification | PasskeyModal} */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="appointment"
            className="mb-12 h-10 w-fit"
          />

          {/* <AppointmentForm /> */}

          <p className="justify-items-end text-green-600 xl:text-left">
            © 2024 TelemedXpress
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
