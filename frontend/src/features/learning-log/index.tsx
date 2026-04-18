import LearningFeed from "./pages/LearningFeed";

// Very straightforward routing for the Journal slice. Note: We abstract it through this layer 
// so the root App doesn't import deeply into component graphs directly.
export default function LearningLogRoutes() {
  return <LearningFeed />;
}
