import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Shield, Eye, EyeOff } from "lucide-react"

export interface SecurityInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordToggle?: boolean
}

const SecurityInput = React.forwardRef<HTMLInputElement, SecurityInputProps>(
  ({ className, type, showPasswordToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type

    return (
      <div className="relative group">
        <div className={cn(
          "relative flex items-center",
          isFocused && "ring-2 ring-primary/50 ring-offset-2 ring-offset-background rounded-md"
        )}>
          <Shield className="absolute left-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <Input
            type={inputType}
            className={cn(
              "pl-10 pr-10 bg-security-subtle border-border/50",
              "hover:border-primary/50 focus:border-primary",
              "transition-all duration-300",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-3 h-4 w-4 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    )
  }
)
SecurityInput.displayName = "SecurityInput"

export { SecurityInput }