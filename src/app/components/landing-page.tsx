import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  ShieldCheck, 
  Bell, 
  MousePointerClick, 
  Activity, 
  Zap, 
  Users,
  ArrowRight,
  Check,
  CreditCard,
  Smartphone
} from "lucide-react";
import { useState } from "react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const pricing = {
    INR: { symbol: '₹', amount: '499', currency: 'INR' },
    USD: { symbol: '$', amount: '5', currency: 'USD' }
  };

  const currentPrice = pricing[currency];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2">
            <MousePointerClick className="size-8 text-primary" />
            <span className="text-2xl font-semibold text-gray-900">ClickPing.live</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate('login')}>
              Log In
            </Button>
            <Button onClick={() => onNavigate('signup')}>
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl font-semibold text-gray-900 mb-6">
            Know when revenue breaks,<br />
            <span className="text-primary">not when users complain.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Lightweight QA automation for D2C and B2C brands. Monitor critical CTAs and pages. 
            Get instant alerts when failures happen.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('signup')}>
              Get Started Free
              <ArrowRight className="ml-2 size-5" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Everything you need to protect revenue
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <MousePointerClick className="size-12 text-primary mb-4" />
                <h3 className="text-xl mb-2">CTA Monitoring</h3>
                <p className="text-gray-600">
                  Track critical buttons and links. Know immediately if checkout, signup, or purchase flows break.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Activity className="size-12 text-primary mb-4" />
                <h3 className="text-xl mb-2">Page Health Checks</h3>
                <p className="text-gray-600">
                  Monitor essential pages for uptime and proper rendering. Catch issues before customers do.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Bell className="size-12 text-primary mb-4" />
                <h3 className="text-xl mb-2">Instant Alerts</h3>
                <p className="text-gray-600">
                  Get notified via email the moment something fails. No more waiting for customer complaints.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Zap className="size-12 text-primary mb-4" />
                <h3 className="text-xl mb-2">Easy Setup</h3>
                <p className="text-gray-600">
                  No engineers needed. Set up monitoring in minutes without writing a single line of code.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl mb-2">Add Your Website</h3>
              <p className="text-gray-600">
                Enter your website URL and name. We'll automatically discover your CTAs and pages.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl mb-2">Select What to Monitor</h3>
              <p className="text-gray-600">
                Choose which buttons, links, and pages matter most to your business.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl mb-2">Get Instant Alerts</h3>
              <p className="text-gray-600">
                Receive immediate notifications when something breaks so you can fix it fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Start free, scale as you grow
            </p>
            
            {/* Currency Toggle */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  currency === 'INR'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  currency === 'USD'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card className="relative border-2">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">Free Trial</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-semibold">14</span>
                    <span className="text-xl text-gray-600">days</span>
                  </div>
                  <p className="text-sm text-gray-600">Full access, no credit card required</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Up to 5 websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Unlimited checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Email alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">24/7 monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">No credit card required</span>
                  </li>
                </ul>

                <Button className="w-full" size="lg" onClick={() => onNavigate('signup')}>
                  Start Free Trial
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                
                <p className="text-xs text-center text-gray-600 mt-3">
                  Access for 14 days • No payment required
                </p>
              </CardContent>
            </Card>

            {/* Paid Tier */}
            <Card className="relative border-2 border-primary shadow-lg">
              <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                Most Popular
              </div>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">Pro Plan</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-semibold">
                      {currentPrice.symbol}{currentPrice.amount}
                    </span>
                    <span className="text-xl text-gray-600">/month</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {currency === 'INR' ? '₹499 per month' : '$5 per month'}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Free Trial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Unlimited websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Cancel anytime</span>
                  </li>
                </ul>

                <Button className="w-full" size="lg" onClick={() => onNavigate('signup')}>
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Button>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center mb-3">Accepted payment methods:</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      <CreditCard className="size-4 text-gray-600" />
                      <span className="text-xs text-gray-600">Credit Card</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      <Smartphone className="size-4 text-gray-600" />
                      <span className="text-xs text-gray-600">UPI</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-600 mt-3">
                    Cancel your subscription anytime, no questions asked
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-gray-600 mb-6">Trusted by growing D2C brands</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            <div className="flex items-center gap-2">
              <Users className="size-8" />
              <span className="text-xl font-semibold">Brand One</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-8" />
              <span className="text-xl font-semibold">Brand Two</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="size-8" />
              <span className="text-xl font-semibold">Brand Three</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MousePointerClick className="size-6 text-primary" />
                <span className="text-lg font-semibold">ClickPing.live</span>
              </div>
              <p className="text-gray-600 text-sm">
                Lightweight QA automation for modern brands
              </p>
            </div>
            <div>
              <h4 className="text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2026 ClickPing.live. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}