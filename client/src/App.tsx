import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import { Navbar } from "./components/navbar/Navbar";
import { ProblemListPage } from "./pages/ProblemListPage";
import { ProblemPage } from "./pages/ProblemPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SubmissionHistoryPage } from "./pages/SubmissionHistoryPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { AdminPage } from "./pages/AdminPage";
import { ProblemFormPage } from "./pages/ProblemFormPage";
import { FriendsPage } from "./pages/FriendsPage";
import { OAuthCallbackPage } from "./pages/OAuthCallbackPage";

import { useAuth } from "./contexts/AuthContext";

function AppShell() {
  const { user } = useAuth();
  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <div className="flex-1 min-h-0 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/problems" replace />} />
          <Route path="/problems" element={<ProblemListPage />} />
          <Route path="/problems/:slug" element={<ProblemPage />} />
          <Route path="/problems/:slug/submissions" element={<SubmissionHistoryPage />} />
          <Route path="/u/:username" element={<PublicProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/problems/new" element={<ProblemFormPage />} />
          <Route path="/admin/problems/:slug/edit" element={<ProblemFormPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/auth/callback" element={<OAuthCallbackPage />} />
          <Route
            path="/profile"
            element={
              user ? (
                <Navigate to={`/u/${user.username}`} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/problems" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
