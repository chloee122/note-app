import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import {
  Footer,
  Main,
  LoginButton,
  Logo,
  NavBar,
} from "../styles/LandingPage.styled";
import Hero from "./Hero";
import useTopScroll from "../../hooks/useTopScroll";
import useAppContext from "../../hooks/useAppContext";

function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAppContext();
  const scrolled = useTopScroll();

  const openModal = () => {
    setShowAuthModal(true);
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };
  return (
    <>
      {showAuthModal && <AuthModal closeModal={closeModal} />}
      <NavBar $scrolled={scrolled}>
        <Logo>Jotly</Logo>
        {user ? (
          <p>Welcome, {user.name}</p>
        ) : (
          <LoginButton onClick={() => setShowAuthModal(true)}>
            Log In
          </LoginButton>
        )}
      </NavBar>
      <Main>
        <Hero openModal={openModal} />
      </Main>
      <Footer>
        <div>Privacy Policy</div>
        <div>Terms and Conditions</div>
      </Footer>
    </>
  );
}

export default LandingPage;
