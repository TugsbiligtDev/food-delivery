"use client";

import { Table as ReactTable } from "@tanstack/react-table";

import { Payment } from "@/lib/data";
import { Input } from "@/components/ui/input";

interface OrdersTableFiltersProps {
  table: ReactTable<Payment>;
}

export default function TableFilters({ table }: OrdersTableFiltersProps) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter emails..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}
