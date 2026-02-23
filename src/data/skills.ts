import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiGit,
  SiRedis,
  SiVercel,
  SiExpress,
  SiSocketdotio,
  SiJsonwebtokens,
  SiZod,
  SiMysql,
  SiPostman,
  SiFramer,
  SiMui,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export const skills: Skill[] = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Material UI", icon: SiMui, color: "#007FFF" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#ffffff" },
  { name: "Socket.IO", icon: SiSocketdotio, color: "#010101" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#FB015B" },
  { name: "Zod", icon: SiZod, color: "#3E67B1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
];
