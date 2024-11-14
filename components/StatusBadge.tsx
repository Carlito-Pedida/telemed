import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "request",
        "bg-red-600": status === "canceled"
      })}
    >
      <Image
        src={StatusIcon[status]}
        height={24}
        width={24}
        alt={status}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "request",
          "text-red-500": status === "canceled"
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
