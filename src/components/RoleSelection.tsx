import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, User } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: 'user' | 'organization') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ background: 'var(--chrome-gradient)' }}>
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">FestSync</h1>
          <p className="text-white/90 text-lg">Choose your access type</p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-4">
          <Card className="bg-white/20 backdrop-blur-lg border-white/30 hover:bg-white/30 transition-all duration-300 hover:shadow-lg" 
                style={{ boxShadow: 'var(--chrome-shadow)' }}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                   style={{ boxShadow: 'var(--neon-glow)' }}>
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Festival Attendee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-center mb-4">
                Access vendor marketplace, DJ voting, interactive map, and more
              </p>
              <Button 
                onClick={() => onRoleSelect('user')}
                className="w-full bg-white/20 text-white border-white/40 hover:bg-white/30"
                variant="outline"
              >
                Continue as Attendee
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-lg border-white/30 hover:bg-white/30 transition-all duration-300 hover:shadow-lg"
                style={{ boxShadow: 'var(--chrome-shadow)' }}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                   style={{ boxShadow: 'var(--neon-glow)' }}>
                <Building className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Organization Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-center mb-4">
                For organizers, vendors, DJs, and event management
              </p>
              <Button 
                onClick={() => onRoleSelect('organization')}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Organization Login
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-white/70 text-sm">
            Need help? Contact event support
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;