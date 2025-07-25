import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Users, 
  Store, 
  Music, 
  MapPin, 
  Plus, 
  Edit,
  Trash2,
  Settings,
  BarChart
} from "lucide-react";

interface OrganizerBackendProps {
  onLogout: () => void;
}

const OrganizerBackend = ({ onLogout }: OrganizerBackendProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'djs' | 'locations' | 'analytics'>('overview');
  
  const [vendors] = useState([
    { id: 1, name: "Festival Food Co.", code: "VND001", status: "active", revenue: "$2,450" },
    { id: 2, name: "Craft Beer Corner", code: "VND002", status: "active", revenue: "$1,890" },
    { id: 3, name: "Merch Central", code: "VND003", status: "pending", revenue: "$0" },
  ]);

  const [djs] = useState([
    { id: 1, name: "DJ Pulse", code: "DJ001", status: "active", votes: 247 },
    { id: 2, name: "Beat Master", code: "DJ002", status: "active", votes: 189 },
    { id: 3, name: "Echo Wave", code: "DJ003", status: "offline", votes: 156 },
  ]);

  const [locations] = useState([
    { id: 1, name: "Main Stage", type: "Stage", capacity: 5000 },
    { id: 2, name: "Food Court", type: "Vendor Area", capacity: 200 },
    { id: 3, name: "VIP Lounge", type: "Special Area", capacity: 100 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--chrome-gradient)' }}>
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Organizer Dashboard</h1>
              <p className="text-white/80 text-sm">Festival Management Console</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="ghost" className="text-white hover:bg-white/20">
            Logout
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="flex space-x-1 p-2 overflow-x-auto">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart },
            { key: 'vendors', label: 'Vendors', icon: Store },
            { key: 'djs', label: 'DJs & Artists', icon: Music },
            { key: 'locations', label: 'Locations', icon: MapPin },
            { key: 'analytics', label: 'Analytics', icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as any)}
              variant={activeTab === key ? "secondary" : "ghost"}
              className={`text-white whitespace-nowrap ${
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Festival Overview</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Active Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">12</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">DJs Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">5</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">$45,670</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-white/20 text-white hover:bg-white/30">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Vendor
                  </Button>
                  <Button className="w-full bg-white/20 text-white hover:bg-white/30">
                    <Plus className="w-4 h-4 mr-2" />
                    Register DJ/Artist
                  </Button>
                  <Button className="w-full bg-white/20 text-white hover:bg-white/30">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Location
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white/80 text-sm">
                    <p>• New vendor "Taco Truck" registered</p>
                    <p>• DJ Pulse went live on Main Stage</p>
                    <p>• 47 new orders in Food Court</p>
                    <p>• VIP Lounge capacity updated</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Vendor Management</h2>
              <Button className="bg-white/20 text-white hover:bg-white/30">
                <Plus className="w-4 h-4 mr-2" />
                Add Vendor
              </Button>
            </div>
            
            <div className="grid gap-4">
              {vendors.map((vendor) => (
                <Card key={vendor.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-semibold">{vendor.name}</h3>
                          <Badge className={`${getStatusColor(vendor.status)} text-white`}>
                            {vendor.status}
                          </Badge>
                        </div>
                        <p className="text-white/80">Code: {vendor.code}</p>
                        <p className="text-white font-semibold">Revenue: {vendor.revenue}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* DJs Tab */}
        {activeTab === 'djs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">DJ & Artist Management</h2>
              <Button className="bg-white/20 text-white hover:bg-white/30">
                <Plus className="w-4 h-4 mr-2" />
                Register Artist
              </Button>
            </div>
            
            <div className="grid gap-4">
              {djs.map((dj) => (
                <Card key={dj.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-semibold">{dj.name}</h3>
                          <Badge className={`${getStatusColor(dj.status)} text-white`}>
                            {dj.status}
                          </Badge>
                        </div>
                        <p className="text-white/80">Code: {dj.code}</p>
                        <p className="text-white font-semibold">Total Votes: {dj.votes}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Locations Tab */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Location Management</h2>
              <Button className="bg-white/20 text-white hover:bg-white/30">
                <Plus className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </div>
            
            <div className="grid gap-4">
              {locations.map((location) => (
                <Card key={location.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{location.name}</h3>
                        <p className="text-white/80">Type: {location.type}</p>
                        <p className="text-white font-semibold">Capacity: {location.capacity}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Festival Analytics</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <div className="flex justify-between">
                      <span>Food & Beverage</span>
                      <span>$28,340</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Merchandise</span>
                      <span>$12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VIP Services</span>
                      <span>$4,880</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <div className="flex justify-between">
                      <span>1. Festival Food Co.</span>
                      <span>$2,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2. Craft Beer Corner</span>
                      <span>$1,890</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3. Sweet Treats</span>
                      <span>$1,234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerBackend;