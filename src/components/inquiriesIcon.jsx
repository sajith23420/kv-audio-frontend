import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function InquiriesIcon() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/inquiries", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        // Count unresolved inquiries
        const unresolved = data.filter(i => !i.isResolved).length;
        setCount(unresolved);
      } catch {}
    }
    fetchCount();
    const interval = setInterval(fetchCount, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <Link to="/admin/inquiries" className="relative">
      <FaEnvelope className="text-2xl text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">{count}</span>
      )}
    </Link>
  );
}
