"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CircleUserRound, LayoutGrid, Search, ShoppingBag, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_Utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const [CategoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const [totalCartItem,setTotalCartItem]=useState(0)
  const router = useRouter();

  useEffect(() => {
    getCategory();

    // Ensure sessionStorage is only accessed on the client-side
    if (typeof window !== "undefined") {
      setIsLogin(!!sessionStorage.getItem("jwt"));
    }
  }, []);

  const getCategory = async () => {
    try {
      const resp = await GlobalApi.getCategory();
      if (resp?.data?.data) {
        setCategoryList(resp.data.data);
      } else {
        console.warn("Received empty category list");
        setCategoryList([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategoryList([]);
    }
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  return (
    <div className="p-5 shadow-sm">
      <div className="flex items-center justify-between p-4">
        {/* Left Section - Logo, Category, Search */}
        <div className="flex items-center gap-8">
          <Image src="/logo.png" alt="Logo" width={170} height={120} />

          {/* Category Dropdown */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
                  <LayoutGrid className="h-5 w-5" /> Category
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {CategoryList.length > 0 ? (
                  CategoryList.map((category, index) => {
                    const iconData = category?.icon?.[0];
                    const iconUrl = iconData?.url ? `${backendUrl}${iconData.url}` : null;
                    const categoryName = category?.name || "Unknown";

                    return (
                      <DropdownMenuItem key={index} className="flex items-center gap-2 cursor-pointer">
                        {iconUrl ? (
                          <Image src={iconUrl} alt="icon" width={30} height={27} />
                        ) : (
                          <span>🖼️</span> // Placeholder if no image
                        )}
                        <h2 className="text-lg">{categoryName}</h2>
                      </DropdownMenuItem>
                    );
                  })
                ) : (
                  <DropdownMenuItem>Loading...</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
            <Search />
            <input type="text" placeholder="Search" className="outline-none bg-transparent" />
          </div>
        </div>

        {/* Right Section - Shopping Bag & Login Button */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-lg cursor-pointer">
            <ShoppingBasket className="h-7 w-7" />
            <span className="bg-primary text-white | px-2 rounded-full">{}</span>
          </div>
          {!isLogin ? (
            <Link href={"/sign-in"}>
              <Button>Login</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUserRound className="bg-green-100 p-2 rounded-full cursor-pointer text-primary h-12 w-12" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={onSignOut}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
