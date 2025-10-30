import { HomeIcon, File, UsersRound, LogOut } from 'lucide-react';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

import { Button } from '@/components/ui/button';
import { NavButton } from '@/components/NavButton';
import { ModeToggle } from '@/components/ModeToggle';
import { NavButtonMenu } from './NavButtonMenu';

export function Header() {
    return (
        <header className="animate-slide bg-background h-16 p-3 border-b top-0 z-20 shadow-sm">

            <div className="flex h-full items-center justify-between w-full">

                <div className="flex items-center gap-3">
                    <NavButton href="/tickets" label="Home" icon={HomeIcon} />

                    <Link href="/tickets" className="flex justify-center items-center gap-2 ml-0" title="Home">
                        <h1 className="hidden sm:block text-2xl font-bold m-0">
                            Computer Repair Shop
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center gap-1">

                    <NavButton href="/tickets" label="Tickets" icon={File} />

                    <NavButtonMenu
                        icon={UsersRound}
                        label="Customers Menu"
                        choices={[
                            { title: "Search Customers", href: "/customers" },
                            { title: "New Customer", href: "/customers/form" }
                        ]}
                    />

                    <ModeToggle />

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="LogOut"
                        title="LogOut"
                        className="rounded-full h-10 w-10"
                        asChild
                    >
                        <LogoutLink>
                            <LogOut className="h-5 w-5" />
                        </LogoutLink>
                    </Button>

                </div>

            </div>

        </header>
    )
}