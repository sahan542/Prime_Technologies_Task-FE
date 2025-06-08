// import { title } from 'process';
// import React from 'react';

// const productsData = [
// {
//         id: 0,
//         img: "/banner-11.jpg",
//         title: "Jacket",
//         desc: "MERN yarn flence full-zip jacket",
//         rating: 4,
//         price: "45.00",
//     },
//     {
//         id: 1,
//         img: "/banner-11.jpg",
//         title: "Sweater",
//         desc: "Cozy knit sweater with a high collar",
//         rating: 5,
//         price: "60.00",
//     },
//     {
//         id: 2,
//         img: "/banner-11.jpg",
//         title: "T-Shirt",
//         desc: "Basic cotton t-shirt with a minimalist design",
//         rating: 3,
//         price: "25.00",
//     },
//     {
//         id: 3,
//         img: "/banner-11.jpg",
//         title: "Jeans",
//         desc: "Slim-fit denim jeans with stretch",
//         rating: 4,
//         price: "55.00",
//     },
//     {
//         id: 4,
//         img: "/banner-11.jpg",
//         title: "Shoes",
//         desc: "Sporty sneakers for everyday wear",
//         rating: 5,
//         price: "80.00",
//     },
//     {
//         id: 5,
//         img: "/banner-11.jpg",
//         title: "Boots",
//         desc: "Leather boots with a rugged sole",
//         rating: 4,
//         price: "120.00",
//     },
//     {
//         id: 6,
//         img: "/banner-11.jpg",
//         title: "Scarf",
//         desc: "Soft wool scarf for the winter",
//         rating: 3,
//         price: "30.00",
//     },
//     {
//         id: 7,
//         img: "/banner-11.jpg",
//         title: "Gloves",
//         desc: "Touchscreen-compatible leather gloves",
//         rating: 4,
//         price: "35.00",
//     },
//     {
//         id: 8,
//         img: "/banner-11.jpg",
//         title: "Hat",
//         desc: "Wool beanie with a fold-up brim",
//         rating: 5,
//         price: "20.00",
//     },
//     {
//         id: 9,
//         img: "/banner-11.jpg",
//         title: "Sweatshirt",
//         desc: "Soft fleece sweatshirt with a logo",
//         rating: 4,
//         price: "50.00",
//     },
//     {
//         id: 10,
//         img: "/banner-11.jpg",
//         title: "Shorts",
//         desc: "Comfortable cotton shorts for the summer",
//         rating: 4,
//         price: "28.00",
//     },
// ];

// const NewProducts = () => {
//   return (
//     <div>
//         <div className="container pt-16">
//             <h2 className='font-medium text-2xl pb-4'>New Products</h2>
//             <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
//                 {productsData.map((item, index) => (
//                     <ProductCard 
//                         key = {index},
//                         img ={item.img},
//                         title= {item.title},
//                         desc= {item.desc},
//                         rating= {item.rating},
//                         price={item.price},
//                     />
//                 )
// )}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default NewProducts

import React from 'react';
import ProductCard from './ProductCard';  // Import ProductCard component

const productsData = [
    {
        id: 0,
        img: "/banner-11.jpg",
        title: "Jacket",
        desc: "MERN yarn flence full-zip jacket",
        rating: 4,
        price: "45.00",
    },
    {
        id: 1,
        img: "/banner-11.jpg",
        title: "Sweater",
        desc: "Cozy knit sweater with a high collar",
        rating: 5,
        price: "60.00",
    },
    {
        id: 2,
        img: "/banner-11.jpg",
        title: "T-Shirt",
        desc: "Basic cotton t-shirt with a minimalist design",
        rating: 3,
        price: "25.00",
    },
    {
        id: 3,
        img: "/banner-11.jpg",
        title: "Jeans",
        desc: "Slim-fit denim jeans with stretch",
        rating: 4,
        price: "55.00",
    },
    {
        id: 4,
        img: "/banner-11.jpg",
        title: "Shoes",
        desc: "Sporty sneakers for everyday wear",
        rating: 5,
        price: "80.00",
    },
    {
        id: 5,
        img: "/banner-11.jpg",
        title: "Boots",
        desc: "Leather boots with a rugged sole",
        rating: 4,
        price: "120.00",
    },
    {
        id: 6,
        img: "/banner-11.jpg",
        title: "Scarf",
        desc: "Soft wool scarf for the winter",
        rating: 3,
        price: "30.00",
    },
    {
        id: 7,
        img: "/banner-11.jpg",
        title: "Gloves",
        desc: "Touchscreen-compatible leather gloves",
        rating: 4,
        price: "35.00",
    },
    {
        id: 8,
        img: "/banner-11.jpg",
        title: "Hat",
        desc: "Wool beanie with a fold-up brim",
        rating: 5,
        price: "20.00",
    },
    {
        id: 9,
        img: "/banner-11.jpg",
        title: "Sweatshirt",
        desc: "Soft fleece sweatshirt with a logo",
        rating: 4,
        price: "50.00",
    },
    {
        id: 10,
        img: "/banner-11.jpg",
        title: "Shorts",
        desc: "Comfortable cotton shorts for the summer",
        rating: 4,
        price: "28.00",
    },
];

const NewProducts = () => {
  return (
    <div>
        <div className="container pt-16">
            <h2 className='font-medium text-2xl pb-4'>New Products</h2>
            <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
                {productsData.map((item) => (
                    <ProductCard 
                        key={item.id}
                        img={item.img}
                        title={item.title}
                        desc={item.desc}
                        rating={item.rating}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default NewProducts;
