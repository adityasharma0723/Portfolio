"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Training from "@/components/sections/Training";
import Proof from "@/components/sections/Proof";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import CommandPalette from "@/components/CommandPalette";
import data from "@/content/data";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <CommandPalette
        contact={data.contact}
        projects={data.projects}
      />
      <Header owner={data.owner} contact={data.contact} />
      <main id="main-content">
        {/* Hero is full-width (handles its own container) */}
        <Hero
          data={{
            owner: data.owner,
            tagline: data.tagline,
            heroLede: data.heroLede,
            contact: data.contact,
            projects: data.projects,
          }}
        />

        {/* All other sections share the wide container */}
        <div className="container-wide">
          <Work projects={data.projects} />

          <hr className="border-line" />

          <Skills skillGroups={data.skillGroups} projects={data.projects} />

          <hr className="border-line" />

          <Training training={data.training} />

          <hr className="border-line" />

          <Proof
            certificates={data.certificates}
            achievements={data.achievements}
          />

          <hr className="border-line" />

          <Education education={data.education} />

          <hr className="border-line" />

          <Contact contact={data.contact} showPhone={data.SHOW_PHONE} />
        </div>
      </main>
      <Footer owner={data.owner} />
    </>
  );
}
