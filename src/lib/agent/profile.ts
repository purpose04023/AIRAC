export interface AriaProfile {
  name: string;
  niche: string;
  skills: string[];
  portfolioUrl: string;
  hourlyRate: number;
  bio: string;
}

export const defaultProfile: AriaProfile = {
  name: "User",
  niche: "Full-stack Developer",
  skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
  portfolioUrl: "",
  hourlyRate: 50,
  bio: "Experienced full-stack developer specializing in modern web applications and AI integrations.",
};
