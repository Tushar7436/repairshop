export default function TechStack() {
  const stack = ["Next.js", "React", "TailwindCSS", "Firebase Auth", "Node.js", "MySQL"];
  
  return (
    <section className="tech-stack py-12 bg-white text-black text-center">
      <h2 className="tech-stack__title text-3xl font-semibold mb-6">Technologies Used</h2>
      <div className="tech-stack__list flex justify-center flex-wrap gap-6">
        {stack.map((tech, index) => (
          <span key={index} className="tech-stack__item px-4 py-2 border border-black rounded-xl font-medium hover:bg-black hover:text-white transition">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
