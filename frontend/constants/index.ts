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
    
    {
      label: "Billing",
      route: "/billing",
      icon: CreditCard,
    },
    
    
    
  ];

export const OrderData = [
    {
        name:"Chicken Roast",
        desc:"Chicken Reciepe",
        category:"chicken",
        icon:'/assets/item2.webp',
        
    },
    
    
    {
        name:"Beef Steak",
        desc:"Beef Recipes",
        category:"beef",
        icon:'/assets/item4.jpg',
        
    },

   
    {
        name:"Chicken Pizza",
        desc:"Pizza Reciepe",
        category:"pizza",
        icon:'/assets/item7.jpg',
        
    },
    {
        name:"Salad Recipes",
        desc:"Green Salad Reciepes",
        category:"salad",
        icon:'/assets/item8.jpg',
        
    },
    
]