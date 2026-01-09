import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MousePointerClick, ArrowLeft } from "lucide-react";

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MousePointerClick className="size-10 text-primary" />
            <span className="text-3xl font-semibold text-gray-900">ClickPing.live</span>
          </div>
          <p className="text-gray-600">Reset your password</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forgot password?</CardTitle>
            <CardDescription>
              {submitted 
                ? "Check your email for a reset link"
                : "Enter your email and we'll send you a reset link"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Check your inbox and follow the instructions.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('login')}
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back to login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>

                <Button 
                  variant="ghost" 
                  className="w-full"
                  type="button"
                  onClick={() => onNavigate('login')}
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back to login
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
