export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  liveUrl?: string;
  sourceUrl?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "insight-sprint",
    title: "Insight Sprint",
    description:
      "A full-stack MERN productivity dashboard featuring task management with priorities and deadlines, habit tracking with streak analytics, and mood logging with sentiment-based insights. Integrated Gemini API for personalized productivity recommendations with secure JWT authentication.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    ],
    liveUrl: "https://insight-sprint-backend.vercel.app/",
    sourceUrl: "https://github.com/KaranRathod2003/Insight-Sprint",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Gemini API", "Tailwind CSS", "Material UI"],
  },
  {
    id: "busbook",
    title: "BusBook",
    description:
      "A real-time bus seat booking system that eliminates double-booking race conditions using WebSocket heartbeats and Redis TTL-based locking. Features dynamic route search, interactive seat selection, unique PNR generation, QR code digital tickets, and booking management.",
    images: [
      "/projects/busbooking/1.png",
      "/projects/busbooking/2.png",
      "/projects/busbooking/3.png",
      "/projects/busbooking/4.png",
      "/projects/busbooking/5.png",
      "/projects/busbooking/6.png",
      "/projects/busbooking/7.png",
    ],
    liveUrl: "https://bus-booking-app-nu.vercel.app/",
    sourceUrl: "https://github.com/KaranRathod2003/bus-booking-app",
    tags: ["React", "Node.js", "Express", "Socket.IO", "Redis", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "scaleguide-ai",
    title: "ScaleGuide AI",
    description:
      "An interactive decision-tree AI assistant that recommends Kubernetes scaling strategies (HPA, VPA, KEDA, Cluster Autoscaler) and deployment methodologies based on workload characteristics. All AI logic runs locally via deterministic decision trees with zero external API costs.",
    images: [
      "/projects/scaleguide-ai/1.png",
      "/projects/scaleguide-ai/2.png",
      "/projects/scaleguide-ai/3.png",
      "/projects/scaleguide-ai/4.png",
    ],
    liveUrl: "https://scale-guide.vercel.app/",
    sourceUrl: "https://github.com/KaranRathod2003/Scale-Guide",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "MDX"],
  },
];
