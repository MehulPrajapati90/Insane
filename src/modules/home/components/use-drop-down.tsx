"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import NavItems from "./nav-items";
import { SignOutButton, useUser } from "@clerk/nextjs";

const UseDropDown = () => {
    const router = useRouter();
    const handleSignOut = async () => {
        router.push('/sign-in');
    }
    const { user } = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 rounded-full">
                    <Settings2 size={25} className="text-zinc-400" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-400">
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.imageUrl} />
                            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">{`${user?.firstName} ${user?.lastName}`}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-400">
                                {`${user?.firstName} ${user?.lastName}`}
                            </span>
                            <span className="text-sm text-gray-500">{`${user?.emailAddresses}`}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                    <SignOutButton />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="sm:hidden block bg-gray-600" />
                <nav className="sm:hidden">
                    <NavItems />
                </nav>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UseDropDown;