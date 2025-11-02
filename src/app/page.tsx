'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import '@excalidraw/excalidraw/index.css';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const ExcalidrawWrapper = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { ssr: false }
);

export default function Home() {
  const [ticketData, setTicketData] = useState<any>(null);
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    fetch('/flows/crm-flow.excalidraw')
      .then(res => res.json())
      .then(json => setTicketData(json))
      .catch(err => console.error('Error loading ticket diagram:', err));

    fetch('/flows/crm-flow.excalidraw')
      .then(res => res.json())
      .then(json => setCustomerData(json))
      .catch(err => console.error('Error loading customer diagram:', err));
  }, []);

  // Timeline user stories with answers and images (dummy images/solutions)
  const userStories = [
    {
      title: 'Replace sticky notes',
      answer: 'Move from paper chaos to digital order. CRM centralizes all info.',
      image: '/images/sticky-note.png',
      solution: 'All tickets and customers are tracked in one place.'
    },
    {
      title: 'Public contact page',
      answer: 'Customers can easily find and contact your shop online.',
      image: '/images/contact.png',
      solution: 'A simple, always-updated contact page.'
    },
    {
      title: 'Passwordless login',
      answer: 'Employees log in securely without remembering passwords.',
      image: '/images/login.png',
      solution: 'Magic links or codes sent to email.'
    },
    {
      title: 'Real-time open tickets',
      answer: 'See all open jobs instantly after login.',
      image: '/images/tickets.png',
      solution: 'Live dashboard for all staff.'
    },
    {
      title: 'Easy navigation & search',
      answer: 'Quickly find any customer or ticket.',
      image: '/images/search.png',
      solution: 'Powerful search and filters.'
    },
    // ...add more as needed
  ];

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden font-sans" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
      <Navbar />

      {/* HERO SPLIT SECTION */}
      <section className="flex flex-col md:flex-row justify-center items-stretch gap-10 py-20 bg-black max-w-7xl mx-auto">
        <motion.div className="flex-1 flex flex-col justify-center items-center text-center md:text-left px-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
            What is a CRM?
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            CRM (Customer Relationship Management) is a digital system that helps businesses manage customer data, track interactions, and streamline workflows.
          </p>
        </motion.div>
        <motion.div className="flex-1 flex flex-col justify-center items-center text-center md:text-left px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4">How does it work?</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            A CRM collects all your customer and ticket information in one place, making it easy to access, update, and analyze. It automates tasks, improves communication, and ensures nothing falls through the cracks.
          </p>
        </motion.div>
        <motion.div className="flex-1 flex flex-col justify-center items-center text-center md:text-left px-6"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Why is it important?</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            With a CRM, repair shops can deliver better service, reduce errors, and grow their business by keeping every customer and job organized and accessible.
          </p>
        </motion.div>
      </section>

      {/* USER STORIES TIMELINE SECTION */}
      <section className="bg-zinc-900 py-20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-16 tracking-tight" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>User Stories Timeline</h2>
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-10">
          {/* Timeline (left) */}
          <div className="md:w-1/4 flex flex-col items-center md:items-end">
            <div className="relative h-full w-1 bg-gray-700 rounded-full md:mr-4" style={{ minHeight: '500px' }}>
              {userStories.map((story, idx) => (
                <motion.div
                  key={idx}
                  className="absolute left-1/2 md:left-auto md:right-0 -translate-x-1/2 md:translate-x-0"
                  style={{ top: `${(idx * 100) / userStories.length}%` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="w-5 h-5 bg-white border-4 border-zinc-900 rounded-full shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Answers (right) */}
          <div className="md:w-3/4 flex flex-col gap-12">
            {userStories.map((story, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col md:flex-row items-center bg-zinc-800 rounded-2xl shadow-lg border border-gray-700 p-8 gap-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>{story.title}</h3>
                  <p className="text-gray-300 mb-2 text-lg">{story.answer}</p>
                  <p className="text-gray-400 text-sm italic">Solution: {story.solution}</p>
                </div>
                {story.image && (
                  <img src={story.image} alt={story.title} className="w-32 h-32 object-contain rounded-xl border border-gray-600 bg-black" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFECYCLE SECTION */}
      <section className="py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16 tracking-tight" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>Lifecycles</h2>
        {/* Ticket Lifecycle */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          {/* Left: Content */}
          <motion.div className="flex-1 bg-zinc-900 rounded-2xl p-8 shadow-lg border border-gray-700"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>Ticket Lifecycle</h3>
            <ul className="list-disc pl-6 text-gray-300 text-lg space-y-2">
              <li>Ticket Created</li>
              <li>Assigned to Employee</li>
              <li>Work in Progress</li>
              <li>Completed</li>
              <li>Closed</li>
            </ul>
            <p className="text-gray-400 mt-4 text-sm">Each ticket moves through these stages, tracked in real-time.</p>
          </motion.div>
          {/* Right: Excalidraw placeholder */}
          <motion.div className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-lg w-full h-[60vh] flex items-center justify-center bg-black">
              {/* Replace with <ExcalidrawWrapper ... /> for real diagram */}
              <span className="text-gray-500 text-lg">[Ticket Lifecycle Diagram Here]</span>
            </div>
          </motion.div>
        </div>
        {/* Customer Lifecycle */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left: Content */}
          <motion.div className="flex-1 bg-zinc-900 rounded-2xl p-8 shadow-lg border border-gray-700"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>Customer Lifecycle</h3>
            <ul className="list-disc pl-6 text-gray-300 text-lg space-y-2">
              <li>Customer Added</li>
              <li>Contacted</li>
              <li>Service Provided</li>
              <li>Follow-up</li>
              <li>Loyalty/Repeat</li>
            </ul>
            <p className="text-gray-400 mt-4 text-sm">Customers are managed from first contact to loyal repeat business.</p>
          </motion.div>
          {/* Right: Excalidraw placeholder */}
          <motion.div className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-lg w-full h-[60vh] flex items-center justify-center bg-black">
              {/* Replace with <ExcalidrawWrapper ... /> for real diagram */}
              <span className="text-gray-500 text-lg">[Customer Lifecycle Diagram Here]</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


