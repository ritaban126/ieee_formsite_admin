import * as Icons from 'lucide-react';
import { Lightbulb } from 'lucide-react';

type IconComponent = React.ComponentType<{ className?: string }>;

const registry = Icons as unknown as Record<string, IconComponent>;

export function getIcon(name: string): IconComponent {
  return registry[name] ?? Lightbulb;
}
