import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SessionEditor = () => {
  const { id: sessionId } = useParams<{ id: string }>();
  const isEditMode = Boolean(sessionId);

  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    jsonUrl: "",
  });
  const [parsedTags, setParsedTags] = useState<string[]>([]);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch session data if editing
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/my-sessions/${sessionId}`,
          { withCredentials: true }
        );
        const { title, tags, jsonUrl } = res.data?.data || {};
        setFormData({ title, tags: tags.join(", "), jsonUrl });
        setParsedTags(tags);
      } catch (error: unknown) {
        toast({
          title: "Failed to load session",
          description: axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Something went wrong",
          variant: "destructive",
        });
      }
    };
    if (isEditMode) fetchSession();
  }, [isEditMode, sessionId, toast]);

  // Tag change
  const handleTagsChange = (value: string) => {
    setFormData({ ...formData, tags: value });
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    setParsedTags(tags);
  };

  // Remove tag
  const removeTag = (index: number) => {
    const newTags = parsedTags.filter((_, i) => i !== index);
    setParsedTags(newTags);
    setFormData({ ...formData, tags: newTags.join(", ") });
  };

  // Save Draft
  const saveDraft = useCallback(async () => {
    if (!formData.title.trim()) return;
    try {
      setIsAutoSaving(true);
      await axios.post(
        "http://localhost:5000/api/my-sessions/save-draft",
        {
          sessionId: isEditMode ? sessionId : undefined,
          title: formData.title,
          tags: parsedTags,
          jsonUrl: formData.jsonUrl,
        },
        { withCredentials: true }
      );
    } catch {
      // Fail silently for autosave
    } finally {
      setIsAutoSaving(false);
    }
  }, [formData.title, formData.jsonUrl, parsedTags, sessionId, isEditMode]);

  // Debounce helper
  const debounce = (func: () => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => func(), delay);
    };
  };

  // Memoize debounced save function
  const debouncedSave = useMemo(() => debounce(saveDraft, 1000), [saveDraft]);

  // Auto-save on input change
  useEffect(() => {
    if (formData.title.trim()) {
      debouncedSave();
    }
  }, [formData, parsedTags, debouncedSave]);

  // Manual Save Draft
  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      return toast({
        title: "Validation Error",
        description: "Please enter a session title",
        variant: "destructive",
      });
    }

    try {
      setIsAutoSaving(true);
      const response = await axios.post(
        "http://localhost:5000/api/my-sessions/save-draft",
        {
          sessionId: isEditMode ? sessionId : undefined,
          title: formData.title,
          tags: parsedTags,
          jsonUrl: formData.jsonUrl,
        },
        { withCredentials: true }
      );

      toast({
        title: "Draft Saved",
        description: response.data?.message || "Session draft saved",
      });

      navigate("/my-sessions");
    } catch (error: unknown) {
      toast({
        title: "Failed to save draft",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsAutoSaving(false);
    }
  };

  // Publish session
  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.jsonUrl.trim()) {
      return toast({
        title: "Validation Error",
        description: "Title and JSON URL are required to publish",
        variant: "destructive",
      });
    }

    try {
      const response = await axios.post(
        "/my-sessions/publish",
        {
          _id: isEditMode ? sessionId : undefined,
          title: formData.title,
          tags: parsedTags,
          jsonUrl: formData.jsonUrl,
        },
        { withCredentials: true }
      );

      toast({
        title: "Session Published",
        description: response.data?.message || "Session is now live!",
      });

      navigate("/my-sessions");
    } catch (error: unknown) {
      toast({
        title: "Failed to publish session",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {isEditMode ? "Edit Session" : "Session Editor"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? "Update your draft session"
              : "Create or edit your wellness session"}
          </p>
        </div>

        {/* Session Form */}
        <Card className="shadow-wellness-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              Session Details
              {isAutoSaving && (
                <span className="text-sm text-muted-foreground animate-pulse ml-2">
                  Auto-saving...
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Session Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Morning Meditation"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="meditation, mindfulness"
                value={formData.tags}
                onChange={(e) => handleTagsChange(e.target.value)}
              />
              {parsedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {parsedTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeTag(index)}
                    >
                      {tag}
                      <X className="w-3 h-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jsonUrl">JSON File URL *</Label>
              <Input
                id="jsonUrl"
                placeholder="https://example.com/session.json"
                value={formData.jsonUrl}
                onChange={(e) =>
                  setFormData({ ...formData, jsonUrl: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleSaveDraft}
                variant="outline"
                className="flex-1"
                disabled={isAutoSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isAutoSaving ? "Saving..." : "Save as Draft"}
              </Button>
              <Button
                onClick={handlePublish}
                className="flex-1 shadow-wellness-button"
              >
                <Upload className="w-4 h-4 mr-2" />
                Publish Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SessionEditor;
