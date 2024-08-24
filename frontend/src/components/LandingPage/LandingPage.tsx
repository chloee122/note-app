import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import noteTakingImage from "../../assets/images/note-landing-page.jpg";
import {
  LandingPageWrapper,
  HeroSection,
  IntroHeading,
  Heading,
  Description,
  ActionButton,
  HeroImage,
} from "../styles/LandingPage.styled";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <LandingPageWrapper>
      <HeroSection>
        <IntroHeading>
          <Heading>
            Organize the chaos, one note at a time 💡. Welcome to{" "}
            <span>Jotly</span>!
          </Heading>
          <Description>
            The perfect place to store, organize, and act on your ideas,
            <br /> whenever and wherever inspiration strikes.
          </Description>
          <ActionButton onClick={() => navigate("/auth")}>
            Jot now
            <FiArrowRight />
          </ActionButton>
        </IntroHeading>
        <HeroImage>
          <img src={noteTakingImage} alt="Note taking image" />
        </HeroImage>
      </HeroSection>
    </LandingPageWrapper>
  );
}

export default LandingPage;
