
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

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

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: MenuItem | Omit<MenuItem, 'id'>) => void;
  item: MenuItem | null;
}

export const MenuItemModal = ({ isOpen, onClose, onSave, item }: MenuItemModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    tags: '',
    available: true,
    ingredients: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description,
        tags: item.tags.join(', '),
        available: item.available,
        ingredients: item.ingredients.join(', ')
      });
    } else {
      setFormData({
        name: '',
        category: '',
        price: 0,
        description: '',
        tags: '',
        available: true,
        ingredients: ''
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = {
      name: formData.name,
      category: formData.category,
      price: formData.price,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      available: formData.available,
      ingredients: formData.ingredients.split(',').map(ing => ing.trim()).filter(ing => ing)
    };

    if (item) {
      onSave({ ...itemData, id: item.id });
    } else {
      onSave(itemData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">
            {item ? 'Edit Menu Item' : 'Add Menu Item'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Input
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <Input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <Input
              placeholder="vegetarian, spicy, popular"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ingredients (comma-separated)</label>
            <Textarea
              placeholder="tomato, cheese, basil"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.available}
              onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
            />
            <label className="text-sm font-medium">Available</label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
              {item ? 'Update' : 'Add'} Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
