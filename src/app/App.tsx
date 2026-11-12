import AppRouter from "./router";
import AppShell from "../components/layout/AppShell";

export default function App() {
  return (
    <AppShell>
      <AppRouter />
    </AppShell>
  );
}