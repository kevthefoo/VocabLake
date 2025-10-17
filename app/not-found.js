import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-2xl">
          <span className="text-4xl">🔎</span>
        </div>

        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          404 – Page Not Found
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved, or the link is incorrect.
        </p>

        <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-3">
          <Button asChild className="cursor-pointer">
            <Link href="/">Go to Home</Link>
          </Button>
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please try again later or contact
          support.
        </p>
      </div>
    </section>
  );
}
