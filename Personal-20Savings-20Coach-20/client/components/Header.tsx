import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PiggyBank } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();

  const displayName =
    user?.name?.split(" ").filter(Boolean)[0] ||
    (user?.email ? user.email.split("@")[0] : "");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link
          to={user ? "/home" : "/"}
          className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity"
        >
          <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-2 flex items-center justify-center">
            <PiggyBank className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent font-bold text-lg">
            Savings Coach
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/chat"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Chat
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          {user ? (
            <>
              <span className="hidden sm:inline text-xs text-muted-foreground">
                {displayName}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-sm font-medium text-primary hover:underline"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-xs sm:text-sm font-semibold text-primary hover:underline"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
