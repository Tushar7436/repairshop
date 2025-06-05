import TicketSearch from "./TicketSearch/TicketSearch"


export const metadata = {
    title: "tickets Search",
}

export default async function tickets({  
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
})  {
    const { searchText } = await searchParams

    if (!searchText) {
        // query default results
        return (
            <>
                <TicketSearch />
                <p> {JSON.stringify("placeholder")}</p>
            </>
        )
    }

    // query search result


    //return search results
    
}