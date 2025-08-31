import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SecurityInput } from '@/components/ui/security-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface PasswordEntryProps {
  onAccessGranted: () => void
}

const PasswordEntry = ({ onAccessGranted }: PasswordEntryProps) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Demo passwords - in real app this would be validated against backend
  const validPasswords = ['SECRET2024', 'VIEWONCE123', 'CONFIDENTIAL']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (validPasswords.includes(password.toUpperCase())) {
      toast.success('Access granted! Article unlocked for one-time viewing.')
      onAccessGranted()
    } else {
      toast.error('Invalid password. Access denied.')
      setPassword('')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 fade-in-secure">
          <div className="mx-auto w-16 h-16 bg-security-gradient rounded-full flex items-center justify-center shadow-security-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-security-gradient bg-clip-text text-transparent">
            View Once
          </h1>
          <p className="text-muted-foreground">
            Secure content that can only be viewed once
          </p>
        </div>

        {/* Password Entry Card */}
        <Card className="security-content protected border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="flex items-center justify-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Enter Access Code
            </CardTitle>
            <CardDescription>
              This content requires a one-time password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <SecurityInput
                type="password"
                placeholder="Enter your access code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPasswordToggle
                className="text-center text-lg tracking-wider"
                disabled={isLoading}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-security-gradient hover:shadow-security-glow transition-all duration-300"
                disabled={!password || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Validating...
                  </div>
                ) : (
                  <>Unlock Content</>
                )}
              </Button>
            </form>

            {/* Demo Passwords Hint */}
            <div className="mt-6 p-3 bg-security-subtle rounded-lg border border-border/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-security-warning mt-0.5 flex-shrink-0" />
                <div className="text-xs space-y-1">
                  <p className="font-medium text-security-warning">Demo Mode</p>
                  <p className="text-muted-foreground">
                    Try: SECRET2024, VIEWONCE123, or CONFIDENTIAL
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center text-xs text-muted-foreground">
          <p>⚠️ Content will be permanently inaccessible after viewing</p>
        </div>
      </div>
    </div>
  )
}

export default PasswordEntry