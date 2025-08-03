import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Heart, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-wellness-gradient">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Leaf className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold text-foreground">WellnessSpace</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your personal sanctuary for guided wellness sessions, mindfulness practices, 
            and transformative experiences that nurture your mind, body, and spirit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="shadow-wellness-button">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                Explore Sessions
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center shadow-wellness-card border-border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                Join a supportive community of wellness enthusiasts sharing their journeys and insights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-wellness-card border-border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Personalized Experience
              </h3>
              <p className="text-muted-foreground">
                Discover sessions tailored to your needs, from meditation to movement and everything in between.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-wellness-card border-border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Transform Daily
              </h3>
              <p className="text-muted-foreground">
                Build lasting habits with bite-sized sessions that fit seamlessly into your daily routine.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
