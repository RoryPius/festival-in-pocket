
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InteractiveMapProps {
  vendors: any[];
}

const InteractiveMap = ({ vendors }: InteractiveMapProps) => {
  const mapFeatures = [
    { id: 1, type: "stage", name: "Main Stage", icon: "🎤", x: 50, y: 20, info: "DJ Nova performing" },
    { id: 2, type: "stage", name: "Electronic Stage", icon: "🎧", x: 80, y: 40, info: "Beat Master next" },
    { id: 3, type: "food", name: "Food Court", icon: "🍔", x: 30, y: 60, info: "8min avg wait" },
    { id: 4, type: "drink", name: "Bar Zone", icon: "🍹", x: 70, y: 70, info: "12min avg wait" },
    { id: 5, type: "toilet", name: "Restrooms North", icon: "🚻", x: 20, y: 30, info: "3min wait" },
    { id: 6, type: "toilet", name: "Restrooms South", icon: "🚻", x: 85, y: 80, info: "7min wait" },
    { id: 7, type: "merch", name: "Merch Tent", icon: "👕", x: 40, y: 85, info: "No wait" },
    { id: 8, type: "first-aid", name: "First Aid", icon: "🏥", x: 15, y: 70, info: "Emergency" },
    { id: 9, type: "water", name: "Water Station", icon: "💧", x: 60, y: 45, info: "Free refills" },
  ];

  const getFeatureColor = (type: string) => {
    switch (type) {
      case "stage": return "bg-white";
      case "food": return "bg-gray-600";
      case "drink": return "bg-gray-700";
      case "toilet": return "bg-gray-500";
      case "merch": return "bg-gray-400";
      case "first-aid": return "bg-black";
      case "water": return "bg-gray-300";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Festival Map</h1>
        <p className="text-gray-300">Tap icons for live info</p>
      </div>

      {/* Map Container */}
      <Card className="bg-black/40 backdrop-blur-lg border-gray-500/30 mb-6">
        <CardContent className="p-4">
          <div className="relative w-full h-80 bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-lg overflow-hidden">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Map Features */}
            {mapFeatures.map((feature) => (
              <div
                key={feature.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${feature.x}%`, top: `${feature.y}%` }}
              >
                <div className={`w-8 h-8 rounded-full ${getFeatureColor(feature.type)} flex items-center justify-center text-black text-sm font-bold shadow-lg animate-pulse group-hover:scale-110 transition-transform`}>
                  <span className="text-xs">{feature.icon}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-black/80 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                    <div className="font-semibold">{feature.name}</div>
                    <div className="text-gray-300">{feature.info}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Your Location */}
            <div className="absolute bottom-4 right-4">
              <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-400 animate-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { type: "stage", label: "Stages", icon: "🎤" },
          { type: "food", label: "Food", icon: "🍔" },
          { type: "drink", label: "Drinks", icon: "🍹" },
          { type: "toilet", label: "Restrooms", icon: "🚻" },
          { type: "merch", label: "Merch", icon: "👕" },
          { type: "first-aid", label: "First Aid", icon: "🏥" },
        ].map((item) => (
          <div key={item.type} className="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
            <div className={`w-4 h-4 rounded-full ${getFeatureColor(item.type)}`}></div>
            <span className="text-white text-sm">{item.label}</span>
            <span className="ml-auto">{item.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveMap;
