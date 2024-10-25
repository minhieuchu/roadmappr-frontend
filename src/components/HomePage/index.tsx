import { HomePageContainer } from "@/components/HomePage/index.styles";
import { NavBar } from "@/components/NavBar";

export function HomePage() {
  return (
    <>
      <NavBar />
      <HomePageContainer>
        <div>
          <div className="product-description">
            <div>
              {`Create a step-by-step roadmaps to reach your goals.
            Roadmappr suggests actions, tracks progress,
            and adapts to your needs-keeping you focused and aligned every step of the way.`}
            </div>
          </div>
        </div>
      </HomePageContainer>
    </>
  );
}
