
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventCodeEntryProps {
  onSubmit: (code: string) => void;
}

const EventCodeEntry = ({ onSubmit }: EventCodeEntryProps) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎪 FestSync</h1>
          <p className="text-purple-200 text-lg">Your Festival Companion</p>
        </div>

        <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 text-white">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-purple-100">Enter Event Code</CardTitle>
            <p className="text-purple-200 text-sm">
              Get your code from event organizers or your ticket
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 8-digit code (e.g. FEST2024)"
                  className="bg-white/10 border-purple-400/50 text-white placeholder:text-purple-200 text-center text-lg font-mono tracking-widest uppercase"
                  maxLength={8}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
                disabled={code.length < 4}
              >
                Access Festival ✨
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-purple-200 text-sm mb-2">Try demo code:</p>
              <button
                onClick={() => setCode("FEST2024")}
                className="text-purple-300 hover:text-white text-sm underline"
              >
                FEST2024
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCodeEntry;
