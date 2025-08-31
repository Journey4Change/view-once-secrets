import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Shield, Clock, Eye, FileText, AlertTriangle, ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'

interface Article {
  id: string
  title: string
  author: string
  publishDate: string
  category: string
  content: string
  readTime: string
}

interface ArticleViewerProps {
  onExit: () => void
}

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Cybersecurity in 2024',
    author: 'Dr. Sarah Chen',
    publishDate: 'March 15, 2024',
    category: 'Technology',
    readTime: '8 min read',
    content: `
      <p class="lead">As we advance into 2024, the cybersecurity landscape continues to evolve at an unprecedented pace. Organizations worldwide are facing increasingly sophisticated threats that demand innovative defensive strategies.</p>

      <h2>Emerging Threat Vectors</h2>
      <p>The integration of artificial intelligence in cyberattacks has fundamentally changed how we approach security. Attackers are now leveraging machine learning algorithms to create more convincing phishing campaigns and to identify vulnerabilities in systems faster than ever before.</p>

      <p>One of the most concerning developments is the rise of AI-powered deepfake technology being used in social engineering attacks. These attacks are becoming so sophisticated that even security professionals struggle to identify them without advanced detection tools.</p>

      <h2>Zero-Trust Architecture</h2>
      <p>The concept of "never trust, always verify" has become the cornerstone of modern cybersecurity strategies. Organizations are moving away from perimeter-based security models toward zero-trust architectures that assume no implicit trust.</p>

      <blockquote>"In the current threat landscape, traditional security perimeters are obsolete. Every access request must be authenticated, authorized, and continuously validated." - NSA Cybersecurity Framework</blockquote>

      <h2>Quantum Computing Implications</h2>
      <p>While still in its infancy, quantum computing poses both opportunities and threats to cybersecurity. Current encryption methods may become vulnerable to quantum attacks, necessitating the development of quantum-resistant cryptographic algorithms.</p>

      <p>The National Institute of Standards and Technology (NIST) has already begun standardizing post-quantum cryptography standards, recognizing the urgent need for quantum-safe security measures.</p>

      <h2>Key Recommendations</h2>
      <ul>
        <li>Implement comprehensive employee training programs focusing on AI-enhanced threats</li>
        <li>Adopt zero-trust architecture principles across all organizational levels</li>
        <li>Begin transitioning to quantum-resistant encryption methods</li>
        <li>Establish incident response plans specifically designed for AI-powered attacks</li>
        <li>Invest in advanced threat detection systems that utilize machine learning</li>
      </ul>

      <p>The future of cybersecurity will require a fundamental shift in how we think about and implement security measures. Organizations that adapt early will be better positioned to protect their assets in an increasingly digital world.</p>
    `
  },
  {
    id: '2',
    title: 'Confidential: Advanced Encryption Techniques',
    author: 'Prof. Michael Rodriguez',
    publishDate: 'March 12, 2024',
    category: 'Security',
    readTime: '12 min read',
    content: `
      <p class="lead">This confidential document outlines advanced encryption methodologies currently under development by leading cryptographic research institutions.</p>

      <div class="alert">
        <strong>Classification:</strong> This document contains sensitive information regarding next-generation encryption protocols.
      </div>

      <h2>Lattice-Based Cryptography</h2>
      <p>Recent breakthroughs in lattice-based cryptographic systems have shown promising results for post-quantum security. These systems rely on the difficulty of solving certain mathematical problems in high-dimensional lattices.</p>

      <p>The Learning With Errors (LWE) problem forms the foundation of many lattice-based schemes. Current research indicates that these systems can provide security levels equivalent to AES-256 while remaining resistant to quantum attacks.</p>

      <h2>Homomorphic Encryption Advances</h2>
      <p>Fully homomorphic encryption (FHE) has reached a level of maturity that makes it practical for certain applications. Recent optimizations have reduced computational overhead by up to 75% compared to earlier implementations.</p>

      <code>
        def homomorphic_add(encrypted_a, encrypted_b, public_key):
            # Perform addition on encrypted values
            return (encrypted_a * encrypted_b) % public_key.n
      </code>

      <h2>Multi-Party Computation</h2>
      <p>Secure multi-party computation (MPC) protocols enable multiple parties to jointly compute a function over their inputs while keeping those inputs private. This technology is becoming crucial for privacy-preserving analytics.</p>

      <blockquote>"The ability to compute on encrypted data without decryption represents a paradigm shift in how we handle sensitive information." - International Cryptography Research Group</blockquote>

      <h2>Implementation Considerations</h2>
      <p>When implementing these advanced encryption techniques, organizations must consider:</p>

      <ul>
        <li>Computational overhead and performance implications</li>
        <li>Key management complexity in quantum-resistant systems</li>
        <li>Compatibility with existing infrastructure</li>
        <li>Regulatory compliance requirements</li>
        <li>Long-term maintenance and updates</li>
      </ul>

      <h2>Future Research Directions</h2>
      <p>Current research focuses on developing hybrid systems that combine the strengths of different cryptographic approaches. These systems aim to provide quantum resistance while maintaining practical performance characteristics.</p>

      <p>The integration of machine learning with cryptographic protocols also shows promise for adaptive security systems that can respond to emerging threats in real-time.</p>

      <div class="warning">
        <strong>Security Notice:</strong> The techniques described in this document are experimental and should not be implemented in production systems without thorough security analysis.
      </div>
    `
  }
]

const ArticleViewer = ({ onExit }: ArticleViewerProps) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsExpired(true)
          toast.error('Session expired. Content is no longer accessible.')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    document.addEventListener('contextmenu', handleContextMenu)

    // Disable common screenshot shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.key === 'I')) ||
        (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault()
        toast.error('Screenshots are not allowed')
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <AlertTriangle className="mx-auto h-12 w-12 text-security-warning mb-4" />
            <h2 className="text-xl font-bold mb-2">Session Expired</h2>
            <p className="text-muted-foreground mb-4">
              This content is no longer accessible. View-once articles expire after the allocated time.
            </p>
            <Button onClick={onExit} variant="outline">
              Return to Access Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!selectedArticle) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-security-gradient bg-clip-text text-transparent">
                Secure Article Library
              </h1>
              <p className="text-muted-foreground">
                Select an article to view. Remember: each article can only be viewed once.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-security-subtle rounded-lg border">
                <Clock className="w-4 h-4 text-security-warning" />
                <span className="font-mono text-sm">{formatTime(timeRemaining)}</span>
              </div>
              <Button onClick={onExit} variant="outline" size="sm">
                Exit
              </Button>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {sampleArticles.map((article) => (
              <Card 
                key={article.id} 
                className="cursor-pointer hover:shadow-security-glow transition-all duration-300 group border-border/50 bg-card/50 backdrop-blur-sm"
                onClick={() => setSelectedArticle(article)}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      View Once
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Published on {article.publishDate}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Notice */}
          <Card className="border-security-warning/20 bg-security-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-security-warning mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-security-warning">Security Notice</h3>
                  <p className="text-sm text-muted-foreground">
                    These articles contain confidential information and are protected by view-once technology. 
                    After reading, the content will be permanently inaccessible. Screenshots and copying are disabled.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <Button 
            onClick={() => setSelectedArticle(null)} 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Library
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-security-subtle rounded-lg border">
              <Clock className="w-4 h-4 text-security-warning" />
              <span className="font-mono text-sm">{formatTime(timeRemaining)}</span>
            </div>
            <Button onClick={onExit} variant="outline" size="sm">
              Exit
            </Button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Article Header */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary">{selectedArticle.category}</Badge>
            <h1 className="text-4xl font-bold leading-tight">{selectedArticle.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <span>By {selectedArticle.author}</span>
              <span>{selectedArticle.publishDate}</span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {selectedArticle.readTime}
              </span>
            </div>
          </div>
          <Separator />
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-lg max-w-none prose-invert no-screenshot security-content"
          dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
        />

        {/* Footer */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              Content protected by View Once technology
            </div>
            <div className="text-sm text-muted-foreground">
              Article ID: {selectedArticle.id} • Viewed once
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleViewer