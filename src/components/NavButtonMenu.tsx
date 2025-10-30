import type { LucideIcon } from "lucide-react";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
    icon: LucideIcon,
    label: string,
    choices: {
        title: string,
        href: string,
    }[],
}

export function NavButtonMenu({
    icon: Icon,
    label,
    choices,
}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-zinc-800 transition-colors"
                >
                    <Icon className="h-[1.2rem] w-[1.2rem] text-gray-300" />
                    <span className="sr-only">{label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end"
                className="bg-zinc-950 border-gray-800 backdrop-blur-sm"
            >
                {choices.map(choice => (
                    <DropdownMenuItem 
                        key={choice.title} 
                        // using asChild make the component to pass it directly
                        asChild
                        className="text-gray-300 hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white cursor-pointer transition-colors"
                    >
                        <Link href={choice.href}>
                            {choice.title}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}