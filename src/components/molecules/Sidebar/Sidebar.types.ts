export interface SidebarStep {
  id: string;
  title: string;
  subtitle?: string;
}

export interface SidebarProps {
  steps: SidebarStep[];
  currentStep: number;
  className?: string;
}
