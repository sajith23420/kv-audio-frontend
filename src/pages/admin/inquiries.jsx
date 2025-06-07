import { useEffect, useState } from "react";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInquiries() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/inquiries", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch inquiries");
        const data = await res.json();
        setInquiries(data);
      } catch (err) {
        setError("Could not load inquiries.");
      } finally {
        setLoading(false);
      }
    }
    fetchInquiries();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Customer Inquiries</h1>
        {loading && <div className="text-gray-600">Loading inquiries...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Address</th>
                  <th className="py-3 px-6 text-left">Message</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Resolved</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">No inquiries found.</td>
                  </tr>
                )}
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{inq.id}</td>
                    <td className="py-3 px-6 text-left">{inq.name}</td>
                    <td className="py-3 px-6 text-left">{inq.email}</td>
                    <td className="py-3 px-6 text-left">{inq.address}</td>
                    <td className="py-3 px-6 text-left max-w-xs break-words">{inq.message}</td>
                    <td className="py-3 px-6 text-left">{new Date(inq.date).toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">
                      {inq.isResolved ? (
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Yes</span>
                      ) : (
                        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">No</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {!inq.isResolved && (
                        <button
                          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-3 rounded text-xs"
                          // onClick={() => handleResolve(inq.id)} // Placeholder for resolve action
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
