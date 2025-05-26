
import { BarChart3, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Analytics = () => {
  const stats = [
    {
      title: 'Daily Revenue',
      value: '$1,247.50',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Orders Today',
      value: '47',
      change: '+8.2%',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Avg. Prep Time',
      value: '18 min',
      change: '-2.1%',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Customer Rating',
      value: '4.8',
      change: '+0.3',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const topItems = [
    { name: 'Margherita Pizza', orders: 23, revenue: '$299.77' },
    { name: 'Caesar Salad', orders: 18, revenue: '$179.82' },
    { name: 'Vegan Buddha Bowl', orders: 15, revenue: '$179.85' },
    { name: 'Garlic Bread', orders: 12, revenue: '$59.88' },
    { name: 'Chicken Wings', orders: 9, revenue: '$134.91' }
  ];

  const peakHours = [
    { time: '12:00 PM', orders: 15 },
    { time: '1:00 PM', orders: 22 },
    { time: '2:00 PM', orders: 18 },
    { time: '6:00 PM', orders: 25 },
    { time: '7:00 PM', orders: 20 },
    { time: '8:00 PM', orders: 16 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{item.revenue}</div>
                    <div className="text-sm text-gray-500">{item.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {peakHours.map((hour) => (
                <div key={hour.time} className="flex items-center justify-between">
                  <span className="font-medium">{hour.time}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${(hour.orders / 25) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{hour.orders}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg">Pizzas</h3>
              <p className="text-3xl font-bold text-orange-600">45%</p>
              <p className="text-sm text-gray-500">of total sales</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Salads</h3>
              <p className="text-3xl font-bold text-green-600">28%</p>
              <p className="text-sm text-gray-500">of total sales</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Bowls</h3>
              <p className="text-3xl font-bold text-blue-600">27%</p>
              <p className="text-sm text-gray-500">of total sales</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
