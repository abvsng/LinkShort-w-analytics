import Lottie from "lottie-react";
import animationData from "../assets/404 Error - Doodle animation.json";

export default function ErrorPage() {
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <Lottie animationData={animationData} background="transparent" />
    </div>
  );
}