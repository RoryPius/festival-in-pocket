import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Store, Music, ArrowLeft } from "lucide-react";

interface OrganizationRoleSelectionProps {
  onRoleSelect: (role: 'organizer' | 'vendor' | 'dj') => void;
  onBack: () => void;
}

const OrganizationRoleSelection = ({ onRoleSelect, onBack }: OrganizationRoleSelectionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ background: 'var(--chrome-gradient)' }}>
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="absolute top-4 left-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Organization Access</h1>
          <p className="text-white/90">Select your role</p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-4">
          <Card className="bg-white/20 backdrop-blur-lg border-white/30 hover:bg-white/30 transition-all duration-300"
                style={{ boxShadow: 'var(--chrome-shadow)' }}>
            <CardHeader className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-white text-lg">Event Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-center text-sm mb-4">
                Full access to event management, vendor setup, DJ coordination, and analytics
              </p>
              <Button 
                onClick={() => onRoleSelect('organizer')}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600"
              >
                Organizer Access
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-lg border-white/30 hover:bg-white/30 transition-all duration-300"
                style={{ boxShadow: 'var(--chrome-shadow)' }}>
            <CardHeader className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Store className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-white text-lg">Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-center text-sm mb-4">
                Manage your store, update inventory, process orders, and handle finances
              </p>
              <Button 
                onClick={() => onRoleSelect('vendor')}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600"
              >
                Vendor Portal
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-lg border-white/30 hover:bg-white/30 transition-all duration-300"
                style={{ boxShadow: 'var(--chrome-shadow)' }}>
            <CardHeader className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Music className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-white text-lg">DJ/Artist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-center text-sm mb-4">
                Control music voting, manage queues, and interact with audience
              </p>
              <Button 
                onClick={() => onRoleSelect('dj')}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-500 hover:to-pink-600"
              >
                DJ Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationRoleSelection;