import { Link } from "@/lib/navigation"

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-content-center px-4">
      <h1 className="uppercase text-4xl md:text-7xl tracking-widest text-gray-500">404 | Not Found</h1>
      <div className="mt-24 md:mt-12 mx-auto">
        <Link href="/" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" prefetch={false}>
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
