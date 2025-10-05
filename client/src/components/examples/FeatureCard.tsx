import FeatureCard from '../FeatureCard';
import { Zap } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <FeatureCard 
      icon={Zap}
      title="Fast Performance"
      description="Lightning-fast response times with optimized Express.js routing and middleware."
    />
  );
}
