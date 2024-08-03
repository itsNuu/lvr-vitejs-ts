import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface Product {
  id: number;
  product_name: string;
  category: string;
  price: number;
  discount?: number;
}

const Footer: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <footer
        className="bg-gray-900 text-white py-6 px-4 text-center border-t border-gray-700 rounded-t-lg shadow-lg font-sans cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <h2 className="text-xl font-semibold mb-3">API</h2>
        {error ? (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        ) : products ? (
          <p className="text-gray-400 text-sm">Click to view products</p>
        ) : (
          <p className="text-gray-400 text-sm">Loading...</p>
        )}
      </footer>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <button className="hidden">Open Dialog</button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
          <AlertDialogTitle>Products API Data</AlertDialogTitle>
          <AlertDialogDescription>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : products ? (
              <pre className="bg-gray-800 p-5 rounded-md text-sm whitespace-pre-wrap overflow-x-auto font-mono">
                {JSON.stringify(products, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-400">Loading...</p>
            )}
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end mt-4">
            <AlertDialogAction onClick={() => setOpen(false)}>
              Close
            </AlertDialogAction>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Footer;
