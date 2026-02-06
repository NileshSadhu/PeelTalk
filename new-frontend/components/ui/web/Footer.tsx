export default function Footer() {
  return (
    <footer className="bg-[#653516] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-extrabold text-4xl tracking-tight text-outline">
            Peel<span className="text-[#FFF872]">Talk</span>
          </h3>
          <p className="text-sm text-white mt-3 max-w-xs">
            Stop scrolling and start typing.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-White mb-4">
            Navigation
          </p>
          <ul className="space-y-2 text-sm text-white">
            {["Home", "About", "Docs", "Pricing", "Contact"].map((item) => (
              <li
                key={item}
                className="hover:text-gray-300 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            Features
          </p>
          <ul className="space-y-2 text-sm text-white">
            {[
              "Jucie Match",
              "ChatPit",
              "Juice Run",
              "PeelNotes",
              "Support",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-gray-300 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            Quick Links
          </p>
          <ul className="space-y-2 text-sm text-white">
            {["Instagram", "Twitter", "Facebook", "YouTube"].map((item) => (
              <li
                key={item}
                className="hover:text-gray-300 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-white gap-2">
          <p>© {new Date().getFullYear()} PeelTalk. All rights reserved.</p>
          <p className="hover:text-white cursor-pointer transition">
            Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  );
}
