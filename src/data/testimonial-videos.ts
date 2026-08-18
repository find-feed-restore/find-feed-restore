export type TestimonialVideo = {
  id: string;
  start?: number;
  eyebrow: string;
  title: string;
  description: string;
  thumbnail: string;
};

export const clientTestimonialVideos: TestimonialVideo[] = [
  {
    id: "pLxLVhRZUso",
    eyebrow: "Client Testimonial",
    title: "Brittney’s Story",
    description: "Hear Brittney share her experience with Find, Feed & Restore.",
    thumbnail: "/images/editorial/testimonials/pLxLVhRZUso.jpg",
  },
  {
    id: "4AtAVDaScBI",
    eyebrow: "Client Testimonial",
    title: "Alliania’s Story",
    description: "Hear Alliania share her experience with Find, Feed & Restore.",
    thumbnail: "/images/editorial/testimonials/4AtAVDaScBI.jpg",
  },
  {
    id: "SFWs27dkzeM",
    eyebrow: "Client Testimonial",
    title: "Andre’s Story",
    description: "Hear Andre share his experience with Find, Feed & Restore.",
    thumbnail: "/images/editorial/testimonials/SFWs27dkzeM.jpg",
  },
];

export const testimonialVideos: TestimonialVideo[] = [
  ...clientTestimonialVideos,
  {
    id: "xEHiFubpcks",
    eyebrow: "Program Spotlight",
    title: "Housing First",
    description: "See how Housing First helps families move toward stability and self-sufficiency.",
    thumbnail: "/images/editorial/testimonials/xEHiFubpcks.jpg",
  },
  {
    id: "kyG14I1jJDg",
    eyebrow: "Media Feature",
    title: "Find Feed Restore On Channel 6 News",
    description: "Watch Channel 6 News highlight Find Feed Restore’s work with homeless families and children.",
    thumbnail: "/images/editorial/testimonials/kyG14I1jJDg.jpg",
  },
  {
    id: "7VC1Sl9h0VI",
    eyebrow: "Care Coach",
    title: "Back To School Event 2022",
    description: "See the Care Coach and community partners support families at the 2022 back-to-school event.",
    thumbnail: "/images/editorial/testimonials/7VC1Sl9h0VI.jpg",
  },
  {
    id: "8_yZI7EGC84",
    eyebrow: "Community Education",
    title: "Hunger And Housing Simulation",
    description: "Experience a community simulation focused on the realities of hunger and housing instability.",
    thumbnail: "/images/editorial/testimonials/8_yZI7EGC84.jpg",
  },
];
