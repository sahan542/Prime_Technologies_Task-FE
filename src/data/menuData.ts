export type MenuItem = {
  title: string;
  categories: { label: string; href: string }[]; 
  images: string[]; 
};

export const menuData: Record<string, MenuItem> = {
  "SKIN CARE": {
    title: "Skin Care",
    categories: [
      { label: "Cleansers", href: "/skin-care/cleansers" },
      { label: "Moisturizers", href: "/skin-care/moisturizers" },
      { label: "Serums", href: "/skin-care/serums" },
      { label: "Toners", href: "/skin-care/toners" },
      { label: "Sunscreens", href: "/skin-care/sunscreens" },
      { label: "Eye & Lip Care", href: "/skin-care/eye-lip-care" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1749412893/29fcbf4c-ca13-40e7-a607-1ea6e9e3898c.__CR0_0_1464_600_PT0_SX1464_V1____rnrnc5.jpg"
    ],
  },

  "CLEANSERS": {
    title: "Cleansers",
    categories: [
      { label: "Gel Cleanser", href: "/cleansers/gel" },
      { label: "Oil Cleanser", href: "/cleansers/oil" },
      { label: "Foam Cleanser", href: "/cleansers/foam" },
      { label: "Micellar Water", href: "/cleansers/micellar-water" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1749847983/Vanilla-1_kmbj2y.webp"
    ],
  },
  "SERUMS": {
    title: "Serums",
    categories: [
      { label: "Vitamin C Serum", href: "/serums/vitamin-c" },
      { label: "Hyaluronic Acid Serum", href: "/serums/hyaluronic-acid" },
      { label: "Niacinamide Serum", href: "/serums/niacinamide" },
      { label: "Retinol Serum", href: "/serums/retinol" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1752270233/13_dbui6q.webp"    ],
  },
  "TONERS": {
    title: "Toners",
    categories: [
      { label: "Exfoliating Toner", href: "/toners/exfoliating" },
      { label: "Hydrating Toner", href: "/toners/hydrating" },
      { label: "Astringent Toner", href: "/toners/astringent" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1752270232/header-image-2_d9nald.avif"
    ],
  },
  "SUNSCREENS": {
    title: "Sunscreens",
    categories: [
      { label: "Mineral Sunscreen", href: "/sunscreens/mineral" },
      { label: "Chemical Sunscreen", href: "/sunscreens/chemical" },
      { label: "Tinted Sunscreen", href: "/sunscreens/tinted" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1752268974/pngtree-elegant-beauty-products-collection-featuring-brand-of-image_16006557_wnebgu.jpg"    ],
  },
    "MOISTURIZORS": {
    title: "Moisturizers",
    categories: [
      { label: "Creams", href: "/moisturizers/creams" },
      { label: "Lotions", href: "/moisturizers/lotions" },
      { label: "Hydrating Gel", href: "/moisturizers/hydrating-gel" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1752268974/cour-3.jpg_ncjcj1.webp"
    ],
  },

  "EYE & LIP CARE": {
    title: "Eye & Lip Care",
    categories: [
      { label: "Eye Cream", href: "/eye-lip-care/eye-cream" },
      { label: "Lip Balm", href: "/eye-lip-care/lip-balm" },
      { label: "Eye Serum", href: "/eye-lip-care/eye-serum" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1752268974/1_Desktop_2130x900_7e8d6460-b1dc-4cff-a63e-81b3a35b4760_jyalfw.webp"    ],
  },
};

