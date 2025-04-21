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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

            {loading ? (
                <p className="text-gray-600">Loading users...</p>
            ) : (
                <div className="overflow-x-auto">
                    <div className="shadow-lg rounded-xl overflow-hidden">
                        <table className="min-w-full text-sm bg-white">
                            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                                <tr>
                                    <th className="text-left px-6 py-3 font-semibold">Profile</th>
                                    <th className="text-left px-6 py-3 font-semibold">Name</th>
                                    <th className="text-left px-6 py-3 font-semibold">Email</th>
                                    <th className="text-left px-6 py-3 font-semibold">Role</th>
                                    <th className="text-left px-6 py-3 font-semibold">Phone</th>
                                    <th className="text-left px-6 py-3 font-semibold">Address</th>
                                    <th className="text-left px-6 py-3 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr
                                        key={user._id}
                                        className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all`}
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={user.profilePicture}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full object-cover shadow-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-700">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.address}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleBlockUser(user.email)}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full transition duration-200 ${
                                                    user.isBlocked
                                                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                                                        : "bg-green-100 text-green-600 hover:bg-green-200"
                                                }`}
                                            >
                                                {user.isBlocked ? "Blocked" : "Active"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
