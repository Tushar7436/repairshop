'use client';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "@excalidraw/excalidraw/index.css";
import Navbar from "@/components/Navbar";

const ExcalidrawWrapper = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export default function Home() {
  const [ticketData, setTicketData] = useState<any>(null);
  const [customerData, setCustomerData] = useState<any>(null);

  // Load both Excalidraw files
  useEffect(() => {
    fetch("/flows/crm-flow.excalidraw")
      .then((res) => res.json())
      .then((json) => setTicketData(json))
      .catch((err) => console.error("Error loading ticket diagram:", err));

    fetch("/flows/crm-flow.excalidraw")
      .then((res) => res.json())
      .then((json) => setCustomerData(json))
      .catch((err) => console.error("Error loading customer diagram:", err));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* --- CRM Overview --- */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">CRM Systems</h1>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          Our CRM (Customer Relationship Management) system connects ticketing,
          technician workflows, and customer satisfaction tracking — helping
          repair shops manage operations efficiently.
        </p>
      </section>

      {/* --- Ticket Lifecycle --- */}
      <section className="py-10">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Ticket Lifecycle
        </h2>
        <div className="flex justify-center">
          <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-lg w-[80%] h-[80vh]">
            {ticketData ? (
              <ExcalidrawWrapper
                initialData={ticketData}
                viewModeEnabled={true}
                zenModeEnabled={true}
                gridModeEnabled={false}
              />
            ) : (
              <p className="text-gray-400 text-center mt-4">
                Loading ticket lifecycle diagram...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* --- Customer Lifecycle --- */}
      <section className="py-10">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Customer Lifecycle
        </h2>
        <div className="flex justify-center">
          <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-lg w-[80%] h-[80vh]">
            {customerData ? (
              <ExcalidrawWrapper
                initialData={customerData}
                viewModeEnabled={true}
                zenModeEnabled={true}
                gridModeEnabled={false}
              />
            ) : (
              <p className="text-gray-400 text-center mt-4">
                Loading customer lifecycle diagram...
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
