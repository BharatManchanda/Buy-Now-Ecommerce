import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Product from "../models/product.js";
import ProductCategory from "../models/productCategory.js";

const MONGO_URI = process.env.CONNECTION_STRING || "mongodb://localhost:27017/mydb";

// --- Main categories (existing + new) ---
const categories = [
  {
    name: 'Fruits & Vegetables',
    slug: 'fresh-fruits-vegetables',
    description: 'Fresh and organic fruits and vegetables sourced directly from farms.',
    imageUrl: '/uploads/categories/fruits-vegetables.png'
  },
  {
    name: 'Dairy & Bakery',
    slug: 'dairy-bakery',
    description: 'Dairy products and baked goods made with high-quality ingredients.',
    imageUrl: '/uploads/categories/dairy-bakery.png'
  },
  {
    name: 'Beverages',
    slug: 'beverages',
    description: 'A wide range of refreshing drinks, including juices, sodas, and more.',
    imageUrl: '/uploads/categories/beverages.png'
  },
  {
    name: 'Snacks & Munchies',
    slug: 'snacks-munchies',
    description: 'Tasty snacks and munchies for every craving.',
    imageUrl: '/uploads/categories/snacks-munchies.png'
  },
  {
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Essential personal care products for your daily routine.',
    imageUrl: '/uploads/categories/personal-care.png'
  },
  {
    name: 'Pet Care',
    slug: 'pet-care',
    description: 'Quality food and care products for your beloved pets.',
    imageUrl: '/uploads/categories/pet-care.png'
  },
  {
    name: 'Baby Care',
    slug: 'baby-care',
    description: 'Safe and gentle products for your little ones.',
    imageUrl: '/uploads/categories/baby-care.png'
  },
  {
    name: 'Home & Cleaning',
    slug: 'home-cleaning',
    description: 'Effective cleaning supplies for a spotless home.',
    imageUrl: '/uploads/categories/home-cleaning.png'
  },
  {
    name: 'Meat, Fish & Eggs',
    slug: 'meat-fish-eggs',
    description: 'Fresh and high-quality meat, fish, and eggs.',
    imageUrl: '/uploads/categories/meat-fish-eggs.png'
  },
  {
    name: 'Organic & Health Living',
    slug: 'organic-health-living',
    description: 'Products to support your health and wellness journey.',
    imageUrl: '/uploads/categories/organic-health-living.png'
  },
  {
    name: "Pharmacy & Wellness",
    slug: 'pharmacy-wellness',
    description: 'Medicines, supplements, and wellness products for your health.',
    imageUrl: '/uploads/categories/pharmacy-wellness.png',
  },
  {
    name: "Tea Coffee & Milk Drinks",
    slug: 'tea-coffee-milk-drinks',
    description: 'A variety of teas, coffees, and milk-based beverages.',
    imageUrl: '/uploads/categories/tea-coffee-milk-drinks.png',
  },
  {
    name: "Bakery & Biscuits",
    slug: 'bakery-biscuits',
    description: 'Freshly baked goods and a variety of biscuits.',
    imageUrl: '/uploads/categories/bakery-biscuits.png',
  },
  {
    name: "Cold Drinks & Juices",
    slug: 'cold-drinks-juices',
    description: 'Refreshing cold drinks and a variety of juices.',
    imageUrl: '/uploads/categories/cold-drinks-juices.png',
  },
  {
    name: "Sweets & Desserts",
    slug: 'sweets-desserts',
    description: 'Delicious sweets and desserts for every occasion.',
    imageUrl: '/uploads/categories/sweets-desserts.png',
  },
  {
    name: "Atta, Rice & Dal",
    slug: 'atta-rice-dal',
    description: 'Staple grains and pulses for your daily meals.',
    imageUrl: '/uploads/categories/atta-rice-dal.png',
  },
  {
    name: "Breakfast & Cereal",
    slug: 'breakfast-cereal',
    description: 'Start your day with our range of breakfast cereals and foods.',
    imageUrl: '/uploads/categories/breakfast-cereal.png',
  },
  {
    name: "Sauce & Spreads",
    slug: 'sauce-spreads',
    description: 'A variety of sauces and spreads to enhance your meals.',
    imageUrl: '/uploads/categories/sauce-spreads.png',
  },
  {
    name: "Masala & Cooking Needs",
    slug: 'masala-cooking-needs',
    description: 'Essential spices and cooking ingredients for your kitchen.',
    imageUrl: '/uploads/categories/masala-cooking-needs.png',
  },
  {
    name: "Home & Office Needs",
    slug: 'home-office-needs',
    description: 'Supplies for your home and office needs.',
    imageUrl: '/uploads/categories/home-office-needs.png',
  }
];

// --- Subcategories (existing + new) ---
const subcategories = {
  'Fruits & Vegetables': [
    { name: 'Fresh Fruits', slug: 'fresh-fruits', description: 'A variety of fresh and seasonal fruits.', imageUrl: '/uploads/fresh-fruits.png' },
    { name: 'Fresh Vegetables', slug: 'fresh-vegetables', description: 'A selection of fresh and organic vegetables.', imageUrl: '/uploads/fresh-vegetables.png' },
    { name: 'Leafy Greens', slug: 'leafy-greens', description: 'Nutritious leafy greens for salads and cooking.', imageUrl: '/uploads/leafy-greens.png' },
    { name: 'Root Vegetables', slug: 'root-vegetables', description: 'Hearty root vegetables for various dishes.', imageUrl: '/uploads/root-vegetables.png' }
  ],
  'Dairy & Bakery': [
    { name: 'Milk & Yogurt', slug: 'milk-yogurt', description: 'Dairy products for a healthy diet.', imageUrl: '/uploads/milk-yogurt.png' },
    { name: 'Cheese & Butter', slug: 'cheese-butter', description: 'Rich and creamy cheese and butter.', imageUrl: '/uploads/cheese-butter.png' },
    { name: 'Breads & Pastries', slug: 'breads-pastries', description: 'Freshly baked breads and pastries.', imageUrl: '/uploads/breads-pastries.png' }
  ],
  'Beverages': [
    { name: 'Tea & Coffee', slug: 'tea-coffee', description: 'A variety of teas and coffees.', imageUrl: '/uploads/tea-coffee.png' },
    { name: 'Juices & Smoothies', slug: 'juices-smoothies', description: 'Refreshing juices and smoothies.', imageUrl: '/uploads/juices-smoothies.png' }
  ],
  'Snacks & Munchies': [
    { name: 'Chips & Namkeen', slug: 'chips-namkeen', description: 'Crispy chips and savory snacks.', imageUrl: '/uploads/chips-namkeen.png' },
    { name: 'Chocolate & Candies', slug: 'chocolate-candies', description: 'Delicious chocolates and candies.', imageUrl: '/uploads/chocolate-candies.png' }
  ],
  'Personal Care': [
    { name: 'Hair Care', slug: 'hair-care', description: 'Shampoo, conditioner, and hair styling products.', imageUrl: '/uploads/hair-care.png' },
    { name: 'Skin Care', slug: 'skin-care', description: 'Moisturizers, cleansers, and skincare treatments.', imageUrl: '/uploads/skin-care.png' }
  ],
  'Pet Care': [
    { name: 'Dog Food', slug: 'dog-food', description: 'Nutritious food and treats for dogs.', imageUrl: '/uploads/dog-food.png' },
    { name: 'Cat Food', slug: 'cat-food', description: 'Healthy food and treats for cats.', imageUrl: '/uploads/cat-food.png' }
  ],
  'Baby Care': [
    { name: 'Diapers & Wipes', slug: 'diapers-wipes', description: 'Essential diapers and wipes for babies.', imageUrl: '/uploads/diapers-wipes.png' },
    { name: 'Baby Food', slug: 'baby-food', description: 'Nutritious food options for babies.', imageUrl: '/uploads/baby-food.png' }
  ],
  'Home & Cleaning': [
    { name: 'Cleaning Supplies', slug: 'cleaning-supplies', description: 'Effective cleaning supplies for a spotless home.', imageUrl: '/uploads/cleaning-supplies.png' },
    { name: 'Kitchen Essentials', slug: 'kitchen-essentials', description: 'Must-have items for every kitchen.', imageUrl: '/uploads/kitchen-essentials.png' }
  ],
  'Meat, Fish & Eggs': [
    { name: 'Fresh Meat', slug: 'fresh-meat', description: 'High-quality fresh meat for your meals.', imageUrl: '/uploads/fresh-meat.png' },
    { name: 'Seafood', slug: 'seafood', description: 'Fresh and delicious seafood options.', imageUrl: '/uploads/seafood.png' },
    { name: 'Eggs', slug: 'eggs', description: 'Farm-fresh eggs for your breakfast.', imageUrl: '/uploads/eggs.png' }
  ]
};

// --- Products (existing + new) ---
const productsBySubcategory = {
  // Fruits & Veg
  'Fresh Fruits': [
    {
      name: 'Apple',
      slug: 'apple',
      imageUrl: ['/uploads/apple.png']
    },
    {
      name: 'Banana',
      slug: 'banana',
      imageUrl: ['/uploads/banana.png']
    },
    {
      name: 'Grapes',
      slug: 'grapes',
      imageUrl: ['/uploads/grapes.png']
    },
    {
      name: 'Mango',
      slug: 'mango',
      imageUrl: ['/uploads/mango.png']
    },
    {
      name: 'Orange',
      slug: 'orange',
      imageUrl: ['/uploads/orange.png']
    }
],
  'Leafy Greens': [
    {
      name: 'Spinach',
      slug: 'spinach',
      imageUrl: ['/uploads/spinach.png']
    },
    {
      name: 'Lettuce',
      slug: 'lettuce',
      imageUrl: ['/uploads/lettuce.png']
    },
    {
      name: 'Kale',
      slug: 'kale',
      imageUrl: ['/uploads/kale.png']
    },
    {
      name: 'Coriander',
      slug: 'coriander',
      imageUrl: ['/uploads/coriander.png']
    },
    {
      name: 'Mint',
      slug: 'mint',
      imageUrl: ['/uploads/mint.png']
    }
  ],
  'Root Vegetables': [
    {
      name: 'Carrot',
      slug: 'carrot',
      imageUrl: ['/uploads/carrot.png']
    },
    {
      name: 'Potato',
      slug: 'potato',
      imageUrl: ['/uploads/potato.png']
    },
    {
      name: 'Beetroot',
      slug: 'beetroot',
      imageUrl: ['/uploads/beetroot.png']
    },
    {
      name: 'Radish',
      slug: 'radish',
      imageUrl: ['/uploads/radish.png']
    },
    {
      name: 'Turnip',
      slug: 'turnip',
      imageUrl: ['/uploads/turnip.png']
    }
  ],

  // Dairy & Bakery
  'Milk & Yogurt': [
    {
      name: 'Full Cream Milk',
      slug: 'full-cream-milk',
      imageUrl: ['/uploads/full-cream-milk.png']
    },
    {
      name: 'Greek Yogurt',
      slug: 'greek-yogurt',
      imageUrl: ['/uploads/greek-yogurt.png']
    },
    {
      name: 'Low Fat Milk',
      slug: 'low-fat-milk',
      imageUrl: ['/uploads/low-fat-milk.png']
    },
    {
      name: 'Paneer',
      slug: 'paneer',
      imageUrl: ['/uploads/paneer.png']
    }
  ],
  'Cheese & Butter': [
    {
      name: 'Cheddar Cheese',
      slug: 'cheddar-cheese',
      imageUrl: ['/uploads/cheddar-cheese.png']
    },
    {
      name: 'Butter',
      slug: 'butter',
      imageUrl: ['/uploads/butter.png']
    },
    {
      name: 'Cottage Cheese',
      slug: 'cottage-cheese',
      imageUrl: ['/uploads/cottage-cheese.png']
    },
    {
      name: 'Mozzarella',
      slug: 'mozzarella',
      imageUrl: ['/uploads/mozzarella.png']
    }
  ],
  'Breads & Pastries': [
    {
      name: 'Whole Wheat Bread',
      slug: 'whole-wheat-bread',
      imageUrl: ['/uploads/whole-wheat-bread.png']
    },
    {
      name: 'Croissant',
      slug: 'croissant',
      imageUrl: ['/uploads/croissant.png']
    },
    {
      name: 'Bagel',
      slug: 'bagel',
      imageUrl: ['/uploads/bagel.png']
    },
    {
      name: 'Buns',
      slug: 'buns',
      imageUrl: ['/uploads/buns.png']
    }
  ],

  // Beverages
  'Tea & Coffee': [
    {
      name: 'Green Tea',
      slug: 'green-tea',
      imageUrl: ['/uploads/green-tea.png']
    },
    {
      name: 'Black Coffee',
      slug: 'black-coffee',
      imageUrl: ['/uploads/black-coffee.png']
    },
    {
      name: 'Herbal Tea',
      slug: 'herbal-tea',
      imageUrl: ['/uploads/herbal-tea.png']
    },
    {
      name: 'Espresso',
      slug: 'espresso',
      imageUrl: ['/uploads/espresso.png']
    }
  ],
  'Juices & Smoothies': [
    {
      name: 'Orange Juice',
      slug: 'orange-juice',
      imageUrl: ['/uploads/orange-juice.png']
    },
    {
      name: 'Apple Juice',
      slug: 'apple-juice',
      imageUrl: ['/uploads/apple-juice.png']
    },
    {
      name: 'Mango Smoothie',
      slug: 'mango-smoothie',
      imageUrl: ['/uploads/mango-smoothie.png']
    },
    {
      name: 'Carrot Juice',
      slug: 'carrot-juice',
      imageUrl: ['/uploads/carrot-juice.png']
    }
  ],

  // Snacks & Munchies
  'Chips & Namkeen': [
    {
      name: 'Potato Chips',
      slug: 'potato-chips',
      imageUrl: ['/uploads/potato-chips.png']
    },
    {
      name: 'Mixed Namkeen',
      slug: 'mixed-namkeen',
      imageUrl: ['/uploads/mixed-namkeen.png']
    },
    {
      name: 'Corn Chips',
      slug: 'corn-chips',
      imageUrl: ['/uploads/corn-chips.png']
    },
    {
      name: 'Popcorn',
      slug: 'popcorn',
      imageUrl: ['/uploads/popcorn.png']
    }
  ],
  'Chocolate & Candies': [
    {
      name: 'Milk Chocolate',
      slug: 'milk-chocolate',
      imageUrl: ['/uploads/milk-chocolate.png']
    },
    {
      name: 'Dark Chocolate',
      slug: 'dark-chocolate',
      imageUrl: ['/uploads/dark-chocolate.png']
    },
    {
      name: 'Gummy Bears',
      slug: 'gummy-bears',
      imageUrl: ['/uploads/gummy-bears.png']
    },
    {
      name: 'Lollipops',
      slug: 'lollipops',
      imageUrl: ['/uploads/lollipops.png']
    }
  ],

  // Personal Care
  'Hair Care': [
    {
      name: 'Shampoo',
      slug: 'shampoo',
      imageUrl: ['/uploads/shampoo.png']
    },
    {
      name: 'Conditioner',
      slug: 'conditioner',
      imageUrl: ['/uploads/conditioner.png']
    },
    {
      name: 'Hair Oil',
      slug: 'hair-oil',
      imageUrl: ['/uploads/hair-oil.png']
    },
    {
      name: 'Hair Mask',
      slug: 'hair-mask',
      imageUrl: ['/uploads/hair-mask.png']
    }
  ],
  'Skin Care': [
    {
      name: 'Face Cream',
      slug: 'face-cream',
      imageUrl: ['/uploads/face-cream.png']
    },
    {
      name: 'Body Lotion',
      slug: 'body-lotion',
      imageUrl: ['/uploads/body-lotion.png']
    },
    {
      name: 'Sunscreen',
      slug: 'sunscreen',
      imageUrl: ['/uploads/sunscreen.png']
    },
    {
      name: 'Face Wash',
      slug: 'face-wash',
      imageUrl: ['/uploads/face-wash.png']
    }
  ],

  // Pet Care
  'Dog Food': [
    {
      name: 'Pedigree Dog Food',
      slug: 'pedigree-dog-food',
      imageUrl: ['/uploads/pedigree-dog-food.png']
    },
    {
      name: 'Dog Treats',
      slug: 'dog-treats',
      imageUrl: ['/uploads/dog-treats.png']
    },
    {
      name: 'Dog Biscuits',
      slug: 'dog-biscuits',
      imageUrl: ['/uploads/dog-biscuits.png']
    }
  ],
  'Cat Food': [
    {
      name: 'Whiskas Cat Food',
      slug: 'whiskas-cat-food',
      imageUrl: ['/uploads/whiskas-cat-food.png']
    },
    {
      name: 'Cat Treats',
      slug: 'cat-treats',
      imageUrl: ['/uploads/cat-treats.png']
    },
    {
      name: 'Catnip Toys',
      slug: 'catnip-toys',
      imageUrl: ['/uploads/catnip-toys.png']
    }
  ],

  // Baby Care
  'Diapers & Wipes': [
    {
      name: 'Pampers Diapers',
      slug: 'pampers-diapers',
      imageUrl: ['/uploads/pampers-diapers.png']
    },
    {
      name: 'Huggies Wipes',
      slug: 'huggies-wipes',
      imageUrl: ['/uploads/huggies-wipes.png']
    },
    {
      name: 'Baby Dry Diapers',
      slug: 'baby-dry-diapers',
      imageUrl: ['/uploads/baby-dry-diapers.png']
    }
  ],
  'Baby Food': [
    {
      name: 'Infant Formula',
      slug: 'infant-formula',
      imageUrl: ['/uploads/infant-formula.png']
    },
    {
      name: 'Baby Cereal',
      slug: 'baby-cereal',
      imageUrl: ['/uploads/baby-cereal.png']
    },
    {
      name: 'Baby Porridge',
      slug: 'baby-porridge',
      imageUrl: ['/uploads/baby-porridge.png']
    }
  ],

  // Home & Cleaning
  'Cleaning Supplies': [
    {
      name: 'Detergent Powder',
      slug: 'detergent-powder',
      imageUrl: ['/uploads/detergent-powder.png']
    },
    {
      name: 'Dish Soap',
      slug: 'dish-soap',
      imageUrl: ['/uploads/dish-soap.png']
    },
    {
      name: 'Mop',
      slug: 'mop',
      imageUrl: ['/uploads/mop.png']
    },
    {
      name: 'Scrub',
      slug: 'scrub',
      imageUrl: ['/uploads/scrub.png']
    }
  ],
  'Kitchen Essentials': [
     {
      name: 'Sponges',
      slug: 'sponges',
      imageUrl: ['/uploads/sponges.png']
    },
    {
      name: 'Utensils',
      slug: 'utensils',
      imageUrl: ['/uploads/utensils.png']
    },
    {
      name: 'Cutting Board',
      slug: 'cutting-board',
      imageUrl: ['/uploads/cutting-board.png']
    },
    {
      name: 'Storage Containers',
      slug: 'storage-containers',
      imageUrl: ['/uploads/storage-containers.png']
    }
  ],
  'Detergent Powder': [
    {
      name: 'Detergent Powder',
      slug: 'detergent-powder',
      imageUrl: ['/uploads/detergent-powder.png']
    },
    {
      name: 'Dish Soap',
      slug: 'dish-soap',
      imageUrl: ['/uploads/dish-soap.png']
    },
    {
      name: 'Mop',
      slug: 'mop',
      imageUrl: ['/uploads/mop.png']
    },
    {
      name: 'Scrub',
      slug: 'scrub',
      imageUrl: ['/uploads/scrub.png']
    }
  ],
  'Kitchen Essentials': [
    {
      name: 'Sponges',
      slug: 'sponges',
      imageUrl: ['/uploads/sponges.png']
    },
    {
      name: 'Utensils',
      slug: 'utensils',
      imageUrl: ['/uploads/utensils.png']
    },
    {
      name: 'Cutting Board',
      slug: 'cutting-board',
      imageUrl: ['/uploads/cutting-board.png']
    },
    {
      name: 'Storage Containers',
      slug: 'storage-containers',
      imageUrl: ['/uploads/storage-containers.png']
    }
  ],

  // Meat, Fish & Eggs
  'Fresh Meat': [
    {
      name: 'Chicken',
      slug: 'chicken',
      imageUrl: ['/uploads/chicken.png']
    },
    {
      name: 'Mutton',
      slug: 'mutton',
      imageUrl: ['/uploads/mutton.png']
    },
    {
      name: 'Beef',
      slug: 'beef',
      imageUrl: ['/uploads/beef.png']
    },
    {
      name: 'Pork',
      slug: 'pork',
      imageUrl: ['/uploads/pork.png']
    }
  ],
  'Seafood': [
    {
      name: 'Fish',
      slug: 'fish',
      imageUrl: ['/uploads/fish.png']
    },
    {
      name: 'Prawns',
      slug: 'prawns',
      imageUrl: ['/uploads/prawns.png']
    },
    {
      name: 'Crabs',
      slug: 'crabs',
      imageUrl: ['/uploads/crabs.png']
    },
    {
      name: 'Squid',
      slug: 'squid',
      imageUrl: ['/uploads/squid.png']
    }
  ],
  'Eggs': [
    {
      name: 'Chicken Eggs',
      slug: 'chicken-eggs',
      imageUrl: ['/uploads/chicken-eggs.png']
    },
    {
      name: 'Duck Eggs',
      slug: 'duck-eggs',
      imageUrl: ['/uploads/duck-eggs.png']
    },
    {
      name: 'Quail Eggs',
      slug: 'quail-eggs',
      imageUrl: ['/uploads/quail-eggs.png']
    }
  ]
};

// ---------------- Utility Functions ----------------

const getRandomPrice = () =>
  parseFloat((Math.random() * 10 + 5).toFixed(2));
const getRandomDiscount = () => Math.floor(Math.random() * 25);
const getRandomStock = () =>
  Math.floor(Math.random() * 100) + 10;

// ---------------- Seeder ----------------
const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    const categoryDocs = {};
    const subCategoryDocs = {};

    /* ==========================
       1️⃣ MAIN CATEGORIES
    ========================== */
    for (const cat of categories) {
      const doc = await ProductCategory.findOneAndUpdate(
        { slug: cat.slug }, // unique field
        {
          name: cat.name,
          imageUrl: cat.imageUrl,
          description: cat.description,
          parentCategory: null,
        },
        { upsert: true, new: true }
      );

      categoryDocs[cat.name] = doc;
    }

    console.log("📁 Main categories seeded/updated");

    /* ==========================
       2️⃣ SUBCATEGORIES
    ========================== */
    for (const [parentName, subs] of Object.entries(subcategories)) {
      const parent = categoryDocs[parentName];

      if (!parent) {
        console.log(`⚠️ Parent not found: ${parentName}`);
        continue;
      }

      for (const sub of subs) {
        const doc = await ProductCategory.findOneAndUpdate(
          { slug: sub.slug },
          {
            name: sub.name,
            imageUrl: sub.imageUrl,
            description: sub.description,
            parentCategory: parent._id,
          },
          { upsert: true, new: true }
        );

        subCategoryDocs[sub.name] = doc;
      }
    }

    console.log("📂 Subcategories seeded/updated");

    /* ==========================
       3️⃣ PRODUCTS
    ========================== */
    for (const [subName, productList] of Object.entries(
      productsBySubcategory
    )) {
      const subCat = subCategoryDocs[subName];

      if (!subCat) {
        console.log(`⚠️ Subcategory not found: ${subName}`);
        continue;
      }

      for (const prod of productList) {
        await Product.findOneAndUpdate(
          {
            name: prod.name,
            category_id: subCat._id,
          },
          {
            name: prod.name,
            imageUrl: prod.imageUrl,
            price: getRandomPrice(),
            discount: getRandomDiscount(),
            stock: getRandomStock(),
            category_id: subCat._id,
          },
          { upsert: true, new: true }
        );
      }
    }

    console.log("🛒 Products seeded/updated");

    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected");
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    await mongoose.disconnect();
  }
};

seedData();