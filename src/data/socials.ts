import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { IconType } from "react-icons";

export interface Social {
  name: string;
  href: string;
  icon: IconType;
}

export const socials: Social[] = [
  { name: "GitHub", href: "https://github.com/KaranRathod2003", icon: FaGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/karanrathod2003/", icon: FaLinkedinIn },
  { name: "Email", href: "mailto:kr04391@gmail.com", icon: HiOutlineMail },
];
