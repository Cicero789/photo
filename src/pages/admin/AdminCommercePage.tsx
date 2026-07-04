import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/api";
import { cn } from "../../lib/utils";

const ADMIN_NAV = [
  { to: "/citysite", label: "Dashboard" },
  { to: "/citysite/people", label: "People" },
  { to: "/citysite/content", label: "Content" },
  { to: "/citysite/commerce", label: "Commerce" },
  { to: "/citysite/discovery", label: "Discovery" },
  { to: "/citysite/system", label: "System" },
];

function AdminNav() {
  const location = useLocation();
  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl gap-0 overflow-x-auto px-4 sm:px-6">
        {ADMIN_NAV.map((item) => {
          const active =
            item.to === "/citysite"
              ? location.pathname === "/citysite"
              : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface Order {
  id: string;
  buyerName: string;
  photographerName: string;
  product: string;
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  createdAt: string;
}

interface OrdersResponse {
  orders: Order[];
  summary: {
    totalRevenue: number;
    platformFees: number;
    pendingOrders: number;
    verifiedSubscribers: number;
  };
}

export function AdminCommercePage() {
  const { user } = useAuth();
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ orders: any[] }>("/admin/orders");
      const mapped: Order[] = (res.orders || []).map((o: any) => ({
        id: o.id,
        buyerName: o.buyer_name || "",
        photographerName: o.photographer_name || "",
        product: o.product || "Photo package",
        amount: o.amount_cents || 0,
        status: o.status || "pending",
        createdAt: o.created_at || "",
      }));
      const totalRevenue = mapped.reduce((sum, o) => sum + o.amount, 0);
      const summary = {
        totalRevenue,
        platformFees: Math.round(totalRevenue * 0.05),
        pendingOrders: mapped.filter(o => o.status === "pending").length,
        verifiedSubscribers: 0,
      };
      setData({ orders: mapped, summary });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (user?.role !== "platform_owner") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">Access denied</p>
      </div>
    );
  }

  const statusColor = (status: Order["status"]) => {
    switch (status) {
      case "paid":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "refunded":
        return "bg-neutral-100 text-neutral-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-neutral-900">
          Commerce
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Orders, revenue, and subscription overview
        </p>

        {loading && (
          <div className="mt-12 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Summary Cards */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-neutral-200 bg-white px-4 py-5">
                <p className="text-sm font-medium text-neutral-500">
                  Total Revenue
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-neutral-900">
                  ${(data.summary.totalRevenue / 100).toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white px-4 py-5">
                <p className="text-sm font-medium text-neutral-500">
                  Platform Fees (5%)
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-neutral-900">
                  ${(data.summary.platformFees / 100).toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white px-4 py-5">
                <p className="text-sm font-medium text-neutral-500">
                  Pending Orders
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-amber-600">
                  {data.summary.pendingOrders}
                </p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white px-4 py-5">
                <p className="text-sm font-medium text-neutral-500">
                  Verified Subscribers
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-neutral-900">
                  {data.summary.verifiedSubscribers}
                </p>
              </div>
            </div>

            {/* Orders Table */}
            <div className="mt-8 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-4 py-3 font-medium text-neutral-600">
                      Order ID
                    </th>
                    <th className="px-4 py-3 font-medium text-neutral-600">Buyer</th>
                    <th className="px-4 py-3 font-medium text-neutral-600">
                      Photographer
                    </th>
                    <th className="px-4 py-3 font-medium text-neutral-600">Product</th>
                    <th className="px-4 py-3 font-medium text-neutral-600">Amount</th>
                    <th className="px-4 py-3 font-medium text-neutral-600">Status</th>
                    <th className="px-4 py-3 font-medium text-neutral-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                        {order.id.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-3 text-neutral-900">
                        {order.buyerName}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {order.photographerName}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">{order.product}</td>
                      <td className="px-4 py-3 font-medium text-neutral-900">
                        ${(order.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                            statusColor(order.status)
                          )}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-neutral-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {data.orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-neutral-400"
                      >
                        No orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
