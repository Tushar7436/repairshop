import Navbar from "@/components/Navbar"
export default function Home() {
  return (
    <>
    <div className="bg-black bg-home-img bg-cover bg-center">
      <Navbar/>
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">

        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">Tushar&apos;s Computer<br />Repair Shop</h1>
        </div>

        </main>

      </div>
    </>
  );
}
