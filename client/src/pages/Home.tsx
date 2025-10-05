import { Zap, Shield, Layers, Code2, Terminal, Rocket } from "lucide-react";
import ServerStatus from "@/components/ServerStatus";
import FeatureCard from "@/components/FeatureCard";
import CodeBlock from "@/components/CodeBlock";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const serverCode = `import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

  const features = [
    {
      icon: Zap,
      title: "Fast & Lightweight",
      description: "Express.js provides minimal overhead with maximum performance for serving static files."
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Built-in security features and best practices to protect your application."
    },
    {
      icon: Layers,
      title: "Middleware Support",
      description: "Extensible architecture with powerful middleware for any functionality you need."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-9 w-9 rounded-md bg-primary">
              <Terminal className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">Express Server</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <ServerStatus />
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Simple Express Server
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A lightweight Express.js server that serves HTML files with modern web technologies
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Quick Start</h2>
          </div>
          <p className="text-muted-foreground">
            Get started with this minimal Express server setup in just a few lines of code
          </p>
          <CodeBlock code={serverCode} language="javascript" />
        </div>

        <div className="flex items-center justify-center gap-8 py-8 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Rocket className="h-4 w-4" />
            <span>Express.js v4.x</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="h-4 w-4" />
            <span>Node.js v20+</span>
          </div>
        </div>
      </main>
    </div>
  );
}
