
import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  available: boolean;
  ingredients: string[];
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations: string[];
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: any) => void;
  menuItems: MenuItem[];
}

export const OrderModal = ({ isOpen, onClose, onSave, menuItems }: OrderModalProps) => {
  const [customerName, setCustomerName] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setCustomerName('');
      setOrderItems([]);
      setNotes('');
    }
  }, [isOpen]);

  const addItem = (menuItem: MenuItem) => {
    const existingItem = orderItems.find(item => item.id === menuItem.id);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        id: menuItem.id,
        name: menuItem.name,
        quantity: 1,
        price: menuItem.price,
        customizations: []
      }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems(orderItems.filter(item => item.id !== id));
    } else {
      setOrderItems(orderItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || orderItems.length === 0) return;

    const newOrder = {
      customerName,
      items: orderItems,
      status: 'placed' as const,
      timestamp: new Date(),
      total: getTotalAmount(),
      notes
    };

    onSave(newOrder);
    onClose();
  };

  if (!isOpen) return null;

  const availableMenuItems = menuItems.filter(item => item.available);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Create New Order</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name</label>
                <Input
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Special Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions..."
                  rows={3}
                />
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                {orderItems.length === 0 ? (
                  <p className="text-gray-500 text-sm">No items added yet</p>
                ) : (
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total: ${getTotalAmount().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Menu Items */}
            <div>
              <h3 className="font-medium mb-2">Available Menu Items</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableMenuItems.map((item) => (
                  <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-sm text-gray-500">Category: {item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">${item.price}</p>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => addItem(item)}
                            className="mt-1 bg-orange-500 hover:bg-orange-600"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-6 border-t mt-6">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              disabled={!customerName || orderItems.length === 0}
            >
              Create Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
