import { Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ServerStatus() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </div>
        <Server className="h-3.5 w-3.5" />
        <span className="text-sm font-medium">Server Running</span>
      </Badge>
    </div>
  );
}
