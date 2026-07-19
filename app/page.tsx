import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ChatStory from "@/components/sections/ChatStory";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyUs from "@/components/sections/WhyUs";
import ContactForm from "@/components/sections/ContactForm";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ChatStory />
      <Services />
      <HowItWorks />
      <WhyUs />
      <ContactForm />
      <Contact />
      <Footer />
    </main>
  );
}
