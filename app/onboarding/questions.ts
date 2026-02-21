export type QuestionType = "single_select" | "multi_select";

export type Option = {
  id: string;
  label: string;
  description?: string;
};

export type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
  helpText?: string;

  required?: boolean;
  maxSelections?: number;

  options?: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: "event_intent",
    type: "multi_select",
    prompt: "What kinds of events are you looking for?",
    helpText: "We'll prioritize these.",
    required: true,
    maxSelections: 5,
    options: [
      {
        id: "learn",
        label: "Learn 📚",
        description: "Talks, lectures, panels, seminars",
      },
      {
        id: "build",
        label: "Build 🔨",
        description: "Hackathons, workshops, maker events",
      },
      {
        id: "fun",
        label: "Fun 🍾",
        description: "Social events, performances, entertainment",
      },
      {
        id: "career",
        label: "Career 💼",
        description: "Recruiting, info sessions, resume events",
      },
      {
        id: "network",
        label: "Network 🤝",
        description: "Mixers, club socials, community events",
      },
      {
        id: "wellness",
        label: "Wellness 🏃",
        description: "Fitness, meditation, mental health events",
      },
    ],
  },
  {
    id: "topics",
    type: "multi_select",
    prompt: "What topics should we prioritize?",
    helpText: "Pick up to 6.",
    required: true,
    maxSelections: 6,
    options: [
      { id: "ai_data", label: "AI / Datascience" },
      { id: "swe_build", label: "Software / Building" },
      { id: "robotics", label: "Robotics" },
      { id: "cybersecurity", label: "Cybersecurity" },
      { id: "design", label: "Design" },
      { id: "startups", label: "Startups" },
      { id: "biz_finance", label: "Business / Finance" },

      { id: "health_bio", label: "Health / Bio" },

      { id: "social_mixers", label: "Social Mixers" },
      { id: "games_esports", label: "Games / Esports" },
      { id: "food_drink", label: "Food / Drink" },
      { id: "culture_identity", label: "Culture / Identity" },
    ],
  },
  {
    id: "crowd_size",
    type: "single_select",
    prompt: "How many people should be there?",
    required: true,
    options: [
      { id: "small", label: "Small", description: "< 20 people" },
      { id: "medium", label: "Medium", description: "20-100 people" },
      { id: "large", label: "Large", description: "100+ people" },
      { id: "no_pref", label: "No preference" },
    ],
  },
  {
    id: "event_length",
    type: "single_select",
    prompt: "How long should it be?",
    required: true,
    options: [
      { id: "lt_1h", label: "< 1 hour" },
      { id: "1_2h", label: "1-2 hours" },
      { id: "half_day", label: "Half day" },
      { id: "full_day", label: "Full day" },
      { id: "no_pref", label: "No preference" },
    ],
  },
  {
    id: "time_of_day",
    type: "multi_select",
    prompt: "When do you usually want to go to events?",
    helpText: "Pick all that apply.",
    required: true,
    maxSelections: 4,
    options: [
      { id: "morning", label: "Morning", description: "Before noon" },
      { id: "afternoon", label: "Afternoon", description: "12-5pm" },
      { id: "evening", label: "Evening", description: "After 5pm" },
      { id: "late", label: "Late", description: "After 9pm" },
    ],
  },
];
