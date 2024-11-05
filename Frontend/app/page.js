import Image from "next/image";
import MealList from "@/components/MealList"

export default function Home() {
  return (
    <div className="main">
      <MealList />
    </div>
  );
}
