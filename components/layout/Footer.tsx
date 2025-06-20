export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-white text-sm px-6 py-10">
      {/* Top section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/10 pb-8">
        {/* Column 1 */}
        <div>
          <img src="/Logos/white-logo.png" alt="NetNXT" className="w-20 mb-4" />
          <p className="text-gray-400 mb-4">
            Trusted Security Partner for Digital Native Companies across the Globe
          </p>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/company/netnxt-network/" target="_blank" rel="noopener noreferrer" className="w-6 h-6">
              <img src="/Logos/linkedin.png" alt="LinkedIn" className="w-full h-full object-contain" />
              </a>
            <a href="https://www.facebook.com/netnxtnetwork" target="_blank" rel="noopener noreferrer" className="w-6 h-6">
              <img src="/Logos/facebook.png" alt="Facebook" className="w-full h-full object-contain" />
              </a>
          </div>
        </div>

        {/* Column 2: Our Services */}
        <div>
          <h3 className="text-base font-semibold mb-2">Our Services</h3>
          <ul className="text-gray-300 space-y-1">
            <li>Unified Device Management</li>
            <li>Compliance Automation</li>
            <li>Identity & Access Management</li>
            <li>Network Monitoring</li>
            <li>EndPoint Security</li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="text-base font-semibold mb-2">Quick Links</h3>
          <ul className="text-gray-300 space-y-1">
            <li><a href="/know-more" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="https://forms.gle/F2ZbFB9YA2wNrLqV8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div id="footer-contact">
          <h3 className="text-base font-semibold mb-2">Contact Us</h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-center">
              <span className="mr-2">📞</span>
              <a href="tel:+911234567890" className="no-underline hover:text-white transition-colors">
                +91 99800 27843
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✉️</span>
              <a href="mailto:info@netnxt.com" className="no-underline hover:text-white transition-colors">
                hello@netnxt.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs pt-6">
        <div className="mb-2 md:mb-0">© 2025 NetNXT. All rights reserved.</div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}