import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer" data-aos="fade-up">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Image 
                src="/asset/mainai4bharatlogo.png" 
                alt="AI4Bharat Logo" 
                width={400} 
                height={100} 
                style={{ objectFit: 'contain', width: '200px', height: '60px', transform: 'scale(2.4)', transformOrigin: 'center', mixBlendMode: 'screen', marginLeft: '-70px' }}
              />
            </Link>
            <p className="footer-tagline">Autonomous engineering intelligence for the modern enterprise.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>Platform</h5>
              <Link href="#capabilities">Capabilities</Link>
              <Link href="#pricing">Enterprise</Link>
              <Link href="#">Integrations</Link>
              <Link href="#">Security</Link>
              <Link href="/signin">Sign in</Link>
              <Link href="/signup">Create Account</Link>
              <Link href="#">Changelog</Link>
            </div>
            <div className="footer-col">
              <h5>Resources</h5>
              <Link href="#">Documentation</Link>
              <Link href="#faq">FAQ</Link>
              <Link href="#">Research</Link>
              <Link href="#">API Reference</Link>
              <Link href="#">SDK</Link>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <Link href="mailto:enterprise@ai4bharat.ai">enterprise@ai4bharat.ai</Link>
              <Link href="#about">About</Link>
              <Link href="#">Careers</Link>
              <Link href="#">Press</Link>
              <Link href="#">Contact</Link>
            </div>
            <div className="footer-col">
              <h5>Enterprise</h5>
              <Link href="#pricing">Enterprise Platform</Link>
              <Link href="#">Security &amp; Compliance</Link>
              <Link href="#">ROI Assessment</Link>
              <Link href="#">Vendor Profile</Link>
              <Link href="/briefing">Request Briefing</Link>
            </div>
            <div className="footer-col">
              <h5>Legal</h5>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Data Processing</Link>
              <Link href="#">Status</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 AI4Bharat. All rights reserved.</p>
          <nav className="footer-legal">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Security</Link>
            <Link href="#">Status</Link>
            <Link href="#">Legal</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
