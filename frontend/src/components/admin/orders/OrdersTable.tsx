"use client";

import * as React from "react";
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

export function OrdersTable() {
  return (
    <div className="w-full text-black">
      <OrdersHeader />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox aria-label="Select all" />
              </TableHead>
              <TableHead>
                <Button variant="ghost">№</Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">Customer</Button>
              </TableHead>
              <TableHead>Foods</TableHead>
              <TableHead>
                <Button variant="ghost">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Delivery State</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox aria-label="Select row" />
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>Test@gmail.com</TableCell>
              <TableCell>
                <div>2 foods</div>
                <div>2 items</div>
              </TableCell>
              <TableCell>12/20/2024</TableCell>
              <TableCell>$26.97</TableCell>
              <TableCell title="2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...">
                2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd n...
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox aria-label="Select row" />
              </TableCell>
              <TableCell>2</TableCell>
              <TableCell>Test@gmail.com</TableCell>
              <TableCell>
                <div>Sunshine Stackers</div>
                <div>1 item</div>
              </TableCell>
              <TableCell>12/20/2024</TableCell>
              <TableCell>$26.97</TableCell>
              <TableCell title="2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...">
                2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd n...
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox aria-label="Select row" />
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>Test@gmail.com</TableCell>
              <TableCell>
                <div>2 foods</div>
                <div>3 items</div>
              </TableCell>
              <TableCell>12/20/2024</TableCell>
              <TableCell>$26.97</TableCell>
              <TableCell title="2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...">
                2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd n...
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox aria-label="Select row" />
              </TableCell>
              <TableCell>4</TableCell>
              <TableCell>Test@gmail.com</TableCell>
              <TableCell>
                <div>2 foods</div>
                <div>2 items</div>
              </TableCell>
              <TableCell>12/20/2024</TableCell>
              <TableCell>$26.97</TableCell>
              <TableCell title="2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...">
                2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd n...
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox aria-label="Select row" />
              </TableCell>
              <TableCell>5</TableCell>
              <TableCell>Test@gmail.com</TableCell>
              <TableCell>
                <div>2 foods</div>
                <div>3 items</div>
              </TableCell>
              <TableCell>12/20/2024</TableCell>
              <TableCell>$26.97</TableCell>
              <TableCell title="2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...">
                2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd n...
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
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
