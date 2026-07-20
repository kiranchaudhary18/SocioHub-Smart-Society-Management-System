import { Bell, Search, Command, ChevronRight } from "lucide-react"
import { useSession, useCurrentSociety } from "@/hooks/useSession"
import { useLocation, Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "@/components/ui/avatar"

export function Topbar() {
  const { user, logout } = useSession()
  const society = useCurrentSociety()
  const location = useLocation()
  
  // Simple breadcrumb generator from pathname
  const paths = location.pathname.split('/').filter(p => p)
  
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 glass z-30 sticky top-0">
      
      {/* Left: Breadcrumbs / Society Info */}
      <div className="flex items-center gap-4">
        {society && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {society.name}
          </div>
        )}

        <nav className="hidden sm:flex items-center text-sm font-medium text-muted-foreground">
          <Link to="/app" className="hover:text-foreground transition-colors">Home</Link>
          {paths.map((path, index) => (
            <div key={path} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
              <Link 
                to={`/${paths.slice(0, index + 1).join('/')}`}
                className={`capitalize transition-colors ${index === paths.length - 1 ? "text-foreground font-semibold" : "hover:text-foreground"}`}
              >
                {path.replace(/-/g, ' ')}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Search Trigger (Mock Command Palette) */}
        <button className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full border border-border bg-background/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors group">
          <Search className="w-4 h-4" />
          <span className="text-sm font-medium">Search...</span>
          <kbd className="inline-flex items-center gap-1 px-1.5 rounded bg-muted text-[10px] font-semibold text-muted-foreground group-hover:bg-background">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive animate-pulse border border-background" />
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar 
              src={user?.profilePictureUrl} 
              fallback={user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : "?"}
              className="w-8 h-8 ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-strong border-border/50">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={logout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}
