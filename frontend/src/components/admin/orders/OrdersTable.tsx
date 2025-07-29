"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import OrdersHeader from "./OrdersHeader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  {
    id: "1",
    orderNumber: 1,
    customer: "Test@gamail.com",
    food: [
      { name: "Sunshine Stackers", quantity: 1, image: true },
      { name: "Sunshine Stackers", quantity: 1, image: true },
    ],
    foodSummary: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    deliveryState: "Pending",
  },
  {
    id: "2",
    orderNumber: 1,
    customer: "Test@gamail.com",
    food: [{ name: "Sunshine Stackers", quantity: 1, image: true }],
    foodSummary: "Sunshine Stackers",
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    deliveryState: "Pending",
  },
  {
    id: "3",
    orderNumber: 1,
    customer: "Test@gamail.com",
    food: [{ name: "Sunshine Stackers", quantity: 1, image: true }],
    foodSummary: "Sunshine Stackers",
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    deliveryState: "Pending",
  },
  {
    id: "4",
    orderNumber: 1,
    customer: "Test@gamail.com",
    food: [
      { name: "Sunshine Stackers", quantity: 1, image: true },
      { name: "Caesar Salad", quantity: 1, image: true },
    ],
    foodSummary: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    deliveryState: "Delivered",
  },
  {
    id: "5",
    orderNumber: 1,
    customer: "Test@gamail.com",
    food: [
      { name: "Burger Deluxe", quantity: 2, image: true },
      { name: "French Fries", quantity: 1, image: true },
    ],
    foodSummary: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    deliveryState: "Delivered",
  },
  {
    id: "6",
    orderNumber: 1,
    customer: "Test@gamail.com",
    food: [
      { name: "Pizza Margherita", quantity: 1, image: true },
      { name: "Chicken Wings", quantity: 1, image: true },
    ],
    foodSummary: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    deliveryState: "Cancelled",
  },
  {
    id: "7",
    orderNumber: 1,
    customer: "Test@gamail.com",
    food: [
      { name: "Pasta Carbonara", quantity: 1, image: true },
      { name: "Garlic Bread", quantity: 2, image: true },
    ],
    foodSummary: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    deliveryState: "Cancelled",
  },
  {
    id: "8",
    orderNumber: 1,
    customer: "Test@gamail.com",
    food: [
      { name: "Sushi Roll", quantity: 3, image: true },
      { name: "Miso Soup", quantity: 1, image: true },
    ],
    foodSummary: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    deliveryState: "Cancelled",
  },
];

export type Orders = {
  id: string;
  orderNumber: number;
  email: string;
  food: { name: string; quantity: number; image: boolean };
  foodSummary: string;
  date: string;
  total: number;
  deliveryAddress: string;
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Orders>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          №
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("orderNumber")}</div>,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "foodSummary",
    header: "Foods",
    cell: ({ row }) => {
      const food = row.original.food;
      const totalItems = food.reduce((sum, item) => sum + item.quantity, 0);

      return (
        <div>
          <div>{row.getValue("foodSummary")}</div>
          <div>
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "total",
    header: () => <div>Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
    cell: ({ row }) => {
      const address = row.getValue("deliveryAddress") as string;
      const truncatedAddress =
        address.length > 50 ? `${address.substring(0, 50)}...` : address;

      return <div title={address}>{truncatedAddress}</div>;
    },
  },
  {
    accessorKey: "deliveryState",
    header: "Delivery State",
    cell: ({ row }) => {
      const status = row.getValue("deliveryState") as string;

      const statusVariant = {
        Pending: "secondary",
        Delivered: "default",
        Cancelled: "destructive",
      } as const;

      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
];

export function OrdersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full text-black">
      <OrdersHeader />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination className="flex items-center justify-end space-x-2 py-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
