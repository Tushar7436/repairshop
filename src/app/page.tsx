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
  const [selectedStory, setSelectedStory] = useState(0); // Track selected story index

  const userStories = [
    {
      title: 'Replace sticky notes',
      answer: 'Move from paper chaos to digital order. CRM centralizes all info.',
      image: '/images/sticky-note.png',
      solution: 'All tickets and customers are tracked in one place.',
      details: 'The current sticky note system is prone to loss, difficult to search, and impossible to back up. A digital CRM system ensures all information is securely stored, easily searchable, and always accessible.'
    },
    {
      title: 'Public contact page',
      answer: 'Customers can easily find and contact your shop online.',
      image: '/images/contact.png',
      solution: 'A simple, always-updated contact page.',
      details: 'Enable customers to reach you 24/7 through a professional online presence. They can submit inquiries, check business hours, and find directions - all without picking up the phone.'
    },
    {
      title: 'Passwordless login',
      answer: 'Employees log in securely without remembering passwords.',
      image: '/images/login.png',
      solution: 'Magic links or codes sent to email.',
      details: 'Simplify access while maintaining security. Employees receive a secure link or code via email, eliminating the need to remember complex passwords while ensuring only authorized personnel can access the system.'
    },
    {
      title: 'Real-time open tickets',
      answer: 'See all open jobs instantly after login.',
      image: '/images/tickets.png',
      solution: 'Live dashboard for all staff.',
      details: 'Immediate visibility into all ongoing work. Staff can see new tickets as they arrive, track progress in real-time, and ensure nothing falls through the cracks.'
    },
    {
      title: 'Easy navigation & search',
      answer: 'Quickly find any customer or ticket.',
      image: '/images/search.png',
      solution: 'Powerful search and filters.',
      details: 'Advanced search capabilities allow staff to instantly locate customer records, tickets, and history. Filter by date, status, employee, or any other relevant criteria.'
    },
    // ...add more as needed
  ];

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden font-sans" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
      <Navbar />

      {/* HERO SECTION */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 px-6">
          {/* Left side: Heading and Content */}
          <motion.div 
            className="lg:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold mb-8 tracking-tight leading-tight" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
              Streamline Your Repair Shop with Modern CRM
            </h1>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-800 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2">What is CRM?</h3>
                <p className="text-gray-300">CRM (Customer Relationship Management) is your digital command center for managing customer data, tracking repairs, and streamlining workflows.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-zinc-800 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2">How it Works</h3>
                <p className="text-gray-300">Centralize all customer and repair information in one place. Access, update, and analyze data effortlessly. Automate tasks and improve team communication.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side: Excalidraw and Solution */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-black rounded-2xl overflow-hidden border border-gray-700 shadow-lg h-[400px] mb-6">
              <ExcalidrawWrapper
                initialData={{
                  elements: [],
                  appState: {
                    viewBackgroundColor: '#000000',
                    theme: 'dark'
                  }
                }}
                viewModeEnabled={true}
                zenModeEnabled={true}
                gridModeEnabled={false}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-zinc-800 p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-2">Why It Matters</h3>
              <p className="text-gray-300">Deliver exceptional service, eliminate errors, and grow your business by keeping everything organized and accessible. Your team and customers will thank you.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* USER STORIES TIMELINE SECTION */}
      <section className="bg-zinc-900 py-20 px-4">
        <h2 className="flex flex-col md:flex-row max-w-7xl mx-auto gap-10 text-3xl font-semibold mb-8 tracking-tight" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>User Stories Timeline</h2>
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-10">
          {/* Timeline with boxes (left) */}
          <div className="md:w-1/3 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-700 -z-10"></div>
            {Array.from({ length: 7 }).map((_, idx) => (
              <motion.div
                key={idx}
                className="relative flex items-center mb-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                {/* Connector Arrow */}
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-4 h-1 bg-gray-700"></div>
                
                {/* Story Box */}
                <div className="w-full pr-6">
                  <motion.button
                    onClick={() => setSelectedStory(idx)}
                    className={`w-full text-left bg-zinc-800 border ${selectedStory === idx ? 'border-white' : 'border-gray-700'} 
                    rounded-lg p-3 shadow-lg hover:bg-zinc-700 transition-all cursor-pointer transform hover:scale-105`}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">#{idx + 1}</span>
                      {selectedStory === idx && (
                        <motion.span
                          className="text-xs text-green-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Active
                        </motion.span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium mt-1 truncate" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      {userStories[idx]?.title || 'Future Story'}
                    </h3>
                  </motion.button>
                </div>
                
                {/* Timeline Node */}
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 
                  ${selectedStory === idx ? 'bg-white' : 'bg-gray-600'} 
                  border-2 border-zinc-900 rounded-full shadow-lg transition-colors`}
                ></div>
              </motion.div>
            ))}
          </div>

          {/* Dynamic Solutions Panel (right) */}
          <motion.div 
            className="md:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="bg-zinc-800 rounded-2xl border border-gray-700 p-8 shadow-lg h-full"
              layout
              key={selectedStory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {userStories[selectedStory] ? (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-sm text-gray-400 mb-2 block">Story #{selectedStory + 1}</span>
                    <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      {userStories[selectedStory].title}
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-gray-300">Overview</h4>
                        <p className="text-gray-400">{userStories[selectedStory].answer}</p>
                      </div>
                      
                      <div className="bg-zinc-900 rounded-xl p-6 border border-gray-700">
                        <h4 className="text-lg font-medium mb-2 text-gray-300">Solution</h4>
                        <p className="text-gray-400">{userStories[selectedStory].solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-gray-300">Details</h4>
                        <p className="text-gray-400">{userStories[selectedStory].details}</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-500 mb-2">Future Story #{selectedStory + 1}</h3>
                  <p className="text-gray-600">This story will be implemented in future updates...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* LIFECYCLE SECTION */}
      <section className="py-20 bg-zinc-900 max-w-9xl">
        <h2 className="flex flex-col md:flex-row max-w-7xl mx-auto gap-10 text-3xl font-semibold mb-16 tracking-tight max-w-7xl mx-auto px-4" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>Lifecycles</h2>
        {/* Ticket Lifecycle */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          {/* Left: Content */}
          <motion.div className="flex-1 bg-zinc-900 rounded-2xl p-8 shadow-lg border border-gray-700"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>Ticket Lifecycle</h3>
            <p className="text-gray-300 mb-4">Tickets represent the lifecycle of a repair job — from creation through assignment, work, completion and closure. This flow ensures accountability and traceability for each job.</p>
            <h4 className="text-lg font-semibold mb-3">Example: Settings</h4>
            <p className="text-gray-400 mb-4">In Settings you can configure ticket statuses, default assignment rules, notification preferences and SLA thresholds. These internal relations determine how tickets transition and who is notified at each step.</p>
            <ul className="list-disc pl-6 text-gray-300 text-lg space-y-2">
              <li>Ticket Created</li>
              <li>Assigned to Employee</li>
              <li>Work in Progress</li>
              <li>Completed</li>
              <li>Closed</li>
            </ul>
            <p className="text-gray-400 mt-4 text-sm">Each ticket moves through these stages, tracked in real-time. Use Settings to map statuses to automated actions and assignment rules.</p>
          </motion.div>
          {/* Right: Excalidraw placeholder */}
          <motion.div className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-lg w-full h-[60vh]">
              <ExcalidrawWrapper
                initialData={ticketData || {
                  elements: [],
                  appState: {
                    viewBackgroundColor: '#000000',
                    theme: 'dark'
                  }
                }}
                viewModeEnabled={true}
                zenModeEnabled={true}
                gridModeEnabled={false}
              />
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
            <p className="text-gray-300 mb-4">Customers flow from initial contact to service and follow-up — the CRM centralizes interactions, history, and preferences to improve retention and repeat visits.</p>
            <h4 className="text-lg font-semibold mb-3">Example: Settings</h4>
            <p className="text-gray-400 mb-4">Settings can define data retention, contact fields, and preferred contact channels. Internal relations include linking customers to tickets, employees, and service records.</p>
            <ul className="list-disc pl-6 text-gray-300 text-lg space-y-2">
              <li>Customer Added</li>
              <li>Contacted</li>
              <li>Service Provided</li>
              <li>Follow-up</li>
              <li>Loyalty/Repeat</li>
            </ul>
            <p className="text-gray-400 mt-4 text-sm">Customers are managed from first contact to loyal repeat business. Use Settings to control which fields are required and how customer records link to tickets.</p>
          </motion.div>
          {/* Right: Excalidraw placeholder */}
          <motion.div className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-lg w-full h-[60vh]">
              <ExcalidrawWrapper
                initialData={customerData || {
                  elements: [],
                  appState: {
                    viewBackgroundColor: '#000000',
                    theme: 'dark'
                  }
                }}
                viewModeEnabled={true}
                zenModeEnabled={true}
                gridModeEnabled={false}
              />
            </div>
          </motion.div>
        </div>

        {/* Live Example Section */}
        <div className="max-w-7xl mx-auto mt-24 px-4">
          <motion.div
            className="bg-zinc-800 rounded-2xl border border-gray-700 p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>Live Example</h3>
            <p className="text-gray-300 mb-4">
              Experience how tickets and customer records flow through their lifecycles in real-time. Our system tracks every interaction, update, and status change to maintain a complete history.
            </p>
            <p className="text-gray-400">
              Teams can visualize their workflow, identify bottlenecks, and optimize their processes using these interactive lifecycle views.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


