import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
  const { toast } = useToast();
  
  const [vendors, setVendors] = useState<any[]>([]);
  const [djs, setDjs] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from database
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadVendors(), loadDjs(), loadLocations()]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({ title: "Error loading data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const loadVendors = async () => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading vendors:', error);
    } else {
      setVendors(data || []);
    }
  };

  const loadDjs = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'dj')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading DJs:', error);
    } else {
      setDjs(data || []);
    }
  };

  const loadLocations = async () => {
    const { data, error } = await supabase
      .from('event_locations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading locations:', error);
    } else {
      setLocations(data || []);
    }
  };

  // Form states
  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false);
  const [isDjDialogOpen, setIsDjDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form data
  const [vendorForm, setVendorForm] = useState({ name: "", code: "", status: "pending" });
  const [djForm, setDjForm] = useState({ name: "", code: "", status: "offline" });
  const [locationForm, setLocationForm] = useState({ name: "", type: "Stage", capacity: "" });

  // CRUD Operations
  const handleAddVendor = async () => {
    if (!vendorForm.name || !vendorForm.code) return;
    
    try {
      const { data, error } = await supabase
        .from('vendors')
        .insert([{
          name: vendorForm.name,
          code: vendorForm.code,
          status: vendorForm.status
        }])
        .select()
        .single();

      if (error) throw error;

      setVendors([data, ...vendors]);
      setVendorForm({ name: "", code: "", status: "pending" });
      setIsVendorDialogOpen(false);
      toast({ title: "Vendor added successfully!" });
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast({ title: "Error adding vendor", variant: "destructive" });
    }
  };

  const handleEditVendor = (vendor: any) => {
    setEditingItem(vendor);
    setVendorForm({ name: vendor.name, code: vendor.code, status: vendor.status });
    setIsVendorDialogOpen(true);
  };

  const handleUpdateVendor = async () => {
    if (!vendorForm.name || !vendorForm.code || !editingItem) return;
    
    try {
      const { error } = await supabase
        .from('vendors')
        .update({
          name: vendorForm.name,
          code: vendorForm.code,
          status: vendorForm.status
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      setVendors(vendors.map(v => v.id === editingItem.id ? 
        { ...v, name: vendorForm.name, code: vendorForm.code, status: vendorForm.status } : v
      ));
      setVendorForm({ name: "", code: "", status: "pending" });
      setEditingItem(null);
      setIsVendorDialogOpen(false);
      toast({ title: "Vendor updated successfully!" });
    } catch (error) {
      console.error('Error updating vendor:', error);
      toast({ title: "Error updating vendor", variant: "destructive" });
    }
  };

  const handleDeleteVendor = async (id: number) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVendors(vendors.filter(v => v.id !== id));
      toast({ title: "Vendor deleted successfully!" });
    } catch (error) {
      console.error('Error deleting vendor:', error);
      toast({ title: "Error deleting vendor", variant: "destructive" });
    }
  };

  const handleAddDj = async () => {
    if (!djForm.name || !djForm.code) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          display_name: djForm.name,
          access_code: djForm.code,
          role: 'dj',
          status: djForm.status
        }])
        .select()
        .single();

      if (error) throw error;

      setDjs([data, ...djs]);
      setDjForm({ name: "", code: "", status: "offline" });
      setIsDjDialogOpen(false);
      toast({ title: "DJ/Artist added successfully!" });
    } catch (error) {
      console.error('Error adding DJ:', error);
      toast({ title: "Error adding DJ/Artist", variant: "destructive" });
    }
  };

  const handleEditDj = (dj: any) => {
    setEditingItem(dj);
    setDjForm({ name: dj.display_name, code: dj.access_code, status: dj.status });
    setIsDjDialogOpen(true);
  };

  const handleUpdateDj = async () => {
    if (!djForm.name || !djForm.code || !editingItem) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: djForm.name,
          access_code: djForm.code,
          status: djForm.status
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      setDjs(djs.map(d => d.id === editingItem.id ? 
        { ...d, display_name: djForm.name, access_code: djForm.code, status: djForm.status } : d
      ));
      setDjForm({ name: "", code: "", status: "offline" });
      setEditingItem(null);
      setIsDjDialogOpen(false);
      toast({ title: "DJ/Artist updated successfully!" });
    } catch (error) {
      console.error('Error updating DJ:', error);
      toast({ title: "Error updating DJ/Artist", variant: "destructive" });
    }
  };

  const handleDeleteDj = async (id: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDjs(djs.filter(d => d.id !== id));
      toast({ title: "DJ/Artist deleted successfully!" });
    } catch (error) {
      console.error('Error deleting DJ:', error);
      toast({ title: "Error deleting DJ/Artist", variant: "destructive" });
    }
  };

  const handleAddLocation = async () => {
    if (!locationForm.name || !locationForm.type || !locationForm.capacity) return;
    
    try {
      const { data, error } = await supabase
        .from('event_locations')
        .insert([{
          name: locationForm.name,
          type: locationForm.type,
          capacity: parseInt(locationForm.capacity)
        }])
        .select()
        .single();

      if (error) throw error;

      setLocations([data, ...locations]);
      setLocationForm({ name: "", type: "Stage", capacity: "" });
      setIsLocationDialogOpen(false);
      toast({ title: "Location added successfully!" });
    } catch (error) {
      console.error('Error adding location:', error);
      toast({ title: "Error adding location", variant: "destructive" });
    }
  };

  const handleEditLocation = (location: any) => {
    setEditingItem(location);
    setLocationForm({ name: location.name, type: location.type, capacity: location.capacity.toString() });
    setIsLocationDialogOpen(true);
  };

  const handleUpdateLocation = async () => {
    if (!locationForm.name || !locationForm.type || !locationForm.capacity || !editingItem) return;
    
    try {
      const { error } = await supabase
        .from('event_locations')
        .update({
          name: locationForm.name,
          type: locationForm.type,
          capacity: parseInt(locationForm.capacity)
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      setLocations(locations.map(l => l.id === editingItem.id ? 
        { ...l, name: locationForm.name, type: locationForm.type, capacity: parseInt(locationForm.capacity) } : l
      ));
      setLocationForm({ name: "", type: "Stage", capacity: "" });
      setEditingItem(null);
      setIsLocationDialogOpen(false);
      toast({ title: "Location updated successfully!" });
    } catch (error) {
      console.error('Error updating location:', error);
      toast({ title: "Error updating location", variant: "destructive" });
    }
  };

  const handleDeleteLocation = async (id: number) => {
    try {
      const { error } = await supabase
        .from('event_locations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLocations(locations.filter(l => l.id !== id));
      toast({ title: "Location deleted successfully!" });
    } catch (error) {
      console.error('Error deleting location:', error);
      toast({ title: "Error deleting location", variant: "destructive" });
    }
  };

  const resetForms = () => {
    setVendorForm({ name: "", code: "", status: "pending" });
    setDjForm({ name: "", code: "", status: "offline" });
    setLocationForm({ name: "", type: "Stage", capacity: "" });
    setEditingItem(null);
  };

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
                  <p className="text-2xl font-bold text-white">{vendors.filter(v => v.status === 'active').length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">DJs Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">{djs.filter(d => d.status === 'active').length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Total Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">{locations.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-400">Online</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Dialog open={isVendorDialogOpen} onOpenChange={setIsVendorDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-white/20 text-white hover:bg-white/30" onClick={resetForms}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Vendor
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Dialog open={isDjDialogOpen} onOpenChange={setIsDjDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-white/20 text-white hover:bg-white/30" onClick={resetForms}>
                        <Plus className="w-4 h-4 mr-2" />
                        Register DJ/Artist
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-white/20 text-white hover:bg-white/30" onClick={resetForms}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Location
                      </Button>
                    </DialogTrigger>
                  </Dialog>
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
              <Dialog open={isVendorDialogOpen} onOpenChange={setIsVendorDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white/20 text-white hover:bg-white/30" onClick={resetForms}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vendor
                  </Button>
                </DialogTrigger>
              </Dialog>
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
                        <p className="text-white font-semibold">Status: {vendor.status}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => handleEditVendor(vendor)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => handleDeleteVendor(vendor.id)}>
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
              <Dialog open={isDjDialogOpen} onOpenChange={setIsDjDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white/20 text-white hover:bg-white/30" onClick={resetForms}>
                    <Plus className="w-4 h-4 mr-2" />
                    Register Artist
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {djs.map((dj) => (
                <Card key={dj.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-semibold">{dj.display_name}</h3>
                          <Badge className={`${getStatusColor(dj.status)} text-white`}>
                            {dj.status}
                          </Badge>
                        </div>
                         <p className="text-white/80">Code: {dj.access_code}</p>
                        <p className="text-white font-semibold">Role: {dj.role}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => handleEditDj(dj)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => handleDeleteDj(dj.id)}>
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
              <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white/20 text-white hover:bg-white/30" onClick={resetForms}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Location
                  </Button>
                </DialogTrigger>
              </Dialog>
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
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => handleEditLocation(location)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => handleDeleteLocation(location.id)}>
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

      {/* Vendor Dialog */}
      <DialogContent className="bg-black/90 backdrop-blur-lg border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingItem ? 'Edit Vendor' : 'Add New Vendor'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="vendor-name" className="text-white">Vendor Name</Label>
            <Input
              id="vendor-name"
              value={vendorForm.name}
              onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter vendor name"
            />
          </div>
          <div>
            <Label htmlFor="vendor-code" className="text-white">Vendor Code</Label>
            <Input
              id="vendor-code"
              value={vendorForm.code}
              onChange={(e) => setVendorForm({ ...vendorForm, code: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter vendor code"
            />
          </div>
          <div>
            <Label htmlFor="vendor-status" className="text-white">Status</Label>
            <Select value={vendorForm.status} onValueChange={(value) => setVendorForm({ ...vendorForm, status: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={editingItem ? handleUpdateVendor : handleAddVendor}
              className="bg-white/20 text-white hover:bg-white/30"
            >
              {editingItem ? 'Update' : 'Add'} Vendor
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => { setIsVendorDialogOpen(false); resetForms(); }}
              className="text-white hover:bg-white/20"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* DJ Dialog */}
      <DialogContent className="bg-black/90 backdrop-blur-lg border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingItem ? 'Edit DJ/Artist' : 'Add New DJ/Artist'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="dj-name" className="text-white">DJ/Artist Name</Label>
            <Input
              id="dj-name"
              value={djForm.name}
              onChange={(e) => setDjForm({ ...djForm, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter DJ/Artist name"
            />
          </div>
          <div>
            <Label htmlFor="dj-code" className="text-white">DJ Code</Label>
            <Input
              id="dj-code"
              value={djForm.code}
              onChange={(e) => setDjForm({ ...djForm, code: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter DJ code"
            />
          </div>
          <div>
            <Label htmlFor="dj-status" className="text-white">Status</Label>
            <Select value={djForm.status} onValueChange={(value) => setDjForm({ ...djForm, status: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="performing">Performing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={editingItem ? handleUpdateDj : handleAddDj}
              className="bg-white/20 text-white hover:bg-white/30"
            >
              {editingItem ? 'Update' : 'Add'} DJ/Artist
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => { setIsDjDialogOpen(false); resetForms(); }}
              className="text-white hover:bg-white/20"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Location Dialog */}
      <DialogContent className="bg-black/90 backdrop-blur-lg border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingItem ? 'Edit Location' : 'Add New Location'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="location-name" className="text-white">Location Name</Label>
            <Input
              id="location-name"
              value={locationForm.name}
              onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter location name"
            />
          </div>
          <div>
            <Label htmlFor="location-type" className="text-white">Location Type</Label>
            <Select value={locationForm.type} onValueChange={(value) => setLocationForm({ ...locationForm, type: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="Stage">Stage</SelectItem>
                <SelectItem value="Vendor Area">Vendor Area</SelectItem>
                <SelectItem value="Special Area">Special Area</SelectItem>
                <SelectItem value="Entrance">Entrance</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="location-capacity" className="text-white">Capacity</Label>
            <Input
              id="location-capacity"
              type="number"
              value={locationForm.capacity}
              onChange={(e) => setLocationForm({ ...locationForm, capacity: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter capacity"
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={editingItem ? handleUpdateLocation : handleAddLocation}
              className="bg-white/20 text-white hover:bg-white/30"
            >
              {editingItem ? 'Update' : 'Add'} Location
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => { setIsLocationDialogOpen(false); resetForms(); }}
              className="text-white hover:bg-white/20"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default OrganizerBackend;