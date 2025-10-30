import { Header } from "@/components/Header"
export default async function RSLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-rs-img bg-screen bg-center">
        <div className="mx-auto w-full max-w-7xl min-h-screen">
            <Header />
            <div className ="px-4 py-8 h-cover">
                {children}
            </div>
        </div>
        </div>
    )
}