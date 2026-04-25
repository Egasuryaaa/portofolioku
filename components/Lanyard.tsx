"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type LanyardProps = {
  id: string;
};

type LanyardResponse = {
  data: {
    discord_user: {
      id: string;
      username: string;
      avatar: string | null;
      global_name: string | null;
    };
    discord_status: "online" | "idle" | "dnd" | "offline";
    activities: Array<{
      name: string;
      state?: string;
      details?: string;
    }>;
  };
};

const DISCORD_CDN = "https://cdn.discordapp.com/avatars";

const statusStyles: Record<string, string> = {
  online: "bg-emerald-400",
  idle: "bg-amber-400",
  dnd: "bg-rose-400",
  offline: "bg-slate-500",
};

export default function Lanyard({ id }: LanyardProps) {
  const [data, setData] = useState<LanyardResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === "YOUR_DISCORD_USER_ID_HERE") {
      setLoading(false);
      return;
    }

    let ignore = false;

    const fetchPresence = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
        const json: LanyardResponse = await response.json();

        if (!ignore && json?.data) {
          setData(json.data);
        }
      } catch {
        if (!ignore) {
          setData(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchPresence();
    const interval = window.setInterval(fetchPresence, 30000);

    return () => {
      ignore = true;
      window.clearInterval(interval);
    };
  }, [id]);

  const displayName = useMemo(() => {
    return data?.discord_user.global_name ?? data?.discord_user.username ?? "Ega Surya Saputra";
  }, [data]);

  const avatar = useMemo(() => {
    if (!data?.discord_user.avatar) return null;
    return `${DISCORD_CDN}/${data.discord_user.id}/${data.discord_user.avatar}.png?size=256`;
  }, [data]);

  const currentActivity = data?.activities.find((item) => item.name !== "Custom Status");

  if (loading) {
    return (
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
        className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl"
      >
        <div className="h-44 animate-pulse rounded-2xl bg-white/10" />
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
      className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={displayName}
            className="h-14 w-14 rounded-2xl border border-white/20 object-cover"
          />
        ) : (
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/5 text-lg font-bold text-cyan-200">
            ESS
          </div>
        )}
        <div>
          <p className="font-heading text-lg font-semibold text-white">{displayName}</p>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-200">
            <span
              className={`h-2.5 w-2.5 rounded-full ${statusStyles[data?.discord_status ?? "offline"]}`}
            />
            <span className="capitalize">{data?.discord_status ?? "offline"}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Now Playing</p>
        {currentActivity ? (
          <>
            <p className="mt-2 text-sm font-semibold text-white">{currentActivity.name}</p>
            {currentActivity.details ? <p className="text-sm text-slate-300">{currentActivity.details}</p> : null}
            {currentActivity.state ? <p className="text-xs text-slate-400">{currentActivity.state}</p> : null}
          </>
        ) : (
          <p className="mt-2 text-sm text-slate-300">
            Set your Discord User ID in this component to show live presence from lanyard.rest.
          </p>
        )}
      </div>
    </motion.div>
  );
}
