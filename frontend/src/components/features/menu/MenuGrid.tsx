"use client";
import React, { useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import { Food, Category } from "@/lib/types";
import { getAllFoods, getAllCategories } from "@/lib/api/foods";
import { SkeletonGrid } from "@/components/ui/loading";

const MenuGrid = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const [foodsData, categoriesData] = await Promise.all([
          getAllFoods(),
          getAllCategories(),
        ]);
        setFoods(foodsData);
        setCategories(categoriesData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch menu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const foodsByCategory = foods.reduce((acc, food) => {
    const categoryName = food.category.categoryName;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(food);
    return acc;
  }, {} as Record<string, Food[]>);

  const categorySections = categories.map((category) => {
    const categoryFoods = foodsByCategory[category.categoryName] || [];

    if (categoryFoods.length === 0) return null;

    return (
      <div key={category._id} className="space-y-4">
        <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
          {category.categoryName}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  2xl:grid-cols-4 gap-4 lg:gap-6">
          {categoryFoods.map((food) => (
            <MenuCard key={food._id} food={food} />
          ))}
        </div>
      </div>
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-48 animate-pulse" />
          <SkeletonGrid count={8} />
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-40 animate-pulse" />
          <SkeletonGrid count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 space-y-4">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">Failed to load menu</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {foods.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No foods found.</p>
        </div>
      ) : (
        <div className="space-y-8">{categorySections}</div>
      )}
    </div>
  );
};

export default MenuGrid;
