import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  id: number;
  product_name: string;
  category: string;
  price: number;
  discount?: number;
}

const ProductForm: React.FC = () => {
  const [product_name, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null
  );
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://127.0.0.1:8000/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAddDialogOpen(true);
  };

  const confirmAddProduct = async () => {
    if (!product_name || !category || price === "" || isNaN(price)) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setUploading(true);
    setNotification(null);

    try {
      if (editProductId) {
        await axios.put(`http://127.0.0.1:8000/api/products/${editProductId}`, {
          product_name,
          category,
          price,
          discount: discount || null,
        });
        setNotification("Product updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/products", {
          product_name,
          category,
          price,
          discount: discount || null,
        });
        setNotification("Product added successfully!");
      }

      setProductName("");
      setCategory("");
      setPrice("");
      setDiscount("");
      setError("");
      setEditProductId(null);

      const response = await axios.get<Product[]>(
        "http://127.0.0.1:8000/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      setNotification("Failed to submit the product.");
    } finally {
      setUploading(false);
      setAddDialogOpen(false);
    }
  };

  const handleEdit = (product: Product) => {
    setProductName(product.product_name);
    setCategory(product.category);
    setPrice(product.price);
    setDiscount(product.discount || "");
    setEditProductId(product.id);
    setAddDialogOpen(true); // Open dialog for editing
  };

  const handleDelete = async () => {
    if (deletingProductId === null) return;

    setDeleting(true);
    setNotification(null);

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/products/${deletingProductId}`
      );
      setProducts(
        products.filter((product) => product.id !== deletingProductId)
      );
      setNotification("Product deleted successfully!");
    } catch (error) {
      setNotification("Failed to delete the product.");
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setDeletingProductId(null);
    }
  };

  return (
    <div className="p-4 flex">
      {/* Product List */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Product List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="p-4 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105"
            >
              <CardHeader className="border-b border-gray-200 pb-2 mb-2">
                <CardTitle className="text-xl font-semibold">
                  {product.product_name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Category: {product.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-start">
                <div className="text-lg font-semibold mb-2">
                  Rp. {product.price}
                </div>
                {product.discount && (
                  <div className="text-sm text-green-500">
                    Discount: {product.discount}%
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white hover:bg-blue-600 rounded-md shadow-sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setDeletingProductId(product.id);
                    setDeleteDialogOpen(true);
                  }}
                  variant="destructive"
                  className="bg-red-500 text-white hover:bg-red-600 rounded-md shadow-sm"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Form */}
      <div className="flex-1 p-6 max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Product Form Edit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="product_name">Product Name:</Label>
            <Input
              id="product_name"
              type="text"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <Label htmlFor="category">Category:</Label>
            <Input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <Label htmlFor="price">Price:</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <Label htmlFor="discount">Discount:</Label>
            <Input
              id="discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="mt-1 border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          {error && <div className="mt-2 text-red-600">{error}</div>}
          {notification && (
            <div
              className={`mt-2 ${
                notification.startsWith("Failed")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {notification}
            </div>
          )}
          {uploading && (
            <div className="mt-4">
              <Progress value={100} />
              <div className="mt-2 text-blue-500">Uploading...</div>
            </div>
          )}
          {deleting && (
            <div className="mt-4">
              <Progress value={100} />
              <div className="mt-2 text-red-500">Deleting...</div>
            </div>
          )}
          <AlertDialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                type="submit"
                className="mt-4 bg-blue-500 text-white hover:bg-blue-600"
              >
                {editProductId ? "Update Product" : "Add Product"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>
                {editProductId ? "Update Product" : "Add Product"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to {editProductId ? "update" : "add"} this
                product?
              </AlertDialogDescription>
              <div className="flex justify-end gap-4 mt-4">
                <AlertDialogCancel onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={confirmAddProduct}>
                  Confirm
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this product?
              </AlertDialogDescription>
              <div className="flex justify-end gap-4 mt-4">
                <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Confirm
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
