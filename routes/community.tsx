import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Heart, ThumbsUp, Plus, Award, MapPin } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { threads, stories } from "@/mocks/data";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Farmer Community & Forum | AgriOS AI" },
      { name: "description", content: "Ask questions, share success stories, learn from 12 lakh fellow farmers across India." },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <PublicLayout>
      <div className="bg-gradient-hero border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Badge variant="secondary" className="mb-3">Farmer community</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">Learn from farmers across India</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Ask questions, share what worked, get answers from experts and experienced farmers in your region.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <Card className="p-4 mb-6">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold shrink-0">U</div>
              <div className="flex-1">
                <Textarea placeholder="Ask a question or share your experience…" className="min-h-[80px] resize-none" />
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    {["Crops","Disease","Schemes","Mandi","Irrigation"].map((t) => (
                      <button key={t} className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-accent">#{t}</button>
                    ))}
                  </div>
                  <Button size="sm" className="bg-gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" />Post</Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {threads.map((t) => (
              <Card key={t.id} className="p-5 hover:shadow-card transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-earth text-soil-foreground grid place-items-center font-bold shrink-0">
                    {t.author.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{t.author}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t.village}</span>
                      <Badge variant="outline" className="text-[10px]">{t.tag}</Badge>
                    </div>
                    <h3 className="font-semibold mt-1.5">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.excerpt}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{t.replies} replies</span>
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" />{t.likes} likes</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <Card className="p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Award className="h-4 w-4 text-warning" />Top contributors</h3>
            <div className="space-y-3">
              {[
                { name: "Dr. Anil Verma", points: 4250, role: "Pathologist" },
                { name: "Harpreet Singh", points: 3120, role: "Farmer · PB" },
                { name: "Meera Patel", points: 2890, role: "Farmer · GJ" },
                { name: "Dr. Kavita Iyer", points: 2540, role: "Soil scientist" },
              ].map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className="text-sm font-bold text-muted-foreground w-4">{i + 1}</div>
                  <div className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-bold">{c.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.role}</div>
                  </div>
                  <div className="text-xs text-success font-medium">{c.points}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Heart className="h-4 w-4 text-destructive" />Success spotlight</h3>
            <div className="text-5xl mb-2">{stories[0].emoji}</div>
            <p className="text-sm">"{stories[0].quote}"</p>
            <div className="mt-3 text-xs text-muted-foreground">— {stories[0].name}, {stories[0].village}</div>
            <Badge className="mt-3 bg-success/10 text-success border-success/20">{stories[0].metric}</Badge>
          </Card>
        </aside>
      </div>
    </PublicLayout>
  );
}
