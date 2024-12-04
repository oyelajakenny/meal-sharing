import React from "react";
import MealList from "@/components/MealList";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Clients from "@/components/Trusted";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="main">
      <Hero />
      <MealList />
      <Newsletter />
      <Clients />
      <Footer />
    </div>
  );
}
