import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle, MousePointerClick } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [selectedCtas, setSelectedCtas] = useState<string[]>([]);

  // Mock CTAs discovered on the website
  const mockCtas = [
    { id: "1", name: "Add to Cart", selector: "button.add-to-cart" },
    { id: "2", name: "Checkout", selector: "button.checkout-btn" },
    { id: "3", name: "Sign Up", selector: "a.signup-link" },
    { id: "4", name: "Subscribe Newsletter", selector: "form.newsletter button" },
    { id: "5", name: "Contact Us", selector: "a.contact-btn" },
  ];

  const handleCtaToggle = (ctaId: string) => {
    setSelectedCtas(prev =>
      prev.includes(ctaId)
        ? prev.filter(id => id !== ctaId)
        : [...prev, ctaId]
    );
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Step {step} of 4</p>
        </div>

        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Welcome to ClickPing! 👋</CardTitle>
                <CardDescription>
                  Let's get you set up in just a few minutes. We'll help you start monitoring your website's critical flows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="size-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-sm">Monitor CTAs & Pages</h4>
                        <p className="text-sm text-gray-600">Track buttons, links, and page health in real-time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="size-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-sm">Get Instant Alerts</h4>
                        <p className="text-sm text-gray-600">Know immediately when something breaks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="size-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-sm">No Code Required</h4>
                        <p className="text-sm text-gray-600">Set up monitoring without engineering resources</p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleNext} className="w-full">
                    Get Started
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Add Your First Website</CardTitle>
                <CardDescription>
                  Enter your website details so we can start monitoring it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website-name">Website Name</Label>
                    <Input
                      id="website-name"
                      placeholder="My Store"
                      value={websiteName}
                      onChange={(e) => setWebsiteName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website-url">Website URL</Label>
                    <Input
                      id="website-url"
                      type="url"
                      placeholder="https://mystore.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      required
                    />
                    <p className="text-sm text-gray-600">Enter your base URL (e.g., https://example.com)</p>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 size-4" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continue
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>CTA Discovery</CardTitle>
                <CardDescription>
                  We've analyzed your website and found several clickable elements (CTAs). These are buttons and links that might be critical to your business.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>What are CTAs?</strong> CTAs (Call-to-Actions) are buttons or links users click to perform important actions like "Add to Cart", "Checkout", or "Sign Up". We'll monitor these to ensure they're always working.
                    </p>
                  </div>
                  <Button onClick={handleNext} className="w-full">
                    Continue
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button variant="outline" onClick={handleBack} className="w-full">
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle>Select CTAs to Monitor</CardTitle>
                <CardDescription>
                  Choose which CTAs you want us to monitor. You can always add or remove these later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    {mockCtas.map((cta) => (
                      <div
                        key={cta.id}
                        className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted transition-colors"
                      >
                        <Checkbox
                          id={cta.id}
                          checked={selectedCtas.includes(cta.id)}
                          onCheckedChange={() => handleCtaToggle(cta.id)}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={cta.id}
                            className="text-sm cursor-pointer"
                          >
                            {cta.name}
                          </label>
                          <p className="text-xs text-gray-600 font-mono mt-1">{cta.selector}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 size-4" />
                      Back
                    </Button>
                    <Button 
                      onClick={handleNext} 
                      className="flex-1"
                      disabled={selectedCtas.length === 0}
                    >
                      Complete Setup
                      <CheckCircle className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
