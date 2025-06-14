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
    ],
    images: ["/assets/skin1.jpg", "/assets/skin2.jpg"],
  },
  "MOISTURIZORS": {
    title: "Moisturizers",
    categories: [
      { label: "Creams", href: "/moisturizers/creams" },
      { label: "Lotions", href: "/moisturizers/lotions" },
    ],
    images: ["/assets/moist1.jpg"],
  },
};
