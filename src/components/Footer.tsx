import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900">Cricket Scorer</h2>
            <p className="text-gray-500 text-base">
              The ultimate cricket scoring application for clubs and enthusiasts.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Navigation</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/" className="text-base text-gray-500 hover:text-gray-900">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/matches" className="text-base text-gray-500 hover:text-gray-900">
                      Matches
                    </Link>
                  </li>
                  <li>
                    <Link href="/teams" className="text-base text-gray-500 hover:text-gray-900">
                      Teams
                    </Link>
                  </li>
                  <li>
                    <Link href="/players" className="text-base text-gray-500 hover:text-gray-900">
                      Players
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/help" className="text-base text-gray-500 hover:text-gray-900">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {currentYear} Cricket Scorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
