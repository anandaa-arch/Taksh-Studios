'use client';

const dummyOrders = [
  { id: 'ORD-1042', customer: 'Ayush Sharma', product: 'Geometric Planter', date: '2024-04-10', status: 'Processing', amount: '₹1,200', type: '3D Printing' },
  { id: 'ORD-1041', customer: 'Riya Gupta', product: 'Traditional Elephant', date: '2024-04-09', status: 'Shipped', amount: '₹3,200', type: 'Wood Carving' },
  { id: 'ORD-1040', customer: 'Vikram Singh', product: 'Custom Nameplate', date: '2024-04-08', status: 'Delivered', amount: '₹2,800', type: 'Wood Carving' },
  { id: 'ORD-1039', customer: 'Sneha Patel', product: 'Fantasy Miniatures', date: '2024-04-07', status: 'Pending Review', amount: '₹800', type: 'Custom 3D' },
];

export default function OrdersPage() {
  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display font-bold uppercase tracking-tight text-4xl text-text-primary mb-2">Orders</h1>
          <p className="font-sans text-sm text-text-secondary">Manage and track customer orders here.</p>
        </div>
        <button className="bg-text-primary text-bg font-sans text-sm px-6 py-2 rounded-[3px] hover:brightness-110 transition-colors">
          Export CSV
        </button>
      </div>

      <div className="bg-surface border border-border rounded-[3px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-[14px]">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Order ID</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Customer</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Product</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Date</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Status</th>
                <th className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {dummyOrders.map((order) => (
                <tr key={order.id} className="hover:bg-bg/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-text-primary">{order.id}</td>
                  <td className="px-6 py-4 text-text-secondary">{order.customer}</td>
                  <td className="px-6 py-4 text-text-secondary">
                    <div>{order.product}</div>
                    <div className="text-[12px] text-text-muted">{order.type}</div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-[13px]">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-[3px] text-[12px] ${
                      order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                      order.status === 'Processing' ? 'bg-text-primary text-bg/10 text-text-primary' :
                      'bg-text-muted/20 text-text-secondary'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-text-primary text-right">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
