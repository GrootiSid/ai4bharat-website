import Link from 'next/link';

export default function BlogPill() {
  return (
    <div className="blog-pill-wrapper">
      <Link href="#" className="blog-pill">
        <span className="pill-new">Research</span>
        <span>The $47B Hidden Cost of Reactive Engineering — 2026 State of On-Call Report</span>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  );
}
