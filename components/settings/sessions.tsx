"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, Monitor } from "lucide-react";
import { useUser, useAuth, useClerk, useSessionList } from "@clerk/nextjs";
import { SessionWithActivitiesResource } from "@clerk/types";
import LoaderSpinner from "../loader/loader-spinner";
import { countryNames, CountryCode } from "@/types/countryNames";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export default function Sessions() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { toast } = useToast();
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const { sessions } = useSessionList();

  const [allSessions, setAllSessions] = useState<
    SessionWithActivitiesResource[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSessions = async () => {
    if (user) {
      const fetchedSessions = await user.getSessions();
      setAllSessions(fetchedSessions);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  if (!isLoaded || !userId || !user) {
    return <LoaderSpinner />;
  }

  const revokeUserSession = async (sessionId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/revoke-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to revoke session via API: ${errorData.error}`);
        return;
      }
      setAllSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== sessionId)
      );
      toast({
        title: "Success",
        description: "Session successfully removed and logged out.",
      });
      router.push("/settings");
    } catch (error) {
      console.error("Error revoking session via API", error);
    } finally {
      setLoading(false);
    }
  };

  const currentSessionId =
    sessions && sessions.length > 0 ? sessions[0].id : null;

  const currentSession = currentSessionId
    ? allSessions.find((session) => session.id === currentSessionId)
    : null;

  return (
    <div className="space-y-3 mt-6">
      <Card className="border border-[#6445E8]">
        <CardContent className="mt-4 text-muted-foreground text-sm">
          <Badge
            variant="outline"
            className="bg-[#6445E8]/5 text-[#6445E8] mb-4 px-4 max-w-[150px]"
          >
            Current Session:
          </Badge>

          {currentSession && currentSession.latestActivity ? (
            <div className="space-y-1.5">
              <p>
                <strong>Country:</strong>{" "}
                {currentSession.latestActivity.country
                  ? countryNames[
                      currentSession.latestActivity.country as CountryCode
                    ] || "Unknown"
                  : "Unknown"}
              </p>
              <p>
                <strong>IP Address:</strong>{" "}
                {currentSession.latestActivity.ipAddress}
              </p>
              <p>
                <strong>Browser:</strong>{" "}
                {currentSession.latestActivity.browserName}{" "}
                {currentSession.latestActivity.browserVersion}
              </p>
              <p>
                <strong>Mobile:</strong>{" "}
                {currentSession.latestActivity.isMobile ? "Yes" : "No"},{" "}
                {currentSession.latestActivity.deviceType}
              </p>
              <p>
                <strong>Last Active:</strong>{" "}
                {new Date(currentSession.lastActiveAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No active sessions found.</p>
          )}
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex h-44 items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <>
          {allSessions
            .sort((a, b) => {
              const isA = currentSessionId === a.id;
              const isB = currentSessionId === b.id;
              if (isA && !isB) return 1;
              if (!isA && isB) return -1;
              return 0;
            })
            .map((session) => (
              <Card
                key={session.id}
                className="flex items-center space-x-4 p-4"
              >
                {session.latestActivity && (
                  <>
                    <div>
                      {session.latestActivity.isMobile ? (
                        <Smartphone className="w-6 h-6 text-[#6445E8]" />
                      ) : (
                        <Monitor className="w-6 h-6 text-[#6445E8]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base font-medium">
                        {session.latestActivity.ipAddress}
                      </CardTitle>
                      <CardDescription className="mt-1 text-xs sm:text-sm">
                        {session.latestActivity.browserName}{" "}
                        {session.latestActivity.browserVersion}
                      </CardDescription>
                      <Badge className="bg-green-100 text-green-800 mt-2">
                        {session.status}
                      </Badge>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-1 gap-4">
                  <span className="hidden sm:block text-xs text-muted-foreground">
                    {new Date(session.lastActiveAt).toLocaleString()}
                  </span>
                  <span className="block sm:hidden text-xs text-muted-foreground">
                    {new Date(session.lastActiveAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                  </span>

                  {currentSessionId === session.id ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-500 hover:bg-red-500/90 text-white hover:text-white"
                      onClick={() => signOut({ redirectUrl: "/sign-in" })}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#6445E8] hover:bg-[#6445E8] hover:text-white"
                      onClick={() => revokeUserSession(session.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </Card>
            ))}
        </>
      )}
    </div>
  );
};