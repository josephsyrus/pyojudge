import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { useAuth } from "../contexts/AuthContext";

export function useStreak(): number | null {
  const { user } = useAuth();
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      setStreak(null);
      return;
    }
    apiClient
      .get<{ streak: number }>("/submissions/me/streak")
      .then(({ data }) => setStreak(data.streak))
      .catch(() => setStreak(null));
  }, [user?.id]);

  return streak;
}
