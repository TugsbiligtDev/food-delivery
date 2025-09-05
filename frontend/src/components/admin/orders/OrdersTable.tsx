"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Order } from "@/lib/types";
import { getAllOrders, updateOrderStatus } from "@/lib/api/orders";
import { toast } from "sonner";

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError("");
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load orders";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(
        orderId,
        newStatus as "PENDING" | "CANCELED" | "DELIVERED"
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus as any } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const refetchOrders = async () => {
    try {
      setIsLoading(true);
      setError("");
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to load orders";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="w-full text-black">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-black">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-lg text-red-600">Error: {error}</div>
          <Button onClick={refetchOrders}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-black space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-600">
          {filteredOrders.length} orders found
        </div>
      </div>

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
                  Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order: Order, index: number) => {
              const totalItems = order.foodOrderItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              );
              const formattedDate = new Date(
                order.createdAt
              ).toLocaleDateString();
              const truncatedAddress =
                order.deliveryAddress.length > 50
                  ? `${order.deliveryAddress.substring(0, 50)}...`
                  : order.deliveryAddress;

              return (
                <TableRow key={order._id}>
                  <TableCell>
                    <Checkbox aria-label="Select row" />
                  </TableCell>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{order.user?.email || "Unknown User"}</TableCell>
                  <TableCell>
                    <div>{order.foodOrderItems.length} foods</div>
                    <div>{totalItems} items</div>
                  </TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell title={order.deliveryAddress}>
                    {truncatedAddress}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order._id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + paginatedOrders.length, filteredOrders.length)}{" "}
          of {filteredOrders.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
