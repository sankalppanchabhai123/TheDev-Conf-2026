"use client";

import React, { useState, useEffect, useCallback } from "react";

const DecryptText = ({
  text,
  trigger,
  className,
}: {
  text: string;
  trigger: boolean;
  className?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(text);
  const [isRevealed, setIsRevealed] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const runScramble = useCallback(() => {
    setIsRevealed(false);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayValue(
        text
          .split("")
          .map((char, index) =>
            index < iteration
              ? text[index]
              : char === " "
              ? " "
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsRevealed(true);
      }
      iteration += 1 / 2;
    }, 80);
  }, [text]);

  useEffect(() => {
    if (!trigger) runScramble();
  }, [trigger, runScramble]);

  return (
    <span
      className={`inline-block transition-all duration-600 ease-out ${className} ${
        !isRevealed ? "blur-[1px] opacity-80" : "blur-0 opacity-100"
      }`}
    >
      {displayValue}
    </span>
  );
};

const SpeakerModal = ({
  speaker,
  onClose,
}: {
  speaker: typeof SPEAKERS[0] | null;
  onClose: () => void;
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [modalTrigger, setModalTrigger] = useState(true);

  useEffect(() => {
    if (speaker) {
      document.body.style.overflow = "hidden";
      setModalTrigger(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [speaker]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!speaker) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className={`relative max-w-4xl w-full bg-black border-[3px] border-blue-600 rounded-[2.5rem] overflow-hidden shadow-[20px_20px_0px_0px_rgba(37,99,235,0.5)] transition-all duration-500 my-8 ${
              isClosing ? "scale-90 translate-y-10" : "scale-100 translate-y-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center group"
            >
              <span className="text-xl md:text-2xl font-bold transform group-hover:rotate-90 transition-transform duration-300">
                ×
              </span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto md:h-full">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-10 bg-black text-white flex flex-col">
                <div className="mb-3 md:mb-4">
                  <DecryptText
                    text={speaker.company}
                    trigger={false}
                    className="text-blue-400 text-xs font-black tracking-widest uppercase"
                  />
                </div>

                <div className="mb-3 md:mb-4">
                  <DecryptText
                    text={speaker.name}
                    trigger={modalTrigger}
                    className="text-2xl md:text-4xl font-bold font-mono"
                  />
                </div>

                <p className="text-gray-400 text-sm mb-6 md:mb-8">
                  {speaker.title} |{" "}
                  <span className="text-yellow-400 font-semibold">
                    {speaker.topic}
                  </span>
                </p>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {speaker.about}
                </p>

                <h4 className="text-blue-400 text-sm font-bold mb-3 tracking-wider">
                  [ CONNECT ]
                </h4>

                <div className="flex gap-3">
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border rounded-full text-sm border-gray-800 hover:border-blue-600 transition"
                    >
                      LinkedIn
                    </a>
                  )}
                  {speaker.instagram && (
                    <a
                      href={speaker.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border rounded-full text-sm border-gray-800 hover:border-pink-600 transition"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SPEAKERS = [
  {
    id: 1,
    name: "Mahaveer Muttha",
    title: "Co-founder & Organizer GDG Pune",
    company: "Birdvision",
    image: "/mahaveer2.png",
    topic: "Event Strategy & Community Building",
    category: "Community",
    experience: "12+ yrs",
    linkedin: "https://www.linkedin.com/in/mahaveer-muttha/",
    instagram: "",
    about:
      "Mahaveer leads the GDG Pune community with passion, organizing events that bring developers together.",
  },
  {
    id: 2,
    name: "Arsh Goyal",
    title: "Sr Software Engineer",
    company: "Samsung India",
    image: "/arshgoyal2.png",
    topic: "Tech Career & Interview Prep",
    category: "Web",
    experience: "8+ yrs",
    linkedin: "https://www.linkedin.com/in/arshgoyal/",
    instagram: "https://www.instagram.com/arshgoyal.ai",
    about:
      "Arsh talks about career growth and interview readiness based on real industry experience.",
  },
  {
    id: 3,
    name: "Shubham Londhe",
    title: "Senior Developer Advocate",
    company: "Temporal Technologies",
    image: "/Shubham_Londhe.jpg",
    topic: "Distributed Systems & Cloud",
    category: "Cloud",
    experience: "10+ yrs",
    linkedin: "https://www.linkedin.com/in/shubhamlondhe1996/",
    instagram: "",
    about:
      "Shubham is a distributed system expert passionate about cloud-native tech.",
  },
  {
    id: 4,
    name: "Vivek Singh",
    title: "Sr Technical Leader",
    company: "Cisco System",
    image: "/Vivek_Singh.jpg",
    topic: "Customer Tech Experience",
    category: "Cloud",
    experience: "15+ yrs",
    linkedin: "https://linkedin.com/in/viveksingh",
    instagram: "",
    about:
      "Vivek focuses on customer-centric solutions and enterprise-level networking.",
  },
  {
    id: 5,
    name: "Shreya Dhurde",
    title: "AIOps Engineer",
    company: "Capgemini",
    image: "/Shreya_Dhurde2.png",
    topic: "AI Ops & Automation",
    category: "AI",
    experience: "5+ yrs",
    linkedin: "https://www.linkedin.com/in/shreya-dhurde/",
    instagram: "",
    about:
      "Shreya brings AI together with operations, focusing on automation and analytics.",
  },
  {
    id: 6,
    name: "Saurabh Mishra",
    title: "Lead Consultant",
    company: "TSYS",
    image: "/Sourabh_Mishra.jpg",
    topic: "Fintech & Scaling Systems",
    category: "Tech",
    experience: "11+ yrs",
    linkedin: "https://www.linkedin.com/in/connectsaurabhmishra/",
    instagram: "",
    about:
      "Saurabh specializes in fintech architecture and scalable solutions.",
  },
];

export default function SpeakerGrid() {
  const categories = ["All", "Community", "Web", "Cloud", "AI", "Tech"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<typeof SPEAKERS[0] | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const cardsPerPage = 4;

  const filtered = selectedCategory === "All"
    ? SPEAKERS
    : SPEAKERS.filter((s) => s.category === selectedCategory);

  const visibleSpeakers = filtered.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRotating && !selectedSpeaker) {
      interval = setInterval(() => triggerTransition(), 7000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [currentPage, isAutoRotating, selectedSpeaker, filtered]);

  const triggerTransition = () => {
    if (!isAutoRotating || selectedSpeaker) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(prev => (prev + 1) % Math.ceil(filtered.length / cardsPerPage));
      setIsTransitioning(false);
    }, 800);
  };

  const handleSpeakerClick = (speaker: typeof SPEAKERS[0]) => {
    setIsAutoRotating(false);
    setSelectedSpeaker(speaker);
  };

  const handleCloseModal = () => {
    setSelectedSpeaker(null);
    setIsAutoRotating(true);
  };

  return (
    <>
      <main id="speakers" className="min-h-screen bg-white p-6 md:p-12 font-mono">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-black">
              OUR <span className="text-blue-600">SPEAKERS</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide">
              Learn from industry experts & thought leaders
            </p>
          </header>

          {/* FILTER BUTTONS */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(0); }}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SPEAKERS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {visibleSpeakers.map((speaker, index) => (
              <button
                key={speaker.id}
                onClick={() => handleSpeakerClick(speaker)}
                className={`relative group aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-in-out border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:scale-105 cursor-pointer ${
                  isTransitioning
                    ? "opacity-0 scale-90 translate-y-10"
                    : "opacity-100 scale-100 translate-y-0"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <img src={speaker.image} className="w-full h-full object-cover absolute inset-0" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <DecryptText
                    text={speaker.company}
                    trigger={isTransitioning}
                    className="text-blue-400 text-[11px] font-black uppercase tracking-widest mb-1"
                  />
                  <DecryptText
                    text={speaker.name}
                    trigger={isTransitioning}
                    className="text-white text-2xl font-bold leading-none mb-1"
                  />
                  <DecryptText
                    text={speaker.title}
                    trigger={isTransitioning}
                    className="text-gray-300 text-xs"
                  />
                  <span className="block text-yellow-400 text-[12px] font-semibold mt-1">
                    {speaker.topic}
                  </span>

                  <span className="block text-gray-400 text-[10px] uppercase mt-1">
                    {speaker.experience}
                  </span>
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-in-out ${speaker.borderColor}`}
                />
              </button>
            ))}
          </div>
        </div>
      </main>

      <SpeakerModal speaker={selectedSpeaker} onClose={handleCloseModal} />
    </>
  );
}