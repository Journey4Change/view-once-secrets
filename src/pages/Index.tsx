import { useState } from 'react'
import PasswordEntry from '@/components/PasswordEntry'
import ArticleViewer from '@/components/ArticleViewer'

const Index = () => {
  const [hasAccess, setHasAccess] = useState(false)

  const handleAccessGranted = () => {
    setHasAccess(true)
  }

  const handleExit = () => {
    setHasAccess(false)
  }

  if (hasAccess) {
    return <ArticleViewer onExit={handleExit} />
  }

  return <PasswordEntry onAccessGranted={handleAccessGranted} />
};

export default Index;
