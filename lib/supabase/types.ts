/** Database types for Supabase tables */

export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: '3d-printing' | 'wood-carving';
  description: string;
  images: string[];
  materials: string[];
  finishes: string[];
  popular: boolean;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbCustomOrder {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  product_type: '3d-printing' | 'wood-carving';
  description: string;
  material: string | null;
  quantity: number;
  deadline: string | null;
  budget: string | null;
  reference_file_url: string | null;
  reference_file_name: string | null;
  status: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'in_production' | 'completed' | 'cancelled';
  quoted_price: number | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbOrder {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  status: 'pending_payment' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  tracking_id: string | null;
  tracking_url: string | null;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
}

export interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_slug: string;
  material: string | null;
  finish: string | null;
  quantity: number;
  unit_price: number;
}
