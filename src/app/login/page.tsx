import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button"
import Navbar  from "@/components/Navbar"

export default function LoginPage() {
    return (
        <div>
        <Navbar/>
        <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
            <Button asChild>
                <LoginLink className="text-2xl font-bold">login</LoginLink>
            </Button>
        </main>
        </div>
    )
}