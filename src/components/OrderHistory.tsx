
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      vendor: "Burger Bliss",
      items: ["Classic Burger", "Cheese Fries"],
      total: 21.98,
      status: "ready",
      orderTime: "2:30 PM",
      readyTime: "2:45 PM",
      logo: "🍔"
    },
    {
      id: 2,
      vendor: "Craft Cocktails",
      items: ["Festival Mojito"],
      total: 15.99,
      status: "preparing",
      orderTime: "2:15 PM",
      eta: "5 min",
      logo: "🍹"
    },
    {
      id: 3,
      vendor: "Beat Merch",
      items: ["Festival T-Shirt"],
      total: 29.99,
      status: "completed",
      orderTime: "1:45 PM",
      completedTime: "1:50 PM",
      logo: "👕"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-white text-black border-gray-300";
      case "preparing": return "bg-gray-400 text-black border-gray-500";
      case "completed": return "bg-gray-600 text-white border-gray-500";
      default: return "bg-gray-500 text-white border-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready": return "🔔 Ready for Pickup";
      case "preparing": return "⏳ Being Prepared";
      case "completed": return "✅ Completed";
      default: return status;
    }
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Order History</h1>
        <p className="text-gray-300">Track your festival orders</p>
      </div>

      {/* Active Orders */}
      <div className="mb-6">
        <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
          Active Orders
        </h2>
        
        {orders.filter(order => order.status !== "completed").map((order) => (
          <Card key={order.id} className="bg-black/40 backdrop-blur-lg border-gray-500/30 mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{order.logo}</span>
                  <div>
                    <CardTitle className="text-white text-lg">{order.vendor}</CardTitle>
                    <p className="text-gray-300 text-sm">Order #{order.id} • {order.orderTime}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status === "ready" && "🔔"} {getStatusText(order.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Items */}
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <p key={index} className="text-white text-sm">• {item}</p>
                ))}
              </div>
              
              {/* Total */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-500/30">
                <span className="text-gray-300">Total:</span>
                <span className="text-white font-bold">${order.total.toFixed(2)}</span>
              </div>

              {/* ETA or Ready Time */}
              {order.status === "preparing" && (
                <div className="text-center py-2">
                  <p className="text-gray-300 font-medium">⏱️ ETA: {order.eta}</p>
                </div>
              )}
              
              {order.status === "ready" && (
                <div className="text-center">
                  <Button className="w-full bg-white text-black hover:bg-gray-200">
                    🏃‍♂️ Head to Pickup
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Past Orders */}
      <div>
        <h2 className="text-white font-semibold mb-3">Past Orders</h2>
        
        {orders.filter(order => order.status === "completed").map((order) => (
          <Card key={order.id} className="bg-black/20 backdrop-blur-lg border-gray-500/30 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl opacity-60">{order.logo}</span>
                  <div>
                    <h3 className="text-white font-medium">{order.vendor}</h3>
                    <p className="text-gray-400 text-sm">Order #{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                  <p className="text-gray-400 text-xs mt-1">{order.completedTime}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-gray-300 text-sm">
                  {order.items.join(", ")}
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-500/30 text-gray-300 hover:bg-gray-700/20"
                >
                  Reorder
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
