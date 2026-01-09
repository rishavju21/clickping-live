import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AddCheckModalProps {
  onClose: () => void;
}

export function AddCheckModal({ onClose }: AddCheckModalProps) {
  const [checkType, setCheckType] = useState<"page" | "cta">("page");
  
  // Page check fields
  const [pageUrl, setPageUrl] = useState("");
  const [pageFrequency, setPageFrequency] = useState("15m");
  
  // CTA check fields
  const [ctaName, setCtaName] = useState("");
  const [ctaSelector, setCtaSelector] = useState("");
  const [ctaOutcomeType, setCtaOutcomeType] = useState("url-change");
  const [ctaExpectedValue, setCtaExpectedValue] = useState("");
  const [ctaFrequency, setCtaFrequency] = useState("15m");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert(`Check added successfully!`);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Check</DialogTitle>
          <DialogDescription>
            Set up monitoring for a page or CTA
          </DialogDescription>
        </DialogHeader>

        <Tabs value={checkType} onValueChange={(v) => setCheckType(v as "page" | "cta")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="page">Page Check</TabsTrigger>
            <TabsTrigger value="cta">CTA Check</TabsTrigger>
          </TabsList>

          <TabsContent value="page">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="page-url">Page URL</Label>
                <Input
                  id="page-url"
                  type="url"
                  placeholder="https://mystore.com/products"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-600">
                  Full URL of the page you want to monitor
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="page-frequency">Check Frequency</Label>
                <Select value={pageFrequency} onValueChange={setPageFrequency}>
                  <SelectTrigger id="page-frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5m">Every 5 minutes</SelectItem>
                    <SelectItem value="15m">Every 15 minutes</SelectItem>
                    <SelectItem value="30m">Every 30 minutes</SelectItem>
                    <SelectItem value="1h">Every hour</SelectItem>
                    <SelectItem value="6h">Every 6 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Page checks</strong> monitor if the page loads successfully and within acceptable time limits (usually 3 seconds).
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Page Check
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="cta">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="cta-name">CTA Name</Label>
                <Input
                  id="cta-name"
                  placeholder="Add to Cart Button"
                  value={ctaName}
                  onChange={(e) => setCtaName(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-600">
                  A descriptive name for this button or link
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta-selector">CSS Selector</Label>
                <Input
                  id="cta-selector"
                  placeholder="button.add-to-cart"
                  value={ctaSelector}
                  onChange={(e) => setCtaSelector(e.target.value)}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-sm text-gray-600">
                  CSS selector to identify the element (e.g., button.checkout-btn, #submit-form)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcome-type">Expected Outcome</Label>
                <Select value={ctaOutcomeType} onValueChange={setCtaOutcomeType}>
                  <SelectTrigger id="outcome-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="url-change">URL Change</SelectItem>
                    <SelectItem value="network-request">Network Request</SelectItem>
                    <SelectItem value="element-visible">Element Appears</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected-value">Expected Value</Label>
                <Input
                  id="expected-value"
                  placeholder={
                    ctaOutcomeType === "url-change" 
                      ? "/checkout" 
                      : ctaOutcomeType === "network-request"
                      ? "/api/cart/add"
                      : ".success-message"
                  }
                  value={ctaExpectedValue}
                  onChange={(e) => setCtaExpectedValue(e.target.value)}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-sm text-gray-600">
                  {ctaOutcomeType === "url-change" && "URL path that should appear after clicking"}
                  {ctaOutcomeType === "network-request" && "API endpoint that should be called"}
                  {ctaOutcomeType === "element-visible" && "Selector of element that should appear"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta-frequency">Check Frequency</Label>
                <Select value={ctaFrequency} onValueChange={setCtaFrequency}>
                  <SelectTrigger id="cta-frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5m">Every 5 minutes</SelectItem>
                    <SelectItem value="15m">Every 15 minutes</SelectItem>
                    <SelectItem value="30m">Every 30 minutes</SelectItem>
                    <SelectItem value="1h">Every hour</SelectItem>
                    <SelectItem value="6h">Every 6 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>CTA checks</strong> simulate clicking a button or link and verify the expected outcome happens (like navigating to a new page or triggering an API call).
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add CTA Check
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
