
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface DJVotingProps {
  djData: any;
}

const DJVoting = ({ djData }: DJVotingProps) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [votes, setVotes] = useState(djData.options);
  const { toast } = useToast();

  const totalVotes = votes.reduce((sum: number, option: any) => sum + option.votes, 0);

  const handleVote = (optionId: number) => {
    if (hasVoted) return;

    setVotes(votes.map((option: any) => 
      option.id === optionId 
        ? { ...option, votes: option.votes + 1 }
        : option
    ));
    
    setSelectedVote(optionId);
    setHasVoted(true);
    
    toast({
      title: "Vote Recorded! 🎵",
      description: "Thanks for helping choose the next track!",
    });
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">DJ Queue Voting</h1>
        <p className="text-gray-300">Vote for the next track!</p>
      </div>

      {/* Now Playing */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border-gray-500/30 mb-6">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl animate-pulse">🎵</span>
            <span className="text-white font-semibold">Now Playing</span>
          </div>
          <p className="text-white text-lg font-medium">{djData.currentTrack}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1 h-6 bg-gradient-to-t from-gray-400 to-white rounded-full animate-pulse ${i % 2 === 0 ? 'animation-delay-100' : ''}`}></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voting Status */}
      <div className="flex items-center justify-between mb-4">
        <Badge className="bg-gray-300 text-black border-gray-400">
          {totalVotes + (hasVoted ? 1 : 0)} votes cast
        </Badge>
        {hasVoted && (
          <Badge className="bg-white text-black border-gray-300">
            ✓ Vote Recorded
          </Badge>
        )}
      </div>

      {/* Voting Options */}
      <div className="space-y-4">
        {votes.map((option: any) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = selectedVote === option.id;
          
          return (
            <Card 
              key={option.id} 
              className={`bg-black/40 backdrop-blur-lg border-gray-500/30 transition-all cursor-pointer hover:border-gray-400/50 ${
                isSelected ? 'border-white/50 bg-white/10' : ''
              } ${hasVoted ? 'cursor-default' : 'hover:scale-102'}`}
              onClick={() => handleVote(option.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{option.title}</h3>
                    <p className="text-gray-300 text-sm">by {option.artist}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">{option.votes}</div>
                    <div className="text-gray-300 text-xs">votes</div>
                  </div>
                </div>
                
                {hasVoted && (
                  <div className="space-y-2">
                    <Progress value={percentage} className="h-2" />
                    <div className="text-right text-gray-300 text-xs">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                )}
                
                {!hasVoted && (
                  <Button 
                    className="w-full bg-white text-black hover:bg-gray-200"
                    size="sm"
                  >
                    Vote for This Track 🎵
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Next Vote Timer */}
      <Card className="bg-black/20 backdrop-blur-lg border-gray-500/30 mt-6">
        <CardContent className="p-4 text-center">
          <p className="text-gray-300 text-sm mb-2">Next voting round in:</p>
          <div className="text-2xl font-bold text-white">2:34</div>
          <p className="text-gray-300 text-xs">Voting resets with each new track</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DJVoting;
