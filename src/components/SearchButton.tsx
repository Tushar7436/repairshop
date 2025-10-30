"use client"

import { useFormStatus } from "react-dom"
import { LoaderCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchButton() {
    const status = useFormStatus()

    return(
        <Button 
            type="submit"
            disabled={status.pending}
            className="h-11 px-6 bg-zinc-950 text-gray-100 border border-gray-800 font-medium
                     hover:bg-zinc-900 hover:border-gray-700
                     active:bg-zinc-800
                     disabled:bg-gray-900 disabled:text-gray-600 disabled:border-gray-800 disabled:cursor-not-allowed
                     transition-all duration-200 rounded-lg
                     flex items-center gap-2 whitespace-nowrap min-w-[120px]"
            aria-busy={status.pending}
            aria-live="polite"
        >
            {status.pending ? (
                <>
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    <span>Searching...</span>
                </>
            ) : (
                <>
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                </>
            )}
        </Button>
    )
}