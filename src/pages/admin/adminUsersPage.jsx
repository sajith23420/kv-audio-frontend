import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            fetchUsers();
        }
    }, [loading]);

    function handleBlockUser(email) {
        const token = localStorage.getItem("token");

        axios
            .put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                setLoading(true); // Reload user list after status change
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="p-0 bg-gray-50 min-h-screen flex flex-col">
            <div className="bg-white/60 backdrop-blur-md px-8 py-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-700 tracking-wide">User Management</h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-start w-full p-8">
                <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-6 py-3 font-semibold text-xs text-gray-500">Profile</th>
                                <th className="text-left px-6 py-3 font-semibold text-xs text-gray-500">Name</th>
                                <th className="text-left px-6 py-3 font-semibold text-xs text-gray-500">Email</th>
                                <th className="text-left px-6 py-3 font-semibold text-xs text-gray-500">Role</th>
                                <th className="text-left px-6 py-3 font-semibold text-xs text-gray-500">Phone</th>
                                <th className="text-left px-6 py-3 font-semibold text-xs text-gray-500">Address</th>
                                <th className="text-left px-6 py-3 font-semibold text-xs text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8 text-gray-400 text-base">Loading users...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8 text-gray-400 text-base">No users found.</td>
                                </tr>
                            ) : (
                                users.map((user, idx) => (
                                    <tr
                                        key={user._id}
                                        className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-orange-50 transition-all`}
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={user.profilePicture}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-700">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-600">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.address}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleBlockUser(user.email)}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full transition duration-200 ${user.isBlocked
                                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                                                    }`}
                                            >
                                                {user.isBlocked ? "Blocked" : "Active"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
