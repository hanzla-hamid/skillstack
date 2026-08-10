import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionComponents";
import { BRAND, FAQS } from "@/lib/constants";
import { Link } from "@/lib/router-compat";
import { OutlineButton } from "@/components/shared/buttons";
import { Mail, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EXTRA_FAQS = [
  {
    question: "What are the class timings at SkillStack?",
    answer:
      "Physical classes are held Monday through Friday in morning, afternoon, and evening batches. Each session lasts 2 hours. You can choose a batch that fits your schedule during enrollment.",
  },
  {
    question: "Do you offer online classes?",
    answer:
      "Yes. Several of our programs are available fully online, including Python, Video Editing, UI/UX Design, and AI Tools. Online students get the same curriculum, mentorship, and certification as physical students.",
  },
  {
    question: "What is the fee structure?",
    answer:
      "Our programs are competitively priced. Fees vary by course and duration. We offer flexible installment plans for longer programs. Contact us at " +
      BRAND.email +
      " or call " +
      BRAND.phone1 +
      " for detailed fee information.",
  },
  {
    question: "Is there an admission test or interview?",
    answer:
      "No admission test is required. Enrollment is on a first-come, first-served basis. However, we do have limited seats per batch to ensure quality education and individual attention.",
  },
  {
    question: "What happens if I miss a class?",
    answer:
      "Physical students can access recorded sessions and online resources to catch up. Our mentors are available during office hours for additional support. We encourage consistent attendance for the best learning outcomes.",
  },
  {
    question: "Do you provide job placement assistance?",
    answer:
      "Yes. We provide career guidance including resume building, portfolio review, interview preparation, and freelancing guidance. While we do not guarantee job placement, our graduates have successfully secured positions in the tech industry.",
  },
  {
    question: "Can I switch between courses after enrolling?",
    answer:
      "You can request a course transfer within the first two weeks of enrollment, subject to seat availability. After the first two weeks, transfers are evaluated on a case-by-case basis.",
  },
  {
    question: "What tools and software do I need?",
    answer:
      "Each course has specific software requirements. Web Development students need a laptop with Node.js installed. Graphic Design students need Adobe Creative Suite. We provide a detailed requirements list upon enrollment and assist with setup.",
  },
];

export default function FAQPage() {
  const allFaqs = [...FAQS, ...EXTRA_FAQS];

  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Everything you need to know about SkillStack programs, enrollment, certification, and more."
      />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {allFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-2xl px-6 border border-white/5"
              >
                <AccordionTrigger className="text-left text-lg font-display font-semibold text-white hover:text-[var(--gold)] transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--color-text-secondary)] text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-20 text-center glass-card rounded-3xl p-10 md:p-14"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-[var(--color-text-secondary)] text-lg mb-8">
            Our admissions team is here to help. Reach out and we'll get back to you within 24
            hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <OutlineButton className="flex items-center gap-2">
                <Mail className="w-5 h-5" /> Contact Us
              </OutlineButton>
            </Link>
            <a href={"tel:" + BRAND.phone1.replace(/\s/g, "")}>
              <span className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold bg-[var(--gold)] text-black shadow-glow-sm hover:shadow-glow-md hover:bg-[var(--gold-hover)] transition-all duration-300">
                <Phone className="w-5 h-5" /> Call Us
              </span>
            </a>
          </div>
        </motion.div>
      </SectionWrapper>
    </>
  );
}
