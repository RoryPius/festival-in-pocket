import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  Package, 
  Clock, 
  DollarSign, 
  Plus, 
  Edit,
  Eye,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface VendorBackendProps {
  onLogout: () => void;
}

const VendorBackend = ({ onLogout }: VendorBackendProps) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'finances'>('inventory');
  const [menuItems] = useState([
    { id: 1, name: "Festival Burger", price: 12.99, stock: 50, category: "Food" },
    { id: 2, name: "Cold Brew Coffee", price: 4.50, stock: 100, category: "Beverages" },
    { id: 3, name: "Vintage T-Shirt", price: 25.00, stock: 25, category: "Merchandise" },
  ]);

  const [orders] = useState([
    { id: 1, items: "2x Festival Burger, 1x Cold Brew", total: 29.48, status: "preparing", waitTime: 15 },
    { id: 2, items: "1x Vintage T-Shirt", total: 25.00, status: "ready", waitTime: 0 },
    { id: 3, items: "3x Cold Brew Coffee", total: 13.50, status: "confirmed", waitTime: 5 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'confirmed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--chrome-gradient)' }}>
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Vendor Dashboard</h1>
              <p className="text-white/80 text-sm">Festival Food Co.</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="ghost" className="text-white hover:bg-white/20">
            Logout
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="flex space-x-1 p-2">
          {[
            { key: 'inventory', label: 'Inventory', icon: Package },
            { key: 'orders', label: 'Orders', icon: Clock },
            { key: 'finances', label: 'Finances', icon: DollarSign },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as any)}
              variant={activeTab === key ? "secondary" : "ghost"}
              className={`text-white ${
                activeTab === key 
                  ? 'bg-white/20 hover:bg-white/30' 
                  : 'hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Menu Items</h2>
              <Button className="bg-white/20 text-white hover:bg-white/30">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            <div className="grid gap-4">
              {menuItems.map((item) => (
                <Card key={item.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-white/80">${item.price}</p>
                        <Badge variant="secondary" className="mt-2">
                          Stock: {item.stock}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Active Orders</h2>
            
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-semibold">Order #{order.id}</h3>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-white/80 mb-2">{order.items}</p>
                        <p className="text-white font-semibold">${order.total}</p>
                        {order.waitTime > 0 && (
                          <div className="flex items-center mt-2 text-white/80">
                            <Clock className="w-4 h-4 mr-1" />
                            {order.waitTime} min wait
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {order.status === 'preparing' && (
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Confirm Served
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Finances Tab */}
        {activeTab === 'finances' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Financial Overview</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Today's Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">$247.50</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Available Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">$1,234.67</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">8</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/20 backdrop-blur-lg border-white/30">
              <CardHeader>
                <CardTitle className="text-white">Withdraw Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm">Amount to withdraw</label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Request Withdrawal
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorBackend;