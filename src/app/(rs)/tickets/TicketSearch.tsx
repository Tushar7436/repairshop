import Form from "next/form"
import { Input } from "@/components/ui/input"
import SearchButton from "@/components/SearchButton"
import { Search } from "lucide-react"

export default function TicketSearch() {  
    return (
        <Form 
            action="/tickets"
            className="flex gap-3 items-center w-full"
        >
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                    name="searchText"
                    type="text"
                    placeholder="Search Tickets"
                    className="w-full pl-10 h-11 bg-black border-gray-800 focus:border-gray-600 transition-colors"
                />
            </div>
            <SearchButton />
        </Form>
    )
}