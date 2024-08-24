import styled from "styled-components";

export const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 84px);
  padding: 42px 0;
`;

export const HeroSection = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

export const IntroHeading = styled.div`
  max-width: 48rem;
  text-align: center;
  padding: 0 1.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Heading = styled.h1`
  font-size: 1.95rem;
  line-height: 2.25rem;

  @media (min-width: 640px) {
    font-size: 3rem;
    line-height: 1;
  }

  span {
    text-decoration: underline;
    color: #8063f7;
  }
`;

export const Description = styled.p`
  p {
    font-size: 1.1rem;
    font-weight: 550;
    line-height: 1.5rem;

    @media (min-width: 640px) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
  }
`;

export const ActionButton = styled.button`
  font-size: 1rem;
  font-weight: 550;
  padding: 0.6rem 1rem;
  background-color: black;
  color: white;
  border: 1px solid black;
  border-radius: 0.2rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

export const HeroImage = styled.div`
  height: 18.75rem;
  width: 100%;

  @media (min-width: 640px) {
    height: 24rem;
  }

  @media (min-width: 768px) {
    height: 35rem;
    width: 90%;
  }

  @media (min-width: 1042px) {
    width: 55rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
