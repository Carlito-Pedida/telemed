import clsx from "clsx";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green=600": status === "scheduled",
        "bg-blue=600": status === "pending",
        "bg-red=600": status === "canceled"
      })}
    >
      <Image
        src={`/assets/icons/${status}.svg`}
        height={24}
        width={24}
        alt={status}
        className="h-fit w-3"
      />
    </div>
  );
};

export default StatusBadge;
