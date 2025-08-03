import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SessionCard from "@/components/SessionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface Session {
  _id: string;
  title: string;
  tags: string[];
  status: "draft" | "published";
}

const MySessions = () => {
  const [draftSessions, setDraftSessions] = useState<Session[]>([]);
  const [publishedSessions, setPublishedSessions] = useState<Session[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("https://wellnessspace.onrender.com/api/my-sessions", { withCredentials: true });
        console.log("Fetched sessions:", res.data);
        const sessions = res.data.data;

        const drafts = sessions.filter((s: Session) => s.status === "draft");
        const published = sessions.filter((s: Session) => s.status === "published");

        setDraftSessions(drafts);
        setPublishedSessions(published);
      } catch (err) {
        toast({
          title: "Failed to load sessions",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    };

    fetchSessions();
  }, []);

  const handleEditSession = (sessionId: string) => {
    console.log("Editing session:", sessionId);
    // Navigate to /edit-session/:id
    navigate(`/edit-session/${sessionId}`);
  };

  const handleViewSession = (sessionId: string) => {
    console.log("Viewing session:", sessionId);
    // Navigate to /view-session/:id
    navigate(`/view-session/${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">My Sessions</h1>
            <p className="text-muted-foreground">
              Manage your wellness sessions and track your progress
            </p>
          </div>
          <Link to="/create-session">
            <Button className="shadow-wellness-button w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Create New Session</span>
              <span className="sm:hidden">Create</span>
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="drafts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-sm sm:max-w-md mb-8">
            <TabsTrigger value="drafts">Drafts ({draftSessions.length})</TabsTrigger>
            <TabsTrigger value="published">Published ({publishedSessions.length})</TabsTrigger>
          </TabsList>

          {/* Drafts Tab */}
          <TabsContent value="drafts" className="space-y-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">Draft Sessions</h2>
              <p className="text-muted-foreground">Sessions you're currently working on</p>
            </div>

            {draftSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftSessions.map((session) => (
                  <SessionCard
                    key={session._id}
                    title={session.title}
                    tags={session.tags}
                    status={session.status}
                    showEdit
                    onEdit={() => handleEditSession(session._id)}
                    onView={() => handleViewSession(session._id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center border-border shadow-wellness-card">
                <p className="text-muted-foreground text-lg mb-4">No draft sessions yet</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Start creating your first wellness session to help others on their journey
                </p>
                <Link to="/create-session">
                  <Button className="shadow-wellness-button">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Session
                  </Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* Published Tab */}
          <TabsContent value="published" className="space-y-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">Published Sessions</h2>
              <p className="text-muted-foreground">Sessions available to the community</p>
            </div>

            {publishedSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedSessions.map((session) => (
                  <SessionCard
                    key={session._id}
                    title={session.title}
                    tags={session.tags}
                    status={session.status}
                    showEdit
                    onEdit={() => handleEditSession(session._id)}
                    onView={() => handleViewSession(session._id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center border-border shadow-wellness-card">
                <p className="text-muted-foreground text-lg mb-4">No published sessions yet</p>
                <p className="text-sm text-muted-foreground">
                  Publish your draft sessions to share them with the community
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MySessions;
