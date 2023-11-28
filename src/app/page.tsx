import { ModeToggle } from "@/components/dark-mode";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen">
        <div className="absolute top-10">
          <ModeToggle />
        </div>
        Welcome to mangadex
      </main>
    </>
  );
}
