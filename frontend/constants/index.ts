import { CreditCard, History, Home, Settings} from "lucide-react";


export const navLinks = [
    {
      label: "Home",
      route: "/",
      icon: Home,
    },
    {
      label: "Orders",
      route: "/orders",
      icon: History,
    },
    
  
    
    
    
  ];

export const OrderData = [
    {
        name:"Chicken Roast",
        desc:"Chicken Reciepe",
        price: "35",
        category:"chicken",
        icon:'/assets/item2.webp',
        
    },
    
    
    {
        name:"Beef Steak",
        desc:"Beef Steak Recipes",
        price: "70",
        category:"beef",
        icon:'/assets/item4.jpg',
        
    },

   
    {
        name:"Chicken Pizza",
        desc:"Pizza Reciepe",
        price: "30",
        category:"pizza",
        icon:'/assets/item7.jpg',
        
    },
    {
        name:"Salad Recipes",
        desc:"Green Salad Reciepes",
        price: "20",
        category:"salad",
        icon:'/assets/item8.jpg',
        
    },
    
]