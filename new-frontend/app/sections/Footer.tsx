export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-extrabold text-4xl tracking-tight">
            Peel<span className="text-yellow-400">Talk</span>
          </h3>
          <p className="text-sm text-gray-400 mt-3 max-w-xs">
            Stop scrolling and start typing.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
            Navigation
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            {["Home", "About", "Group", "Pricing", "Contact"].map((item) => (
              <li
                key={item}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
            Quick Links
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            {["LinkedIn", "Instagram", "Twitter", "Facebook", "YouTube"].map(
              (item) => (
                <li
                  key={item}
                  className="hover:text-white transition cursor-pointer"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-2">
          <p>© {new Date().getFullYear()} PeelTalk. All rights reserved.</p>
          <p className="hover:text-white cursor-pointer transition">
            Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  );
}
