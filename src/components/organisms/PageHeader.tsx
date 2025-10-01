import { TypeAnimation } from "react-type-animation";

export default function PageHeader() {
  return (
    <header className="text-center my-8">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">
        NextWatch AI
      </h1>
      <TypeAnimation
        sequence={[
          "Find the next movie you should watch.",
          5000,
          "Upload a CSV file or search in the database.",
          5000,
        ]}
        wrapper="p"
        speed={50}
        repeat={Infinity}
        className="mt-2 text-text-secondary"
      />
    </header>
  );
}
