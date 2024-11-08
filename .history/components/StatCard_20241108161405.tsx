import clsx from "clsx";
import React from "react";

interface StatCardProps {
  type: "appointments" | "pending" | "canceled";
  count: number;
  label: string;
  icon: string;
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-canceled": type === "canceled"
      })}
    ></div>
  );
};

export default StatCard;
