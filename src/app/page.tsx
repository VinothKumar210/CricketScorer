import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative bg-gray-900">
        <div className="relative h-80 overflow-hidden bg-gray-900 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img
            className="h-full w-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Cricket match in progress"
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">Cricket Scoring Made Easy</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Track Every Ball, Wicket, and Run</p>
            <p className="mt-6 text-base leading-7 text-gray-300">
              The most comprehensive cricket scoring application for clubs and enthusiasts. Record matches, track player statistics, and analyze performance with our intuitive interface.
            </p>
            <div className="mt-8">
              <Link
                href="/matches/new"
                className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start New Match
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
