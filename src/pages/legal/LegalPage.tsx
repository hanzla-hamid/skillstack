import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionComponents";
import { BRAND } from "@/lib/constants";

interface LegalPageProps {
  title: string;
  highlight: string;
  eyebrow: string;
  lastUpdated: string;
  sections: { heading: string; body: string[] }[];
}

export const LegalPage = ({ title, highlight, eyebrow, lastUpdated, sections }: LegalPageProps) => {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} highlight={highlight} />
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-[var(--color-text-muted)] mb-12">
            Last updated: {lastUpdated}
          </p>
          <div className="flex flex-col gap-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <h2 className="text-2xl font-display font-semibold text-white mb-4">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-[var(--color-text-secondary)] text-base">
              Questions about this policy? Contact us at{" "}
              <a href={"mailto:" + BRAND.email} className="text-[var(--gold)] hover:underline">
                {BRAND.email}
              </a>{" "}
              or call{" "}
              <a
                href={"tel:" + BRAND.phone1.replace(/\s/g, "")}
                className="text-[var(--gold)] hover:underline"
              >
                {BRAND.phone1}
              </a>
              .
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};
