import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Utensils, Users, ShoppingBag, Music, CreditCard, Clock, Wallet, Home, Map } from "lucide-react";
import RoleSelection from "@/components/RoleSelection";
import OrganizationRoleSelection from "@/components/OrganizationRoleSelection";
import EventCodeEntry from "@/components/EventCodeEntry";
import Dashboard from "@/components/Dashboard";
import VendorMarketplace from "@/components/VendorMarketplace";
import InteractiveMap from "@/components/InteractiveMap";
import DJVoting from "@/components/DJVoting";
import WalletComponent from "@/components/WalletComponent";
import OrderHistory from "@/components/OrderHistory";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'role' | 'org-role' | 'event-code' | 'app'>('role');
  const [selectedRole, setSelectedRole] = useState<'user' | 'organization' | null>(null);
  const [selectedOrgRole, setSelectedOrgRole] = useState<'organizer' | 'vendor' | 'dj' | null>(null);
  const [eventCode, setEventCode] = useState<string>("");
  const [eventData, setEventData] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState(125.50);
  const [activeView, setActiveView] = useState("dashboard");
  const { toast } = useToast();

  // Mock event data - in real app this would come from API
  const mockEventData = {
    "FEST2024": {
      name: "Summer Beats Festival",
      theme: "electronic",
      vendors: [
        {
          id: 1,
          name: "Burger Bliss",
          category: "food",
          logo: "🍔",
          waitTime: 8,
          menu: [
            { id: 1, name: "Classic Burger", price: 12.99, image: "🍔" },
            { id: 2, name: "Cheese Fries", price: 8.99, image: "🍟" }
          ]
        },
        {
          id: 2,
          name: "Craft Cocktails",
          category: "drink",
          logo: "🍹",
          waitTime: 12,
          menu: [
            { id: 3, name: "Festival Mojito", price: 15.99, image: "🍹" },
            { id: 4, name: "Electric Lemonade", price: 13.99, image: "🥤" }
          ]
        },
        {
          id: 3,
          name: "Beat Merch",
          category: "merch",
          logo: "👕",
          waitTime: 3,
          menu: [
            { id: 5, name: "Festival T-Shirt", price: 29.99, image: "👕" },
            { id: 6, name: "Glow Sticks Pack", price: 9.99, image: "✨" }
          ]
        }
      ],
      djVoting: {
        currentTrack: "Electronic Dreams - DJ Nova",
        options: [
          { id: 1, title: "Bass Drop Anthem", artist: "DJ Thunder", votes: 42 },
          { id: 2, title: "Neon Nights", artist: "Electric Soul", votes: 38 },
          { id: 3, title: "Festival Vibes", artist: "Beat Master", votes: 29 }
        ]
      }
    }
  };

  const handleRoleSelect = (role: 'user' | 'organization') => {
    setSelectedRole(role);
    if (role === 'user') {
      setCurrentStep('event-code');
    } else {
      setCurrentStep('org-role');
    }
  };

  const handleOrgRoleSelect = (role: 'organizer' | 'vendor' | 'dj') => {
    setSelectedOrgRole(role);
    setCurrentStep('event-code');
  };

  const handleEventCodeSubmit = (code: string) => {
    const eventInfo = mockEventData[code as keyof typeof mockEventData];
    if (eventInfo) {
      setEventData(eventInfo);
      setEventCode(code);
      setCurrentStep('app');
      toast({
        title: "Access Granted!",
        description: `Welcome to ${eventInfo.name}`,
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your event code and try again.",
        variant: "destructive",
      });
    }
  };

  // Show role selection first
  if (currentStep === 'role') {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  // Show organization role selection for org users
  if (currentStep === 'org-role') {
    return (
      <OrganizationRoleSelection 
        onRoleSelect={handleOrgRoleSelect}
        onBack={() => setCurrentStep('role')}
      />
    );
  }

  // Show event code entry
  if (currentStep === 'event-code') {
    return <EventCodeEntry onSubmit={handleEventCodeSubmit} />;
  }

  // Show main app after authentication
  if (currentStep !== 'app' || !eventData) {
    return <EventCodeEntry onSubmit={handleEventCodeSubmit} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <Dashboard
            eventData={eventData}
            walletBalance={walletBalance}
            onNavigate={setActiveView}
          />
        );
      case "vendors":
        return (
          <VendorMarketplace
            vendors={eventData.vendors}
            walletBalance={walletBalance}
            onWalletUpdate={setWalletBalance}
          />
        );
      case "map":
        return <InteractiveMap vendors={eventData.vendors} />;
      case "dj":
        return <DJVoting djData={eventData.djVoting} />;
      case "wallet":
        return (
          <WalletComponent
            balance={walletBalance}
            onBalanceUpdate={setWalletBalance}
          />
        );
      case "orders":
        return <OrderHistory />;
      default:
        return (
          <Dashboard
            eventData={eventData}
            walletBalance={walletBalance}
            onNavigate={setActiveView}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {renderActiveView()}
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-gray-500/30">
        <div className="flex justify-around items-center py-2 px-4">
          {[
            { id: "dashboard", icon: Home, label: "Home" },
            { id: "map", icon: Map, label: "Map" },
            { id: "vendors", icon: ShoppingBag, label: "Vendors" },
            { id: "dj", icon: Music, label: "DJ Vote" },
            { id: "wallet", icon: CreditCard, label: "Wallet" },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  activeView === item.id
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
