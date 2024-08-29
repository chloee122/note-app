import { FiArrowRight } from "react-icons/fi";
import {
  ActionButton,
  Heading,
  HeroImage,
  HeroWrapper,
  IntroHeading,
} from "../styles/Hero.styled";
import noteTakingImage from "../../assets/images/note-landing-page.jpg";

interface HeroProps {
  openModal: () => void;
}

function Hero({ openModal }: HeroProps) {
  return (
    <HeroWrapper>
      <IntroHeading>
        <Heading>
          Organize the chaos, one note at a time 💡. Welcome to{" "}
          <span>Jotly</span>!
        </Heading>
        <p>
          The perfect place to store, organize, and act on your ideas,
          <br /> whenever and wherever inspiration strikes.
        </p>
        <ActionButton onClick={openModal}>
          Jot now
          <FiArrowRight />
        </ActionButton>
      </IntroHeading>
      <HeroImage>
        <img src={noteTakingImage} alt="Note taking image" />
      </HeroImage>
    </HeroWrapper>
  );
}

export default Hero;
