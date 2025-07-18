import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi2";
import { toast } from "react-toastify";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MyLoader } from "./shared/Ui/MyLoader";
import { addToCart } from "@/redux/reducers/cartSlice";
import { addToWishlist } from "@/redux/reducers/wishlistSlice";

interface PropsType {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  slug: string;
  onAddToCart: () => void; 
  onAddToWishlist: () => void; 
}

const ProductCard: React.FC<PropsType> = ({
  img,
  title,
  desc,
  rating,
  price,
  slug,
  onAddToCart,
  onAddToWishlist,
}) => {
const generateRating = (rating: number) => {
  const stars = [];

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const totalFilled = hasHalfStar ? fullStars + 1 : fullStars;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return <div className="flex gap-1 text-[20px] text-[#FF9529]">{stars}</div>;
};

        const dispatch = useAppDispatch();
        const { data: singleProduct, isLoading: isSingleProductLoading } =
          useGetSingleProductQuery(slug);
      
        const cartItems = useAppSelector((state) =>
          state.cart.items.filter(item => item?.product?.id)
        );
        const wishlistItems = useAppSelector((state) => state.wishlist.items);
      
        if (isSingleProductLoading) {
          return <MyLoader />;
        }

      const handleAddToCart = () => {
        const alreadyCart = cartItems.some(
          (item) => item.product && item.product.id === singleProduct.id
        );
        console.log("sahan new line 72 : ",singleProduct);
    
        if (alreadyCart) {
          toast.error("Already you have added in cart!");
        }
        else if (singleProduct.sold_recently === 0) {
          toast.error("Out of stock!");
        } else {
        const mappedProduct = {
          id: singleProduct.id ?? `fallback-id-${singleProduct.slug}`,
          name: singleProduct.title,
          slug: singleProduct.slug,
          description: singleProduct.description,
          image: singleProduct.img,
          images: singleProduct.images ?? [],
          category: singleProduct.category,
          price: singleProduct.price,
          stock: singleProduct.stock ?? 0,
          tags: singleProduct.tags ?? [],
          totalReviews: singleProduct.totalReviews ?? 0,
          averageRatings: singleProduct.averageRatings ?? 0,
          salesCount: singleProduct.soldRecently ?? 0,
          isDeleted: false,
          createdAt: singleProduct.createdAt ?? new Date().toISOString(),
          updatedAt: singleProduct.updatedAt ?? new Date().toISOString(),
          discount: singleProduct.discount ?? 0,
          __v: 0,
        };
    
        dispatch(addToCart({ product: mappedProduct, quantity: 1 }));
    
    
          toast.success("Add to cart success");
        }
      };

        const handleAddToWishlist = () => {
          const productId = singleProduct.id || singleProduct._id;

          const wishlistItem = {
            product_id: Number(productId),
            id: Number(productId),
            name: title,
            price: price,
            quantity: 1,
            slug: slug,
            description: singleProduct.description,
            image: singleProduct.img,
            images: singleProduct.images ?? [],
            category: singleProduct.category,
            stock: singleProduct.stock ?? 0,
            tags: singleProduct.tags ?? [],
            totalReviews: singleProduct.totalReviews ?? 0,
            averageRatings: singleProduct.averageRatings ?? 0,
            salesCount: singleProduct.soldRecently ?? 0,
            isDeleted: false,
            createdAt: singleProduct.createdAt ?? new Date().toISOString(),
            updatedAt: singleProduct.updatedAt ?? new Date().toISOString(),
            discount: singleProduct.discount ?? 0,
            __v: 0,
          };
          console.log("wish list item : ",wishlistItem);

          dispatch(addToWishlist(wishlistItem)); 
          toast.success("Add to wishlist success");

        };

  

  return (
    <div className="w-full max-w-[400px]">
<div className="relative px-2 py-1 border-[2px] border-[#7b1f4b] rounded-2xl shadow-sm hover:shadow-2xl transition group">
        <div className="">
          <Link href={`/product/${slug}`}>
            <Image
              className="w-full h-auto"
              src={img}
              width={200}
              height={200}
              alt={title}
            />
          </Link>

          <hr className="border-t border-[#52002c] sm:border-t-2 w-full my-2" />
        </div>

        <div className="flex flex-col items-center justify-center text-center mb-2">
          <h3 className="text-[#52002c] font-semibold text-sm sm:text-base md:text-lg mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm">{desc}</p>

          <div className="mt-1">{generateRating(singleProduct.average_ratings ?? 0)}</div>

          <div className="font-bold flex gap-2 sm:gap-4 text-black mt-1 text-sm sm:text-base">
            ${price}
            <del className="text-gray-500 font-normal text-xs sm:text-sm">
              ${parseInt(price) + 50}.00
            </del>
          </div>
        </div>

        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col gap-y-2 sm:gap-y-0">
            <div
              onClick={handleAddToCart}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg cursor-pointer"
            >
              <HiShoppingBag className="text-xl sm:text-2xl text-[#7b1f4b]" />
            </div>

            <div
              onClick={handleAddToWishlist}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg cursor-pointer"
            >
              <IoIosHeart className="text-xl sm:text-2xl text-[#7b1f4b]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
