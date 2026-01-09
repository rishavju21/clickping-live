import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft,
  User,
  Bell,
  CreditCard,
  Save,
  Smartphone
} from "lucide-react";

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [email, setEmail] = useState("user@example.com");
  const [name, setName] = useState("John Doe");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [instantAlerts, setInstantAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);

  const pricing = {
    INR: { symbol: '₹', amount: '499' },
    USD: { symbol: '$', amount: '5' }
  };

  const currentPrice = pricing[currency];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveNotifications = () => {
    alert("Notification preferences saved!");
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
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">
              <User className="size-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="size-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="size-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit">
                      <Save className="size-4 mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                      <Input
                        id="confirm-new-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit">
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">
                      Receive alerts and updates via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="instant-alerts">Instant Alerts</Label>
                    <p className="text-sm text-gray-600">
                      Get notified immediately when a check fails
                    </p>
                  </div>
                  <Switch
                    id="instant-alerts"
                    checked={instantAlerts}
                    onCheckedChange={setInstantAlerts}
                    disabled={!emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-summary">Daily Summary</Label>
                    <p className="text-sm text-gray-600">
                      Receive a daily digest of all activity
                    </p>
                  </div>
                  <Switch
                    id="daily-summary"
                    checked={dailySummary}
                    onCheckedChange={setDailySummary}
                    disabled={!emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-summary">Weekly Summary</Label>
                    <p className="text-sm text-gray-600">
                      Receive a weekly report of uptime and performance
                    </p>
                  </div>
                  <Switch
                    id="weekly-summary"
                    checked={weeklySummary}
                    onCheckedChange={setWeeklySummary}
                    disabled={!emailNotifications}
                  />
                </div>

                <div className="h-px bg-border" />

                <Button onClick={handleSaveNotifications}>
                  <Save className="size-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              {/* Free Trial Status */}
              <Card className="border-primary bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2 bg-primary">Free Trial</Badge>
                      <h4 className="font-medium mb-1">14 Days Free Trial Active</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        You have <strong>9 days remaining</strong> on your free trial
                      </p>
                      <p className="text-sm text-gray-600">
                        No credit card required • Full access to all features
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upgrade to Pro Plan</CardTitle>
                      <CardDescription>Get unlimited websites and priority support</CardDescription>
                    </div>
                    {/* Currency Toggle */}
                    <div className="inline-flex items-center gap-2 bg-muted border border-gray-200 rounded-lg p-1">
                      <button
                        onClick={() => setCurrency('INR')}
                        className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                          currency === 'INR'
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        INR (₹)
                      </button>
                      <button
                        onClick={() => setCurrency('USD')}
                        className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                          currency === 'USD'
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        USD ($)
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-primary rounded-lg bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium mb-1">Pro Plan</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Unlimited websites • Priority support • Advanced analytics
                          </p>
                          <p className="text-3xl font-semibold">
                            {currentPrice.symbol}{currentPrice.amount}
                            <span className="text-sm text-gray-600 font-normal">/month</span>
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {currency === 'INR' ? '₹499 per month' : '$5 per month'}
                          </p>
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="mb-4 pb-4 border-b">
                        <p className="text-xs text-gray-600 mb-2">Accepted payment methods:</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                            <CreditCard className="size-4 text-gray-600" />
                            <span className="text-xs text-gray-600">Credit Card</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                            <Smartphone className="size-4 text-gray-600" />
                            <span className="text-xs text-gray-600">UPI</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        Upgrade to Pro
                      </Button>
                      
                      <p className="text-xs text-center text-gray-600 mt-3">
                        Cancel anytime, no questions asked
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}