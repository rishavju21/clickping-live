import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  MousePointerClick, 
  LogOut, 
  Plus,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings
} from "lucide-react";

interface DashboardPageProps {
  onNavigate: (page: string, websiteId?: string) => void;
  onLogout: () => void;
}

// Mock data
const mockWebsites = [
  {
    id: "1",
    name: "My Store",
    url: "https://mystore.com",
    status: "healthy" as const,
    activeChecks: 5,
    lastChecked: "2 mins ago",
    uptime: "99.9%"
  },
  {
    id: "2",
    name: "Marketing Site",
    url: "https://marketing.example.com",
    status: "warning" as const,
    activeChecks: 3,
    lastChecked: "5 mins ago",
    uptime: "98.5%"
  },
  {
    id: "3",
    name: "Blog",
    url: "https://blog.example.com",
    status: "error" as const,
    activeChecks: 2,
    lastChecked: "1 min ago",
    uptime: "95.2%"
  },
];

const recentAlerts = [
  {
    id: "1",
    website: "Blog",
    check: "Homepage Load",
    time: "5 mins ago",
    status: "error" as const
  },
  {
    id: "2",
    website: "Marketing Site",
    check: "Contact Form Submit",
    time: "1 hour ago",
    status: "warning" as const
  },
];

export function DashboardPage({ onNavigate, onLogout }: DashboardPageProps) {
  const getStatusBadge = (status: "healthy" | "warning" | "error") => {
    const variants = {
      healthy: { variant: "default" as const, icon: CheckCircle, label: "Healthy", className: "bg-green-500 hover:bg-green-600" },
      warning: { variant: "secondary" as const, icon: AlertCircle, label: "Warning", className: "bg-yellow-500 hover:bg-yellow-600 text-white" },
      error: { variant: "destructive" as const, icon: AlertCircle, label: "Error", className: "" },
    };
    
    const { icon: Icon, label, className } = variants[status];
    return (
      <Badge variant={variants[status].variant} className={className}>
        <Icon className="size-3 mr-1" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2">
            <MousePointerClick className="size-8 text-primary" />
            <span className="text-2xl font-semibold text-gray-900">ClickPing.live</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate('settings')}>
              <Settings className="size-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="size-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Websites</p>
                  <p className="text-3xl font-semibold mt-1">{mockWebsites.length}</p>
                </div>
                <Activity className="size-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Checks</p>
                  <p className="text-3xl font-semibold mt-1">
                    {mockWebsites.reduce((sum, w) => sum + w.activeChecks, 0)}
                  </p>
                </div>
                <CheckCircle className="size-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recent Alerts</p>
                  <p className="text-3xl font-semibold mt-1">{recentAlerts.length}</p>
                </div>
                <AlertCircle className="size-10 text-yellow-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Uptime</p>
                  <p className="text-3xl font-semibold mt-1">98.5%</p>
                </div>
                <Clock className="size-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Websites Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Your Websites</h2>
            <Button onClick={() => onNavigate('onboarding')}>
              <Plus className="size-4 mr-2" />
              Add Website
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWebsites.map((website) => (
              <Card key={website.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{website.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">{website.url}</CardDescription>
                    </div>
                    {getStatusBadge(website.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active Checks</span>
                      <span className="font-medium">{website.activeChecks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Uptime</span>
                      <span className="font-medium">{website.uptime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Checked</span>
                      <span className="font-medium">{website.lastChecked}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => onNavigate('website-detail', website.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest issues detected on your websites</CardDescription>
              </div>
              <Button variant="outline" onClick={() => onNavigate('alerts')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentAlerts.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <CheckCircle className="size-12 mx-auto mb-2 text-green-500" />
                <p>No alerts! Everything is running smoothly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <AlertCircle className={`size-5 ${alert.status === 'error' ? 'text-red-500' : 'text-yellow-500'}`} />
                      <div>
                        <p className="text-sm font-medium">{alert.check}</p>
                        <p className="text-xs text-gray-600">{alert.website} • {alert.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
