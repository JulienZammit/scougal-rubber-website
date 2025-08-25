"use client";
import { motion } from "framer-motion";
import HeroAboutContact from "@/components/HeroAboutContact";
import Image from "next/image";
import { useState } from "react";

// Asset paths (update if filenames differ once uploaded)
const UNIVERSITY_ICON = "/logo/scougal-rubber-university.webp"; // placeholder
const MIXING_VIDEO = "/videos/mixing-a-batch.webm"; // placeholder

// Minimal, non-speculative neutral copy (client will supply more later)
const INTRO_TEXT = `A growing collection of short clips from our production floor. We’ll add more segments over time.`;

// Clips registry (extend as new clips are produced)
const CLIPS = [
    {
        id: "mixing",
        title: "Mixing",
        note: "Clip available",
        available: true,
        src: MIXING_VIDEO,
        poster: "/project/banner.webp",
    },
    {
        id: "molding",
        title: "Molding",
        note: "Coming soon",
        available: false,
    },
    {
        id: "inspection",
        title: "Inspection",
        note: "Coming soon",
        available: false,
    },
    {
        id: "finishing",
        title: "Finishing",
        note: "Coming soon",
        available: false,
    },
];

export default function BehindTheProcessClient() {
    const firstAvailable = CLIPS.find(c => c.available) || CLIPS[0];
    const [currentClip, setCurrentClip] = useState(firstAvailable);
    const [videoError, setVideoError] = useState(false);

    const selectClip = (clip) => {
        setCurrentClip(clip);
        setVideoError(false); // reset error per selection
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <HeroAboutContact
                backgroundImage="/project/banner.webp"
                title="Behind the Process"
                subtitle="Scougal Rubber University"
            />

            <div className="w-full max-w-7xl mx-auto px-4 md:px-12 -mt-10 md:-mt-24 relative z-10">
                <div className="bg-gradient-to-br from-white/85 to-white/70 dark:from-white/90 backdrop-blur-xl ring-1 ring-white/40 shadow-xl rounded-2xl p-6 md:p-14 mb-24 border border-slate-200/40">
                    {/* Intro */}
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 mb-14">
                        <div className="relative w-40 h-40 shrink-0">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-slate-600 via-blue-500 to-sky-400 opacity-70 blur-md" />
                            <div className="relative w-full h-full rounded-xl bg-white/90 flex items-center justify-center ring-1 ring-slate-200 overflow-hidden">
                                <Image
                                    src={UNIVERSITY_ICON}
                                    alt="Scougal Rubber University Icon"
                                    fill
                                    sizes="160px"
                                    className="object-contain p-3"
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                                {/* Fallback glyph */}
                                <span className="text-slate-600 font-semibold tracking-wide">SRU</span>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center md:text-left max-w-3xl"
                        >
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 bg-gradient-to-br from-slate-800 to-blue-600 text-transparent bg-clip-text">
                                Behind the Process
                            </h1>
                            <p className="text-slate-700 text-lg md:text-xl leading-relaxed">
                                {INTRO_TEXT}
                            </p>
                        </motion.div>
                    </div>

                    {/* Video / Clip Viewer */}
                    <div className="mb-20">
                        <div className="relative group">
                            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-slate-300 via-blue-300 to-sky-300 opacity-30 group-hover:opacity-45 blur-sm transition" />
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-black">
                                <div className="w-full aspect-video flex items-center justify-center bg-neutral-900">
                                    {currentClip.available ? (
                                        !videoError ? (
                                            <video
                                                key={currentClip.id}
                                                src={currentClip.src}
                                                className="w-full h-full object-cover"
                                                controls
                                                playsInline
                                                onError={() => setVideoError(true)}
                                                poster={currentClip.poster || "/project/banner.webp"}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-white/80 p-10">
                                                <p className="text-lg font-medium mb-2">Clip error</p>
                                                <p className="text-sm opacity-70">Could not load video file.</p>
                                            </div>
                                        )
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-white/80 p-10">
                                            <p className="text-lg font-medium mb-2">Not available yet</p>
                                            <p className="text-sm opacity-70">This clip will be added soon.</p>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute top-3 left-3 text-xs uppercase tracking-wide bg-black/70 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                    {currentClip.title}
                                </div>
                                <div className="absolute bottom-3 right-3 text-[11px] bg-white/85 text-slate-700 px-2.5 py-1 rounded shadow-sm border border-slate-200/60">Scougal Rubber University</div>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-slate-500 text-center">Select a tile below to switch clips. More coming soon.</p>
                    </div>

                    {/* Clip Selector Tiles */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {CLIPS.map((clip, i) => {
                            const selected = clip.id === currentClip.id;
                            return (
                                <motion.button
                                    type="button"
                                    key={clip.id}
                                    onClick={() => selectClip(clip)}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                                    className={`group relative text-left rounded-xl p-5 w-full border backdrop-blur-sm transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${selected
                                            ? "border-blue-500 bg-gradient-to-br from-white to-blue-50 shadow-md"
                                            : "border-slate-200 bg-white/95 hover:border-blue-400 hover:shadow-md hover:-translate-y-1"
                                        } ${!clip.available ? "opacity-75" : ""}`}
                                    aria-pressed={selected}
                                    aria-current={selected ? "true" : undefined}
                                    aria-label={`Select clip ${clip.title}${clip.available ? '' : ' (not available yet)'}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-sky-50/0 to-blue-100/0 opacity-0 group-hover:opacity-100 transition-colors duration-300 pointer-events-none" />
                                    <div className="relative flex items-start gap-3">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-md text-white text-xs font-medium shadow-sm ${clip.available
                                                ? (selected ? "bg-gradient-to-br from-blue-600 to-sky-500" : "bg-gradient-to-br from-blue-500 to-sky-400")
                                                : "bg-slate-300"
                                            }`}>
                                            {clip.available ? (
                                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12.5l4 4 10-10" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="9" />
                                                    <path d="M12 7v6l3 3" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-base font-semibold tracking-wide text-slate-800 mb-1 flex items-center flex-wrap gap-2">
                                                {clip.title}
                                                {!clip.available && (
                                                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 border border-slate-300 px-1.5 py-0.5 rounded bg-white/70">
                                                        Soon
                                                    </span>
                                                )}
                                                {selected && (
                                                    <span className="text-[10px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                                                        Active
                                                    </span>
                                                )}
                                            </h2>
                                            <p className={`text-[11px] leading-snug tracking-wide font-medium ${selected ? "text-blue-600" : "text-slate-500"
                                                }`}>
                                                {clip.available ? (selected ? "Now playing" : clip.note) : clip.note}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/0 via-blue-200/0 to-blue-300/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition duration-500" />
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="mt-20 text-center text-slate-600 text-sm">
                        <p>
                            Want something featured here? <a href="/contact-us" className="text-blue-600 hover:underline">Contact us</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
