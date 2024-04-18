import { Button } from "./Button";
import { FaCar } from "react-icons/fa";

interface Product {
  code: string;
  product_code: string;
  name: string;
  price: number;
  descount: number;
  descpription: string;
  brand: string;
//   category: string;
  stock: number;
  image: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <div className="w-3/5 pb-2 p-2">
        <img
          className="rounded-t-md w-full border-stone-300"
          src={product.image}
          alt={product.name}
        />
        <div className="bg-stone-800 px-2 pb-4 py-1 flex flex-col gap-2 rounded-b-md">
          <h3 className="text-xl font-semibold text-stone-300 text-opacity-50">
            {product.brand.toUpperCase()}
          </h3>
          <h4 className="text-gray-200 font-semibold">{product.name}</h4>
          <p className="text-gray-200 ">{product.descpription}</p>
          <div className="flex justify-between">
            <p className="text-2xl font-light text-gray-300">
              ${product.price}
            </p>
            <div className="">
              <Button
                callback={() => console.log("Hola")}
                size="sm"
                leading={<FaCar />}
                name="Agregar"
                className="text-white bg-primary-400 rounded-sm hover:bg-primary-800 hover:transition-all"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
