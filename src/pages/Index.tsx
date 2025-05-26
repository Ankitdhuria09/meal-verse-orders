
import { useState } from 'react';
import { MenuManagement } from '../components/MenuManagement';
import { OrderManagement } from '../components/OrderManagement';
import { Analytics } from '../components/Analytics';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Login } from '../components/Login';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

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

const AppContent = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('menu');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Margherita Pizza',
      category: 'Pizzas',
      price: 12.99,
      description: 'Fresh mozzarella, tomato sauce, and basil',
      tags: ['vegetarian', 'popular'],
      available: true,
      ingredients: ['mozzarella', 'tomato sauce', 'basil', 'pizza dough']
    },
    {
      id: '2',
      name: 'Chicken Caesar Salad',
      category: 'Salads',
      price: 9.99,
      description: 'Grilled chicken, romaine lettuce, parmesan, croutons',
      tags: ['healthy', 'protein'],
      available: true,
      ingredients: ['chicken breast', 'romaine lettuce', 'parmesan', 'croutons', 'caesar dressing']
    },
    {
      id: '3',
      name: 'Vegan Buddha Bowl',
      category: 'Bowls',
      price: 11.99,
      description: 'Quinoa, roasted vegetables, tahini dressing',
      tags: ['vegan', 'healthy', 'gluten-free'],
      available: false,
      ingredients: ['quinoa', 'sweet potato', 'broccoli', 'chickpeas', 'tahini']
    }
  ]);

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuManagement menuItems={menuItems} setMenuItems={setMenuItems} />;
      case 'orders':
        return <OrderManagement menuItems={menuItems} />;
      case 'analytics':
        return <Analytics />;
      default:
        return <MenuManagement menuItems={menuItems} setMenuItems={setMenuItems} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
