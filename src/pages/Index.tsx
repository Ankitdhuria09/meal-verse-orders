
import { useState } from 'react';
import { MenuManagement } from '../components/MenuManagement';
import { OrderManagement } from '../components/OrderManagement';
import { Analytics } from '../components/Analytics';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('menu');

  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return <MenuManagement />;
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

export default Index;
