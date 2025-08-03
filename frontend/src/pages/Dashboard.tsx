import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import SessionCard from "@/components/SessionCard";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type Session = {
  _id: string;
  title: string;
  tags: string[];
};

const Dashboard = () => {
  const [publishedSessions, setPublishedSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sessions", {
        withCredentials: true,
      });
      console.log("Fetched sessions:", res.data);
      setPublishedSessions(res.data.data); 
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <Card className="mb-8 bg-wellness-gradient border-border shadow-wellness-card">
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to WellnessSpace
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover guided wellness sessions to enhance your mind, body, and spirit
            </p>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Published Sessions
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore our collection of wellness sessions created by our community
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center">Loading sessions...</p>
        ) : publishedSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedSessions.map((session) => (
              console.log("Rendering session:", session),
              <SessionCard
                key={session._id}
                title={session.title}
                tags={session.tags}
                onView={() => navigate(`/session/${session._id}`)} 
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center border-border shadow-wellness-card">
            <p className="text-muted-foreground text-lg">
              No published sessions available yet. Check back soon!
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
