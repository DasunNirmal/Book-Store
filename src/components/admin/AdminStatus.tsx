import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";
import {
    BookOpenIcon,
    UserGroupIcon,
    ShoppingCartIcon,
    CurrencyDollarIcon
} from "@heroicons/react/24/outline";

export const AdminStats = () => {
    const { books, users, orders } = useAdmin();

    const stats = [
        {
            name: 'Total Books',
            value: books.length,
            icon: BookOpenIcon,
            color: 'bg-rose-500',
            change: '+12%',
            changeType: 'positive'
        },
        {
            name: 'Total Users',
            value: users.length,
            icon: UserGroupIcon,
            color: 'bg-blue-500',
            change: '+8%',
            changeType: 'positive'
        },
        {
            name: 'Total Orders',
            value: orders.length,
            icon: ShoppingCartIcon,
            color: 'bg-green-500',
            change: '+23%',
            changeType: 'positive'
        },
        {
            name: 'Total Revenue',
            value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`,
            icon: CurrencyDollarIcon,
            color: 'bg-purple-500',
            change: '+18%',
            changeType: 'positive'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
                <p className="text-stone-600">Quick overview of your bookstore performance</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-stone-600">{stat.name}</p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                                <p className={`text-sm mt-1 ${
                                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {stat.change} from last month
                                </p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-full`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-sm font-medium text-slate-800">#{order.id.slice(-6)}</p>
                                    <p className="text-xs text-stone-600">{order.userName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-rose-500">${order.total}</p>
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                    }`}>
                    {order.status}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Low Stock Books */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Low Stock Alert</h3>
                    <div className="space-y-4">
                        {books.filter(book => book.stock < 10).slice(0, 5).map((book) => (
                            <div key={book.id} className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{book.title}</p>
                                    <p className="text-xs text-stone-600">by {book.author}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-rose-500">${book.price}</p>
                                    <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    {book.stock} left
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};