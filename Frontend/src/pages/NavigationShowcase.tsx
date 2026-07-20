import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function NavigationShowcase() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-display-m font-heading"
        >
          Welcome to SocioHub
        </motion.h1>
        <p className="text-muted-foreground text-lg">
          This is a preview of the new Enterprise Navigation Shell.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card glass animated>
          <CardHeader>
            <CardTitle>Interactive Sidebar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Try clicking the collapse toggle button on the right edge of the sidebar. Notice how the icons smoothly slide and the active indicator minimizes beautifully.
            </p>
          </CardContent>
        </Card>

        <Card glass animated>
          <CardHeader>
            <CardTitle>Nested Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Click on the "Facilities" menu item in the sidebar to see the fluid height animation of the nested sub-menu items.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 rounded-2xl glass-strong border border-primary/20 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <h3 className="text-h4 font-heading">Ready for Package 2</h3>
        <p className="text-muted-foreground max-w-md">
          The next step will replace the placeholder Topbar above with a sticky glass header featuring Breadcrumbs, Global Search (Ctrl+K), and Profile Dropdowns.
        </p>
      </div>

    </div>
  )
}
