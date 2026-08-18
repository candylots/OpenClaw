import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Philosophy } from "@/components/philosophy";
import { Courses } from "@/components/courses";
import { Teachers } from "@/components/teachers";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Philosophy />
      <Courses />
      <Teachers />
      <Contact />
    </>
  );
}
