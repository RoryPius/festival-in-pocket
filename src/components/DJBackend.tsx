import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  Plus, 
  ThumbsUp, 
  Users,
  Clock,
  TrendingUp,
  Search
} from "lucide-react";

interface DJBackendProps {
  onLogout: () => void;
}

const DJBackend = ({ onLogout }: DJBackendProps) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'voting' | 'library' | 'analytics'>('queue');
  const [isPlaying, setIsPlaying] = useState(true);
  
  const [currentQueue] = useState([
    { id: 1, title: "Summer Vibes", artist: "DJ Pulse", votes: 45, duration: "3:24", status: "playing" },
    { id: 2, title: "Electric Dreams", artist: "Beat Master", votes: 38, duration: "4:12", status: "next" },
    { id: 3, title: "Festival Anthem", artist: "Echo Wave", votes: 32, duration: "3:45", status: "queued" },
    { id: 4, title: "Midnight Drop", artist: "DJ Pulse", votes: 28, duration: "4:01", status: "queued" },
  ]);

  const [votingResults] = useState([
    { id: 1, title: "Bassline Groove", artist: "Various", votes: 67, trend: "up" },
    { id: 2, title: "Neon Lights", artist: "Synth Wave", votes: 54, trend: "up" },
    { id: 3, title: "Crowd Pleaser", artist: "Party Mix", votes: 41, trend: "down" },
    { id: 4, title: "Dance Floor", artist: "House Beats", votes: 39, trend: "up" },
  ]);

  const [musicLibrary] = useState([
    { id: 1, title: "Progressive House Set", artist: "DJ Pulse", genre: "House", duration: "6:30" },
    { id: 2, title: "Trap Remix Pack", artist: "Beat Master", genre: "Trap", duration: "4:45" },
    { id: 3, title: "Ambient Chill", artist: "Lounge Artists", genre: "Ambient", duration: "8:12" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'playing': return 'bg-green-500';
      case 'next': return 'bg-blue-500';
      case 'queued': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--chrome-gradient)' }}>
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DJ Dashboard</h1>
              <p className="text-white/80 text-sm">Live Mix Control</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="ghost" className="text-white hover:bg-white/20">
            Logout
          </Button>
        </div>
      </div>

      {/* Now Playing */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white/20 text-white hover:bg-white/30"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" className="bg-white/20 text-white hover:bg-white/30">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <p className="text-white font-semibold">Summer Vibes - DJ Pulse</p>
              <p className="text-white/80 text-sm">1:24 / 3:24</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-white/80">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>1,247 listening</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>45 votes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="flex space-x-1 p-2">
          {[
            { key: 'queue', label: 'Queue', icon: Clock },
            { key: 'voting', label: 'Voting Results', icon: ThumbsUp },
            { key: 'library', label: 'Music Library', icon: Music },
            { key: 'analytics', label: 'Analytics', icon: TrendingUp },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as any)}
              variant={activeTab === key ? "secondary" : "ghost"}
              className={`text-white ${
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
        {/* Queue Tab */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Current Queue</h2>
              <Button className="bg-white/20 text-white hover:bg-white/30">
                <Plus className="w-4 h-4 mr-2" />
                Add Track
              </Button>
            </div>
            
            <div className="grid gap-4">
              {currentQueue.map((track, index) => (
                <Card key={track.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="text-white/60 font-semibold">#{index + 1}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-white font-semibold">{track.title}</h3>
                            <Badge className={`${getStatusColor(track.status)} text-white`}>
                              {track.status}
                            </Badge>
                          </div>
                          <p className="text-white/80 text-sm">{track.artist} • {track.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-white">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{track.votes}</span>
                        </div>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Voting Results Tab */}
        {activeTab === 'voting' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Live Voting Results</h2>
            
            <div className="grid gap-4">
              {votingResults.map((track, index) => (
                <Card key={track.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="text-white font-bold text-lg">#{index + 1}</div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{track.title}</h3>
                          <p className="text-white/80 text-sm">{track.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(track.trend)}
                        </div>
                        <div className="flex items-center space-x-1 text-white">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="font-semibold">{track.votes}</span>
                        </div>
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                          Add to Queue
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Music Library Tab */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Music Library</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                  <Input 
                    placeholder="Search tracks..." 
                    className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <Button className="bg-white/20 text-white hover:bg-white/30">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {musicLibrary.map((track) => (
                <Card key={track.id} className="bg-white/20 backdrop-blur-lg border-white/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{track.title}</h3>
                        <p className="text-white/80 text-sm">{track.artist} • {track.genre} • {track.duration}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                          Add to Queue
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
            <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Total Listeners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">1,247</p>
                  <p className="text-green-400 text-sm">+15% from last hour</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Total Votes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">856</p>
                  <p className="text-green-400 text-sm">+23% from last hour</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Tracks Played</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-white/60 text-sm">This session</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Most Popular Genres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <div className="flex justify-between">
                      <span>House</span>
                      <span>34%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trap</span>
                      <span>28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progressive</span>
                      <span>22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ambient</span>
                      <span>16%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/20 backdrop-blur-lg border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <div className="flex justify-between">
                      <span>8:00 PM - 9:00 PM</span>
                      <span>1,456 listeners</span>
                    </div>
                    <div className="flex justify-between">
                      <span>9:00 PM - 10:00 PM</span>
                      <span>1,247 listeners</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10:00 PM - 11:00 PM</span>
                      <span>1,089 listeners</span>
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

export default DJBackend;