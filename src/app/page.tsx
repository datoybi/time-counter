import List from "@/components/list";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-screen">
      <section className="w-3/5 bg-neutral-100 rounded-lg p-10">
        <List />
      </section>
    </main>
  );
}
