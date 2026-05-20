import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import {
  LogoCloud,
  Comparison,
  Timeline,
  MorningInbox,
  Deliverables,
  Governance,
  Integrations,
  ROI,
  Vision,
  FinalCTA,
  Footer,
} from '@/components/sections';

export default function Home() {
  return (
    <main id="main">
      <Nav />
      <Hero />
      <LogoCloud />
      <Comparison />
      <Timeline />
      <MorningInbox />
      <Deliverables />
      <Governance />
      <Integrations />
      <ROI />
      <Vision />
      <FinalCTA />
      <Footer />
    </main>
  );
}
