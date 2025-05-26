
import { Restaurant } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <Restaurant className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">RestaurantPro</h1>
            <p className="text-orange-100 text-sm">Menu & Order Management System</p>
          </div>
        </div>
      </div>
    </header>
  );
};
