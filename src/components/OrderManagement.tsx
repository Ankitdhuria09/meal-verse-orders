
import { useState } from 'react';
import { Search, Plus, Clock, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations: string[];
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  status: 'placed' | 'preparing' | 'ready' | 'delivered';
  timestamp: Date;
  total: number;
  notes: string;
}

export const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      items: [
        { id: '1', name: 'Margherita Pizza', quantity: 2, price: 12.99, customizations: ['extra cheese'] },
        { id: '2', name: 'Caesar Salad', quantity: 1, price: 9.99, customizations: [] }
      ],
      status: 'preparing',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      total: 35.97,
      notes: 'Please make pizza extra crispy'
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      items: [
        { id: '3', name: 'Vegan Buddha Bowl', quantity: 1, price: 11.99, customizations: ['no tahini'] }
      ],
      status: 'ready',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      total: 11.99,
      notes: ''
    },
    {
      id: 'ORD-003',
      customerName: 'Bob Johnson',
      items: [
        { id: '1', name: 'Margherita Pizza', quantity: 1, price: 12.99, customizations: [] },
        { id: '4', name: 'Garlic Bread', quantity: 2, price: 4.99, customizations: [] }
      ],
      status: 'delivered',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      total: 22.97,
      notes: ''
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'placed':
        return <Clock className="h-4 w-4" />;
      case 'preparing':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'delivered':
        return <Truck className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-gray-100 text-gray-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(minutes / 60);
      return `${hours}h ${minutes % 60}m ago`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="placed">Placed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
        </select>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <p className="text-gray-600">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1">{formatTime(order.timestamp)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-medium">{item.quantity}x {item.name}</span>
                      {item.customizations.length > 0 && (
                        <div className="text-gray-500 text-xs">
                          + {item.customizations.join(', ')}
                        </div>
                      )}
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {order.notes && (
                <div className="bg-yellow-50 p-2 rounded mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Notes:</strong> {order.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-lg font-bold">Total: ${order.total.toFixed(2)}</span>
                <div className="space-x-2">
                  {order.status === 'placed' && (
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Start Preparing
                    </Button>
                  )}
                  {order.status === 'preparing' && (
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      Mark Ready
                    </Button>
                  )}
                  {order.status === 'ready' && (
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Mark Delivered
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
