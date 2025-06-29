
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface WalletComponentProps {
  balance: number;
  onBalanceUpdate: (newBalance: number) => void;
}

const WalletComponent = ({ balance, onBalanceUpdate }: WalletComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const topUpAmounts = [10, 25, 50, 100];

  const recentTransactions = [
    { id: 1, type: "purchase", amount: -12.99, vendor: "Burger Bliss", time: "2 min ago" },
    { id: 2, type: "topup", amount: 50.00, vendor: "Card Payment", time: "15 min ago" },
    { id: 3, type: "purchase", amount: -15.99, vendor: "Craft Cocktails", time: "23 min ago" },
    { id: 4, type: "purchase", amount: -8.99, vendor: "Burger Bliss", time: "1 hour ago" },
  ];

  const handleTopUp = async (amount: number) => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onBalanceUpdate(balance + amount);
      setIsLoading(false);
      toast({
        title: "Top-up Successful! 💳",
        description: `Added $${amount.toFixed(2)} to your wallet`,
      });
    }, 1500);
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Digital Wallet</h1>
        <p className="text-purple-200">Top up to order from vendors</p>
      </div>

      {/* Current Balance */}
      <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-lg border-green-500/30 mb-6">
        <CardContent className="p-6 text-center">
          <div className="text-green-200 text-sm mb-2">Current Balance</div>
          <div className="text-4xl font-bold text-white mb-2">${balance.toFixed(2)}</div>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            💳 Ready to spend
          </Badge>
        </CardContent>
      </Card>

      {/* Top-up Options */}
      <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Quick Top-up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {topUpAmounts.map((amount) => (
              <Button
                key={amount}
                onClick={() => handleTopUp(amount)}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
              >
                {isLoading ? "Processing..." : `+$${amount}`}
              </Button>
            ))}
          </div>
          
          <div className="pt-4 border-t border-purple-500/30">
            <p className="text-purple-200 text-sm text-center mb-3">
              💳 Apple Pay • Google Pay • Card
            </p>
            <Button
              onClick={() => handleTopUp(25)}
              disabled={isLoading}
              className="w-full bg-black text-white border border-purple-500/30 hover:bg-purple-900/20"
            >
              {isLoading ? "Processing Payment..." : "Custom Amount"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === "topup" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                  <span className="text-sm">
                    {transaction.type === "topup" ? "💳" : "🛍️"}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">{transaction.vendor}</div>
                  <div className="text-purple-200 text-xs">{transaction.time}</div>
                </div>
              </div>
              <div className={`font-bold ${
                transaction.amount > 0 ? "text-green-300" : "text-red-300"
              }`}>
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Refund Notice */}
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-yellow-200 text-sm text-center">
          💡 Unused wallet balance can be refunded after the event ends
        </p>
      </div>
    </div>
  );
};

export default WalletComponent;
