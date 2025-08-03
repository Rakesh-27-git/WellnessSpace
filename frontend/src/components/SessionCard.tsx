import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3 } from "lucide-react";

interface SessionCardProps {
  _id?: string; 
  title: string;
  tags: string[];
  status?: "draft" | "published";
  showEdit?: boolean;
  onView?: () => void;
  onEdit?: () => void;
}

const SessionCard = ({ title, tags, status, showEdit = false, onView, onEdit }: SessionCardProps) => {
  return (
    <Card className="shadow-wellness-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-card-foreground line-clamp-2">
            {title}
          </CardTitle>
          {status && (
            <Badge 
              variant={status === "published" ? "default" : "secondary"}
              className="ml-2 flex-shrink-0"
            >
              {status}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          {onView && (
            <Button 
              onClick={onView}
              size="sm" 
              className="flex-1 shadow-wellness-button"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          )}
          {showEdit && onEdit && (
            <Button 
              onClick={onEdit}
              variant="outline" 
              size="sm" 
              className="flex-1"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SessionCard;