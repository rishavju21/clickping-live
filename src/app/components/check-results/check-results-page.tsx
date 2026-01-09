import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Image as ImageIcon,
  RefreshCw
} from "lucide-react";

interface CheckResultsPageProps {
  checkId: string;
  onNavigate: (page: string) => void;
}

// Mock data
const mockCheck = {
  id: "3",
  name: "Add to Cart Button",
  type: "cta" as const,
  website: "My Store",
  selector: "button.add-to-cart",
  expectedOutcome: "Network Request to /api/cart/add",
  frequency: "15m"
};

const mockResults = [
  {
    id: "1",
    timestamp: "2026-01-09T10:30:00",
    status: "pass" as const,
    duration: "1.2s",
    screenshot: null,
    failureReason: null
  },
  {
    id: "2",
    timestamp: "2026-01-09T10:15:00",
    status: "pass" as const,
    duration: "1.1s",
    screenshot: null,
    failureReason: null
  },
  {
    id: "3",
    timestamp: "2026-01-09T10:00:00",
    status: "fail" as const,
    duration: "3.5s",
    screenshot: "mock-screenshot.png",
    failureReason: "Expected network request to /api/cart/add was not detected"
  },
  {
    id: "4",
    timestamp: "2026-01-09T09:45:00",
    status: "pass" as const,
    duration: "1.3s",
    screenshot: null,
    failureReason: null
  },
  {
    id: "5",
    timestamp: "2026-01-09T09:30:00",
    status: "pass" as const,
    duration: "1.0s",
    screenshot: null,
    failureReason: null
  },
];

export function CheckResultsPage({ checkId, onNavigate }: CheckResultsPageProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const passCount = mockResults.filter(r => r.status === 'pass').length;
  const failCount = mockResults.filter(r => r.status === 'fail').length;
  const successRate = ((passCount / mockResults.length) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <Button variant="ghost" onClick={() => onNavigate('website-detail')}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Website
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Check Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">{mockCheck.name}</h1>
              <p className="text-gray-600 mb-1">{mockCheck.website}</p>
              {mockCheck.type === 'cta' && (
                <p className="text-sm text-gray-600 font-mono">{mockCheck.selector}</p>
              )}
            </div>
            <Button>
              <RefreshCw className="size-4 mr-2" />
              Run Check Now
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-semibold mt-1">{successRate}%</p>
                  </div>
                  <CheckCircle className="size-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Passed</p>
                    <p className="text-2xl font-semibold mt-1">{passCount}</p>
                  </div>
                  <CheckCircle className="size-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Failed</p>
                    <p className="text-2xl font-semibold mt-1">{failCount}</p>
                  </div>
                  <XCircle className="size-8 text-red-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Frequency</p>
                    <p className="text-2xl font-semibold mt-1">{mockCheck.frequency}</p>
                  </div>
                  <Clock className="size-8 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Check Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Check Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Check Type</p>
                <p className="font-medium capitalize">{mockCheck.type} Check</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Frequency</p>
                <p className="font-medium">Every {mockCheck.frequency}</p>
              </div>
              {mockCheck.type === 'cta' && (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Selector</p>
                    <p className="font-medium font-mono text-sm">{mockCheck.selector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Outcome</p>
                    <p className="font-medium">{mockCheck.expectedOutcome}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Runs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Runs</CardTitle>
            <CardDescription>Latest check results and their outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockResults.map((result) => (
                <div 
                  key={result.id} 
                  className={`border rounded-lg p-4 ${
                    result.status === 'fail' ? 'border-red-200 bg-red-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {result.status === 'pass' ? (
                        <CheckCircle className="size-5 text-green-500" />
                      ) : (
                        <XCircle className="size-5 text-red-500" />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">
                            {result.status === 'pass' ? 'Check Passed' : 'Check Failed'}
                          </span>
                          <Badge variant={result.status === 'pass' ? 'default' : 'destructive'} className={result.status === 'pass' ? 'bg-green-500 hover:bg-green-600' : ''}>
                            {result.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{formatTimestamp(result.timestamp)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">{result.duration}</p>
                    </div>
                  </div>

                  {result.failureReason && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <p className="text-sm font-medium text-red-900 mb-1">Failure Reason:</p>
                      <p className="text-sm text-red-800">{result.failureReason}</p>
                    </div>
                  )}

                  {result.screenshot && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <ImageIcon className="size-4" />
                        <span>Screenshot captured</span>
                      </div>
                      <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                        <ImageIcon className="size-12 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
