const groupedStories = {
  "Authentication & Access": [
    "Add a passwordless employee login to the app",
    "Require users to login at least once per week",
    "Provide a logout option",
    "Provide a way to remove employee access asap if needed"
  ],
  "Ticket Management": [
    "Replace current sticky note system",
    "Show a real-time open tickets page after login",
    "Tickets have an ID, title, notes, created & updated dates",
    "Tickets are either OPEN or COMPLETED",
    "Tickets are assigned to specific employees"
  ],
  "Customer Management": [
    "Customers have an ID, full address, phone, email & notes",
    "Provide easy navigation & search for customers & tickets",
    "Add a public facing page with basic contact info"
  ],
  "Roles & Permissions": [
    "Users can have Employee, Manager, or Admin permissions",
    "Employees can only edit their assigned tickets",
    "Managers and Admins can view, edit, and delete all tickets",
    "All users can create, edit and view customers"
  ],
  "Usability & Support": [
    "Desktop mode is most important but the app should be usable on tablets",
    "Light / Dark mode option requested by employees",
    "Expects quick support if anything goes wrong with the app"
  ]
};

export default function UserStories() {
  return (
    <section className="user-stories bg-black text-white py-16">
      <h2 className="user-stories__title text-4xl font-bold text-center mb-12">User Stories & Solutions</h2>
      <div className="user-stories__grid grid md:grid-cols-2 gap-12 px-12">
        {Object.entries(groupedStories).map(([section, stories]) => (
          <div key={section} className="user-stories__group border border-gray-700 rounded-2xl p-6 hover:bg-gray-900 transition">
            <h3 className="user-stories__group-title text-2xl font-semibold mb-4">{section}</h3>
            <ul className="user-stories__list space-y-2">
              {stories.map((story, i) => (
                <li key={i} className="user-stories__item text-gray-300">
                  • {story}
                </li>
              ))}
            </ul>
            <p className="user-stories__solution mt-4 text-gray-400 italic">
              {/* Add your dedicated answer for this group here */}
              Example: This module ensures secure and easy access while maintaining strong access control policies.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
