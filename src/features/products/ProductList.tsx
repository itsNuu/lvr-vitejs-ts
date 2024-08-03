import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "./productSlice";
import Alert from "@/components/ui/Alert";
import { Rings } from "react-loader-spinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // import card components from shadcn

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = (
      <div className="flex justify-center items-center h-screen">
        <Rings color="#00BFFF" height={80} width={80} />
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-gradient-to-r from-blue-100 via-blue-50 to-white shadow-lg border border-gray-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="border-b border-gray-300 p-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {product.product_name}
                </h3>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-2">
                  Category: {product.category}
                </p>
                <p className="text-gray-700 mb-2 text-lg font-semibold">
                  Price: Rp. {product.price}
                </p>
                {product.discount && (
                  <p className="text-green-500 font-medium">
                    Discount: {product.discount}%
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } else if (status === "failed") {
    content = (
      <Alert variant="error" className="p-4">
        {error}
      </Alert>
    );
  }

  return <>{content}</>;
};

export default ProductList;
