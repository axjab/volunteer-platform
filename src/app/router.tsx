import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ProgressPage from "../pages/ProgressPage";
import RewardsPage from "../pages/RewardsPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import CataloguePage from "../pages/CataloguePage";
import ProfilePage from "../pages/ProfilePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/catalogue" element={<CataloguePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}