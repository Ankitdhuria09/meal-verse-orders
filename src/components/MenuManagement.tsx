
import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MenuItemModal } from './MenuItemModal';
import { useAuth } from '../contexts/AuthContext';

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

interface MenuManagementProps {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
}

export const MenuManagement = ({ menuItems, setMenuItems }: MenuManagementProps) => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setMenuItems([...menuItems, newItem]);
  };

  const handleEditItem = (item: MenuItem) => {
    setMenuItems(menuItems.map(i => i.id === item.id ? item : i));
  };

  const handleDeleteItem = (id: string) => {
    if (!isAdmin) return;
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const openEditModal = (item: MenuItem) => {
    if (!isAdmin) return;
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    if (!isAdmin) return;
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search menu items..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        {isAdmin ? (
          <Button onClick={openAddModal} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        ) : (
          <Button disabled className="bg-gray-300 cursor-not-allowed">
            <Lock className="h-4 w-4 mr-2" />
            Admin Only
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <strong>Category:</strong> {item.category}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdmin && (
        <MenuItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={editingItem ? handleEditItem : handleAddItem}
          item={editingItem}
        />
      )}
    </div>
  );
};
