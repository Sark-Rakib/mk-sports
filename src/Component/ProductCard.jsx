import React from "react";
import { Link } from "react-router";

const ProductCard = ({ tuition }) => {
  const { _id, name, price, images, discountPrice, ability } = tuition;

  return (
    <Link to={`/products-details/${_id}`} className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img
          src={images[0] || "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-0 left-0 bg-black text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-1.5">
          {ability}
        </div>
      </div>
      <div>
        <h2 className="text-[13px] font-medium line-clamp-1 mb-1.5 group-hover:text-[#C8102E] transition-colors">
          {name}
        </h2>
        <div className="flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-sm font-bold">{discountPrice} BDT</span>
              <span className="text-xs text-gray-400 line-through">
                {price} BDT
              </span>
            </>
          ) : (
            <span className="text-sm font-bold">{price} BDT</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
