"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"

import { StatesArray } from "@/constants/StatesArray"

import { insertCustomerSchema, type insertCustomerSchemaType, type selectCustomerSchemaType } from "@/zod-schemas/customer"

import { useAction } from 'next-safe-action/hooks'
import { saveCustomerAction } from "@/app/actions/saveCustomerActions"
import { useToast } from '@/hooks/use-toast'
import { LoaderCircle } from 'lucide-react'
import { DisplayServerActionResponse } from "@/components/DsiplayServerActionResponse"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

type Props = {
    customer?: selectCustomerSchemaType,
    isManager?: boolean | undefined,
}

export default function CustomerForm({ customer, isManager = false }: Props) {

    const { toast } = useToast()

    const searchParams = useSearchParams()
    const hasCustomerId = searchParams.has("customerId")

    const emptyValues: insertCustomerSchemaType = {
        id: 0,
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        notes: '',
        active: true,
    }

    const defaultValues: insertCustomerSchemaType = hasCustomerId ? {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? '',
        lastName: customer?.lastName ?? '',
        address1: customer?.address1 ?? '',
        address2: customer?.address2 ?? '',
        city: customer?.city ?? '',
        state: customer?.state ?? '',
        zip: customer?.zip ?? '',
        phone: customer?.phone ?? '',
        email: customer?.email ?? '',
        notes: customer?.notes ?? '',
        active: customer?.active ?? true,
    } : emptyValues

    const form = useForm<insertCustomerSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertCustomerSchema),
        defaultValues,
    })

    useEffect(() => {
        form.reset(hasCustomerId ? defaultValues : emptyValues)
    }, [searchParams.get("customerId")]) // eslint-disable-line react-hooks/exhaustive-deps

    const {
        execute: executeSave,
        result: saveResult,
        isPending: isSaving,
        reset: resetSaveAction,
    } = useAction(saveCustomerAction, {
        onSuccess({ data }) {
            if (data?.message) {
                toast({
                    variant: "default",
                    title: "Success! 🎉",
                    description: data.message,
                })
            }
        },
        onError(_error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Save Failed",
            })
        }
    })

    async function submitForm(data: insertCustomerSchemaType) {
        executeSave(data)
    }

    return (
        <div className="flex flex-col gap-6 sm:px-8 pb-8">
            <DisplayServerActionResponse result={saveResult} />
            
            {/* Header */}
            <div className="border-b border-white/10 pb-4">
                <h2 className="text-3xl font-bold tracking-tight">
                    {customer?.id ? "Edit" : "New"} Customer {customer?.id ? `#${customer.id}` : "Form"}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                    {customer?.id ? "Update customer information below" : "Fill in the details to create a new customer"}
                </p>
            </div>

            {/* Form Container */}
            <div className="border border-white/10 rounded-lg bg-black/40 p-6 md:p-8 backdrop-blur-sm">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(submitForm)}
                        className="flex flex-col md:flex-row gap-8 md:gap-12"
                    >
                        <div className="flex flex-col gap-6 w-full max-w-xs">

                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle="First Name"
                                nameInSchema="firstName"
                            />

                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle="Last Name"
                                nameInSchema="lastName"
                            />

                            {/* Address */}
                            <div className="space-y-4 pt-2">
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Address Information
                                </div>
                                
                                <InputWithLabel<insertCustomerSchemaType>
                                    fieldTitle="Address 1"
                                    nameInSchema="address1"
                                />

                                <InputWithLabel<insertCustomerSchemaType>
                                    fieldTitle="Address 2"
                                    nameInSchema="address2"
                                />

                                <InputWithLabel<insertCustomerSchemaType>
                                    fieldTitle="City"
                                    nameInSchema="city"
                                />

                                <SelectWithLabel<insertCustomerSchemaType>
                                    fieldTitle="State"
                                    nameInSchema="state"
                                    data={StatesArray}
                                />
                            </div>

                        </div>

                        {/* Vertical Divider */}
                        <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6 w-full max-w-xs">

                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle="Zip Code"
                                nameInSchema="zip"
                            />

                            {/* Contact Group */}
                            <div className="space-y-4 pt-2">
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Contact Information
                                </div>

                                <InputWithLabel<insertCustomerSchemaType>
                                    fieldTitle="Email"
                                    nameInSchema="email"
                                />

                                <InputWithLabel<insertCustomerSchemaType>
                                    fieldTitle="Phone"
                                    nameInSchema="phone"
                                />
                            </div>

                            <TextAreaWithLabel<insertCustomerSchemaType>
                                fieldTitle="Notes"
                                nameInSchema="notes"
                                className="h-40"
                            />

                            {isManager && customer?.id ? (
                                <CheckboxWithLabel<insertCustomerSchemaType>
                                    fieldTitle="Active"
                                    nameInSchema="active"
                                    message="Yes"
                                />) : null}

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    className="w-3/4 h-11 border border-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                    variant="default"
                                    title="Save"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <LoaderCircle className="animate-spin mr-2" /> Saving...
                                        </>
                                    ) : "Save Customer"}
                                </Button>

                                <Button
                                    type="button"
                                    className=" h-11 transition-all border border-white duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                    variant="destructive"
                                    title="Reset"
                                    onClick={() => {
                                        form.reset(defaultValues)
                                        resetSaveAction()
                                    }}
                                >
                                    Reset
                                </Button>
                            </div>

                        </div>

                    </form>
                </Form>
            </div>
        </div>
    )
}