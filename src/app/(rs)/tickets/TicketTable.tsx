"use client"

import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    SortingState,
    getPaginationRowModel,
    getFilteredRowModel,
    getFacetedUniqueValues,
    getSortedRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    CircleCheckIcon,
    CircleXIcon,
    ArrowUpDown,
    ArrowDown,
    ArrowUp,
    RefreshCw,
    RotateCcw,
    FilterX,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { usePolling } from "@/hooks/usePolling"
import { Button } from "@/components/ui/button"
import Filter from "@/components/react-table/Filter"

type Props = {
    data: TicketSearchResultsType,
}

type RowType = TicketSearchResultsType[0]

export default function TicketTable({ data }: Props) {
    const router = useRouter()

    const searchParams = useSearchParams()

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "ticketDate",
            desc: false,
        }
    ])

    usePolling(searchParams.get("searchText"), 300000)

    const pageIndex = useMemo(() => {
        const page = searchParams.get("page")
        return page ? parseInt(page) - 1 : 0
    }, [searchParams])

    const columnHeadersArray: Array<keyof RowType> = [
        "ticketDate",
        "title",
        "tech",
        "firstName",
        "lastName",
        "email",
        "completed",
    ]

    const columnWidths = {
        completed: 150,
        ticketDate: 150,
        title: 250,
        tech: 225,
        email: 225,
    }

    const columnHelper = createColumnHelper<RowType>()

    const columns = columnHeadersArray.map((columnName) => {
        return columnHelper.accessor((row) => {
            const value = row[columnName]
            if (columnName === "ticketDate" && value instanceof Date) {
                return value.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
            }
            if (columnName === "completed") {
                return value
                    ? "COMPLETED"
                    : "OPEN"
            }
            return value
        }, {
            id: columnName,
            size: columnWidths[columnName as keyof typeof columnWidths] ?? undefined,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="pl-1 w-full flex justify-between hover:bg-zinc-800/50 text-gray-100 font-semibold"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>{columnName[0].toUpperCase() + columnName.slice(1)}</span>

                        {column.getIsSorted() === "asc" && (
                            <ArrowUp className="ml-2 h-4 w-4 text-gray-400" />
                        )}

                        {column.getIsSorted() === "desc" && (
                            <ArrowDown className="ml-2 h-4 w-4 text-gray-400" />
                        )}

                        {column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc" && (
                            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                        )}
                    </Button>
                )
            },
            cell: ({ getValue }) => {
                const value = getValue()
                if (columnName === "completed") {
                    return (
                        <div className="grid place-content-center">
                            {value === "OPEN" 
                                ? <div className="flex items-center gap-2">
                                    <CircleXIcon className="h-5 w-5 text-gray-600" />
                                    <span className="text-xs font-medium text-gray-500 bg-gray-900 px-2 py-1 rounded">Open</span>
                                  </div>
                                : <div className="flex items-center gap-2">
                                    <CircleCheckIcon className="h-5 w-5 text-green-500" />
                                    <span className="text-xs font-medium text-green-400 bg-green-950/30 px-2 py-1 rounded">Done</span>
                                  </div>
                            }
                        </div>
                    )
                }
                if (columnName === "tech" && value === "unassigned") {
                    return <span className="text-xs font-medium text-amber-400 bg-amber-950/30 px-2 py-1 rounded">Unassigned</span>
                }
                return <span className="text-gray-200">{value}</span>
            }
        })
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            pagination: {
                pageIndex,
                pageSize: 10,
            },
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getSortedRowModel: getSortedRowModel(),
    })

    useEffect(() => {
        const currentPageIndex = table.getState().pagination.pageIndex
        const pageCount = table.getPageCount()

        if (pageCount <= currentPageIndex && currentPageIndex > 0) {
            const params = new URLSearchParams(searchParams.toString())
            params.set('page', '1')
            router.replace(`?${params.toString()}`, { scroll: false })
        }
    }, [table.getState().columnFilters]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="mt-6 flex flex-col gap-4">
            <div className="rounded-lg overflow-hidden border border-gray-800 bg-zinc-950">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-b border-gray-800 hover:bg-transparent">
                                {headerGroup.headers.map((header) => (
                                    <TableHead 
                                        key={header.id} 
                                        className="bg-zinc-900 p-1 border-r border-gray-800 last:border-r-0" 
                                        style={{ width: header.getSize() }}
                                    >
                                        <div>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </div>
                                        {header.column.getCanFilter() ? (
                                            <div className="grid place-content-center mt-1">
                                                <Filter
                                                    column={header.column}
                                                    filteredRows={table.getFilteredRowModel().rows.map(row => row.getValue(header.column.id))}
                                                />
                                            </div>
                                        ) : null}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                className={`cursor-pointer transition-colors duration-150
                                    ${idx % 2 === 0 ? 'bg-black' : 'bg-zinc-950'}
                                    hover:bg-zinc-800/50 
                                    border-b border-gray-900 last:border-b-0
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700`}
                                tabIndex={0}
                                role="button"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        router.push(`/tickets/form?ticketId=${row.original.id}`)
                                    }
                                }}
                                onClick={() => router.push(`/tickets/form?ticketId=${row.original.id}`)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell 
                                        key={cell.id} 
                                        className="border-r border-gray-900 last:border-r-0 py-4 px-3"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={columns.length} className="text-center py-12 text-gray-500">
                                    No results match your filters.
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </div>
            
            {/* Enhanced Footer */}
            <div className="flex justify-between items-center gap-4 flex-wrap bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-300">
                        Page <span className="text-white font-semibold">{table.getState().pagination.pageIndex + 1}</span> of <span className="text-white font-semibold">{Math.max(1, table.getPageCount())}</span>
                    </p>
                    <span className="text-gray-600">•</span>
                    <p className="text-sm text-gray-400">
                        {table.getFilteredRowModel().rows.length} {table.getFilteredRowModel().rows.length !== 1 ? "results" : "result"}
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-zinc-900 border-gray-800 text-gray-300 hover:bg-zinc-800 hover:border-gray-700 h-9"
                            onClick={() => router.refresh()}
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-zinc-900 border-gray-800 text-gray-300 hover:bg-zinc-800 hover:border-gray-700 h-9"
                            onClick={() => table.resetSorting()}
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset Sort
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-zinc-900 border-gray-800 text-gray-300 hover:bg-zinc-800 hover:border-gray-700 h-9"
                            onClick={() => table.resetColumnFilters()}
                        >
                            <FilterX className="h-4 w-4 mr-2" />
                            Clear Filters
                        </Button>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-zinc-900 border-gray-800 text-gray-300 hover:bg-zinc-800 hover:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed h-9"
                            onClick={() => {
                                const newIndex = table.getState().pagination.pageIndex - 1
                                table.setPageIndex(newIndex)
                                const params = new URLSearchParams(searchParams.toString())
                                params.set("page", (newIndex + 1).toString())
                                router.replace(`?${params.toString()}`, { scroll: false })
                            }}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-zinc-900 border-gray-800 text-gray-300 hover:bg-zinc-800 hover:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed h-9"
                            onClick={() => {
                                const newIndex = table.getState().pagination.pageIndex + 1
                                table.setPageIndex(newIndex)
                                const params = new URLSearchParams(searchParams.toString())
                                params.set("page", (newIndex + 1).toString())
                                router.replace(`?${params.toString()}`, { scroll: false })
                            }}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}