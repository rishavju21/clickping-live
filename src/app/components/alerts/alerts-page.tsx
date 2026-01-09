import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  XCircle,
  ExternalLink
} from "lucide-react";

interface AlertsPageProps {
  onNavigate: (page: string) => void;
}

// Mock data
const mockAlerts = [
  {
    id: "1",
    website: "My Store",
    websiteUrl: "https://mystore.com",
    checkName: "Add to Cart Button",
    checkType: "cta" as const,
    timestamp: "2026-01-09T10:00:00",
    reason: "Expected network request to /api/cart/add was not detected",
    status: "active" as const,
    severity: "error" as const
  },
  {
    id: "2",
    website: "Marketing Site",
    websiteUrl: "https://marketing.example.com",
    checkName: "Contact Form Submit",
    checkType: "cta" as const,
    timestamp: "2026-01-09T08:30:00",
    reason: "Page load time exceeded 3 seconds (4.2s)",
    status: "active" as const,
    severity: "warning" as const
  },
  {
    id: "3",
    website: "Blog",
    websiteUrl: "https://blog.example.com",
    checkName: "Homepage Load",
    checkType: "page" as const,
    timestamp: "2026-01-09T06:15:00",
    reason: "Page returned 404 status code",
    status: "resolved" as const,
    severity: "error" as const
  },
  {
    id: "4",
    website: "My Store",
    websiteUrl: "https://mystore.com",
    checkName: "Product Page",
    checkType: "page" as const,
    timestamp: "2026-01-08T18:45:00",
    reason: "Page load time exceeded 3 seconds (3.8s)",
    status: "resolved" as const,
    severity: "warning" as const
  },
];

export function AlertsPage({ onNavigate }: AlertsPageProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  const handleDismiss = (alertId: string) => {
    alert(`Alert ${alertId} marked as resolved`);
  };

  const activeAlerts = mockAlerts.filter(a => a.status === 'active');
  const resolvedAlerts = mockAlerts.filter(a => a.status === 'resolved');

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
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Alerts</h1>
          <p className="text-gray-600">Monitor and manage failures across all your websites</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                  <p className="text-3xl font-semibold mt-1">{activeAlerts.length}</p>
                </div>
                <AlertCircle className="size-10 text-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved Today</p>
                  <p className="text-3xl font-semibold mt-1">
                    {resolvedAlerts.filter(a => {
                      const date = new Date(a.timestamp);
                      const today = new Date();
                      return date.toDateString() === today.toDateString();
                    }).length}
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
                  <p className="text-sm text-gray-600">Total Alerts</p>
                  <p className="text-3xl font-semibold mt-1">{mockAlerts.length}</p>
                </div>
                <XCircle className="size-10 text-gray-400 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Issues that require your attention</CardDescription>
              </div>
              <Badge variant="destructive" className="text-base px-3 py-1">
                {activeAlerts.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {activeAlerts.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <CheckCircle className="size-12 mx-auto mb-2 text-green-500" />
                <p>No active alerts! Everything is running smoothly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`border rounded-lg p-4 ${
                      alert.severity === 'error' 
                        ? 'border-red-200 bg-red-50' 
                        : 'border-yellow-200 bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        {alert.severity === 'error' ? (
                          <XCircle className="size-5 text-red-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="size-5 text-yellow-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{alert.checkName}</h4>
                            <Badge 
                              variant={alert.severity === 'error' ? 'destructive' : 'secondary'}
                              className={alert.severity === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}
                            >
                              {alert.severity}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {alert.checkType}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">
                            <a 
                              href={alert.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-900 hover:text-primary inline-flex items-center gap-1"
                            >
                              {alert.website}
                              <ExternalLink className="size-3" />
                            </a>
                            <span className="text-gray-600"> • {formatTimestamp(alert.timestamp)}</span>
                          </p>
                          <p className="text-sm text-gray-700 bg-white/50 p-2 rounded">
                            {alert.reason}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onNavigate('check-results')}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleDismiss(alert.id)}
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resolved Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Resolved Alerts</CardTitle>
            <CardDescription>Recently resolved issues</CardDescription>
          </CardHeader>
          <CardContent>
            {resolvedAlerts.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <p>No resolved alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {resolvedAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="border rounded-lg p-4 opacity-60"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="size-5 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.checkName}</h4>
                          <Badge variant="outline">Resolved</Badge>
                        </div>
                        <p className="text-sm mb-2 text-gray-600">
                          {alert.website} • {formatTimestamp(alert.timestamp)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {alert.reason}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onNavigate('check-results')}
                      >
                        View
                      </Button>
                    </div>
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
