import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { HomeIcon, SearchIcon, CalendarIcon, UserIcon } from "lucide-react";

// Gaming Controller Icon Component - Based on user provided icon
const GamepadIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <rect x="2" y="8" width="20" height="8" rx="4" ry="4" />
    <rect x="6" y="10" width="1" height="4" />
    <rect x="5" y="11" width="3" height="1" />
    <rect x="16" y="10" width="2" height="2" />
    <rect x="15" y="13" width="2" height="2" />
  </svg>
);

interface BottomNavigationProps {
  currentPage?: string;
}

export const BottomNavigation = ({ currentPage = "" }: BottomNavigationProps) => {
  const [, setLocation] = useLocation();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: HomeIcon,
      path: "/dashboard",
      activePages: ["dashboard", ""]
    },
    {
      id: "learning",
      label: "Learning", 
      icon: SearchIcon,
      path: "/learning",
      activePages: ["learning", "search", "calculators", "calculator"]
    },
    {
      id: "planner",
      label: "Planner",
      icon: CalendarIcon,
      path: "/planner", 
      activePages: ["planner"]
    },
    {
      id: "gaming",
      label: "Gaming",
      icon: GamepadIcon,
      path: "/gaming",
      activePages: ["gaming", "quiz"]
    },
    {
      id: "profile",
      label: "Profile", 
      icon: UserIcon,
      path: "/profile",
      activePages: ["profile", "edit-profile", "security-settings", "goals-summary", "learning-progress", "help-feedback"]
    }
  ];

  const isActive = (item: any) => {
    // Only activate dashboard when explicitly on dashboard page
    if (item.id === "dashboard") {
      return currentPage === "dashboard";
    }
    
    return item.activePages.some((page: string) => 
      page !== "" && currentPage.toLowerCase().includes(page)
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-between px-4 py-4">
        {navItems.map((item) => {
          const active = isActive(item);
          const IconComponent = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className="flex flex-col items-center gap-2 p-3 min-w-0"
              onClick={() => setLocation(item.path)}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                active ? 'bg-[#6366F1]' : 'bg-gray-100'
              }`}>
                <IconComponent className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <span className={`text-xs ${active ? 'text-[#6366F1] font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};