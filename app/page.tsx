"use client";
import useFetchData from "../hooks/useFetchData";
import HeroSection from "../components/HeroSection";
import LogoHeader from "../components/LogoHeader";

export default function Home() {
  useFetchData();

  return (
    <>
      <LogoHeader />
      <HeroSection />
    </>
  );
}
