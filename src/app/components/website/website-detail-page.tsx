import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  MousePointerClick, 
  ArrowLeft,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  ExternalLink
} from "lucide-react";
import { AddCheckModal } from "./add-check-modal";

interface WebsiteDetailPageProps {
  websiteId: string;
  onNavigate: (page: string) => void;
  onViewCheckResults: (checkId: string) => void;
}

// Mock data
const mockWebsite = {
  id: "1",
  name: "My Store",
  url: "https://mystore.com",
  status: "healthy" as const,
  uptime: "99.9%",
  lastChecked: "2 mins ago",
};

const mockPageChecks = [
  {
    id: "1",
    name: "Homepage Load",
    url: "https://mystore.com",
    frequency: "15m",
    status: "healthy" as const,
    lastRun: "2 mins ago",
    uptime: "100%"
  },
  {
    id: "2",
    name: "Product Page",
    url: "https://mystore.com/products/item",
    frequency: "30m",
    status: "healthy" as const,
    lastRun: "5 mins ago",
    uptime: "99.5%"
  },
];

const mockCtaChecks = [
  {
    id: "3",
    name: "Add to Cart Button",
    selector: "button.add-to-cart",
    expectedOutcome: "Network Request",
    frequency: "15m",
    status: "healthy" as const,
    lastRun: "1 min ago",
    uptime: "100%"
  },
  {
    id: "4",
    name: "Checkout Button",
    selector: "button.checkout-btn",
    expectedOutcome: "URL Change",
    frequency: "15m",
    status: "warning" as const,
    lastRun: "3 mins ago",
    uptime: "98.2%"
  },
];

const mockAlerts = [
  {
    id: "1",
    checkName: "Checkout Button",
    time: "1 hour ago",
    reason: "Expected URL change did not occur",
    status: "resolved" as const
  },
  {
    id: "2",
    checkName: "Product Page",
    time: "2 days ago",
    reason: "Page took longer than 3s to load",
    status: "resolved" as const
  },
];

export function WebsiteDetailPage({ websiteId, onNavigate, onViewCheckResults }: WebsiteDetailPageProps) {
  const [showAddCheck, setShowAddCheck] = useState(false);

  const getStatusBadge = (status: "healthy" | "warning" | "error") => {
    const variants = {
      healthy: { icon: CheckCircle, label: "Healthy", className: "bg-green-500 hover:bg-green-600 text-white" },
      warning: { icon: AlertCircle, label: "Warning", className: "bg-yellow-500 hover:bg-yellow-600 text-white" },
      error: { icon: AlertCircle, label: "Error", className: "bg-red-500 hover:bg-red-600 text-white" },
    };
    
    const { icon: Icon, label, className } = variants[status];
    return (
      <Badge className={className}>
        <Icon className="size-3 mr-1" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Website Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-semibold text-gray-900">{mockWebsite.name}</h1>
                {getStatusBadge(mockWebsite.status)}
              </div>
              <a 
                href={mockWebsite.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary flex items-center gap-1"
              >
                {mockWebsite.url}
                <ExternalLink className="size-4" />
              </a>
            </div>
            <Button onClick={() => setShowAddCheck(true)}>
              <Plus className="size-4 mr-2" />
              Add Check
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Uptime</p>
                    <p className="text-2xl font-semibold mt-1">{mockWebsite.uptime}</p>
                  </div>
                  <Activity className="size-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Checks</p>
                    <p className="text-2xl font-semibold mt-1">{mockPageChecks.length + mockCtaChecks.length}</p>
                  </div>
                  <CheckCircle className="size-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Last Checked</p>
                    <p className="text-2xl font-semibold mt-1">{mockWebsite.lastChecked}</p>
                  </div>
                  <Clock className="size-8 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="page-checks">
          <TabsList>
            <TabsTrigger value="page-checks">Page Checks ({mockPageChecks.length})</TabsTrigger>
            <TabsTrigger value="cta-checks">CTA Checks ({mockCtaChecks.length})</TabsTrigger>
            <TabsTrigger value="alerts">Alerts History ({mockAlerts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="page-checks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Health Checks</CardTitle>
                <CardDescription>Monitor page load times and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPageChecks.map((check) => (
                    <div key={check.id} className="border rounded-lg p-4 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{check.name}</h4>
                            {getStatusBadge(check.status)}
                          </div>
                          <p className="text-sm text-gray-600">{check.url}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewCheckResults(check.id)}
                        >
                          View Results
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <span className="text-gray-600">Frequency:</span> <span className="font-medium">{check.frequency}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Run:</span> <span className="font-medium">{check.lastRun}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Uptime:</span> <span className="font-medium">{check.uptime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cta-checks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>CTA Checks</CardTitle>
                <CardDescription>Monitor button clicks and user interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCtaChecks.map((check) => (
                    <div key={check.id} className="border rounded-lg p-4 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{check.name}</h4>
                            {getStatusBadge(check.status)}
                          </div>
                          <p className="text-sm text-gray-600 font-mono">{check.selector}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewCheckResults(check.id)}
                        >
                          View Results
                        </Button>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                        <div>
                          <span className="text-gray-600">Expected:</span> <span className="font-medium">{check.expectedOutcome}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Frequency:</span> <span className="font-medium">{check.frequency}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Run:</span> <span className="font-medium">{check.lastRun}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Uptime:</span> <span className="font-medium">{check.uptime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alerts History</CardTitle>
                <CardDescription>Past failures and incidents</CardDescription>
              </CardHeader>
              <CardContent>
                {mockAlerts.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <CheckCircle className="size-12 mx-auto mb-2 text-green-500" />
                    <p>No alerts! Everything has been running smoothly.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mockAlerts.map((alert) => (
                      <div key={alert.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{alert.checkName}</h4>
                              <Badge variant="outline">Resolved</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{alert.reason}</p>
                          </div>
                          <span className="text-sm text-gray-600">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Check Modal */}
      {showAddCheck && (
        <AddCheckModal onClose={() => setShowAddCheck(false)} />
      )}
    </div>
  );
}
