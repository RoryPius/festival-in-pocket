
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface VendorMarketplaceProps {
  vendors: any[];
  walletBalance: number;
  onWalletUpdate: (newBalance: number) => void;
}

const VendorMarketplace = ({ vendors, walletBalance, onWalletUpdate }: VendorMarketplaceProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All", icon: "🛍️" },
    { id: "food", name: "Food", icon: "🍔" },
    { id: "drink", name: "Drinks", icon: "🍹" },
    { id: "merch", name: "Merch", icon: "👕" },
  ];

  const filteredVendors = selectedCategory === "all" 
    ? vendors 
    : vendors.filter(vendor => vendor.category === selectedCategory);

  const handleOrder = (item: any, vendor: any) => {
    if (walletBalance >= item.price) {
      onWalletUpdate(walletBalance - item.price);
      toast({
        title: "Order Placed! 🎉",
        description: `${item.name} from ${vendor.name} - Est. ${vendor.waitTime}min`,
      });
    } else {
      toast({
        title: "Insufficient Funds",
        description: "Please top up your wallet first",
        variant: "destructive",
      });
    }
  };

  const getWaitTimeColor = (waitTime: number) => {
    if (waitTime <= 5) return "bg-green-500/20 text-green-300 border-green-500/30";
    if (waitTime <= 10) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-red-500/20 text-red-300 border-red-500/30";
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Vendor Marketplace</h1>
        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
          Wallet: ${walletBalance.toFixed(2)}
        </Badge>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? "bg-purple-600 text-white"
                : "bg-black/40 text-purple-200 hover:bg-white/10"
            }`}
          >
            <span>{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Vendors List */}
      <div className="space-y-4">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="bg-black/40 backdrop-blur-lg border-purple-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{vendor.logo}</div>
                  <div>
                    <CardTitle className="text-white text-lg">{vendor.name}</CardTitle>
                    <Badge className={getWaitTimeColor(vendor.waitTime)}>
                      {vendor.waitTime}min wait
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {vendor.menu.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-purple-200 text-sm">${item.price}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleOrder(item, vendor)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    disabled={walletBalance < item.price}
                  >
                    Order
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorMarketplace;
