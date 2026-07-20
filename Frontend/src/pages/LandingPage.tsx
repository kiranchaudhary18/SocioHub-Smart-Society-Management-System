import { Hero } from "@/components/landing/Hero";
import { CinematicExperience } from "@/components/landing/CinematicExperience";
import { BentoStory } from "@/components/landing/BentoStory";
import { StoryExperience } from "@/components/landing/StoryExperience";
import { TransformationExperience } from "@/components/landing/TransformationExperience";
import { CommunitySuccess } from "@/components/landing/CommunitySuccess";
import { SmartHelpCenter } from "@/components/landing/SmartHelpCenter";
import { CinematicEnding } from "@/components/landing/CinematicEnding";

export default function LandingPage() {
  return (
    <>
      <div id="home"><Hero /></div>
      <div id="platform"><CinematicExperience /><BentoStory /></div>
      <div id="solutions"><StoryExperience /><TransformationExperience /></div>
      <div id="about"><CommunitySuccess /></div>
      <div id="resources"><SmartHelpCenter /></div>
      <div id="contact"><CinematicEnding /></div>
    </>
  );
}
