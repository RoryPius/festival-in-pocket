
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  eventData: any;
  walletBalance: number;
  onNavigate: (view: string) => void;
}

const Dashboard = ({ eventData, walletBalance, onNavigate }: DashboardProps) => {
  const quickActions = [
    { id: "map", icon: "🗺️", title: "Map", subtitle: "Find everything", color: "from-green-500 to-emerald-600" },
    { id: "vendors", icon: "🍽", title: "Vendors", subtitle: "Food & drinks", color: "from-orange-500 to-red-600" },
    { id: "toilets", icon: "🚻", title: "Toilets", subtitle: "3min wait", color: "from-blue-500 to-cyan-600" },
    { id: "orders", icon: "📦", title: "Orders", subtitle: "Track orders", color: "from-purple-500 to-pink-600" },
    { id: "dj", icon: "🎧", title: "DJ Queue", subtitle: "Vote for music", color: "from-pink-500 to-rose-600" },
    { id: "wallet", icon: "💳", title: "Add Money", subtitle: "Top up wallet", color: "from-yellow-500 to-amber-600" },
  ];

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">{eventData.name}</h1>
        <div className="flex items-center justify-center gap-2">
          <span className="text-purple-200">Wallet:</span>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-3 py-1">
            ${walletBalance.toFixed(2)}
          </Badge>
        </div>
      </div>

      {/* Live Status */}
      <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border-purple-500/30 mb-6">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">Festival is LIVE</span>
          </div>
          <p className="text-purple-200 text-sm">🎵 Now Playing: Electronic Dreams - DJ Nova</p>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Card
            key={action.id}
            className="bg-black/40 backdrop-blur-lg border-purple-500/30 hover:border-purple-400/50 transition-all cursor-pointer hover:scale-105"
            onClick={() => onNavigate(action.id)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mx-auto mb-3`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">{action.title}</h3>
              <p className="text-purple-200 text-xs">{action.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-purple-200 text-xs">Active Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">5min</div>
          <div className="text-purple-200 text-xs">Avg Wait Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">89%</div>
          <div className="text-purple-200 text-xs">Happy Vibes</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
