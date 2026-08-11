import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { i as OutlineButton, r as Link$1, u as cn } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, h as require_jsx_runtime, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { C as Phone, N as Mail, pt as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as FAQS, t as BRAND } from "./constants-MbwHFMBp.mjs";
import { n as SectionWrapper } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-OT7eUp5v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-DhdArGg0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var EXTRA_FAQS = [
	{
		question: "What are the class timings at SkillStack?",
		answer: "Physical classes are held Monday through Friday in morning, afternoon, and evening batches. Each session lasts 2 hours. You can choose a batch that fits your schedule during enrollment."
	},
	{
		question: "Do you offer online classes?",
		answer: "Yes. Several of our programs are available fully online, including Python, Video Editing, UI/UX Design, and AI Tools. Online students get the same curriculum, mentorship, and certification as physical students."
	},
	{
		question: "What is the fee structure?",
		answer: "Our programs are competitively priced. Fees vary by course and duration. We offer flexible installment plans for longer programs. Contact us at " + BRAND.email + " or call " + BRAND.phone1 + " for detailed fee information."
	},
	{
		question: "Is there an admission test or interview?",
		answer: "No admission test is required. Enrollment is on a first-come, first-served basis. However, we do have limited seats per batch to ensure quality education and individual attention."
	},
	{
		question: "What happens if I miss a class?",
		answer: "Physical students can access recorded sessions and online resources to catch up. Our mentors are available during office hours for additional support. We encourage consistent attendance for the best learning outcomes."
	},
	{
		question: "Do you provide job placement assistance?",
		answer: "Yes. We provide career guidance including resume building, portfolio review, interview preparation, and freelancing guidance. While we do not guarantee job placement, our graduates have successfully secured positions in the tech industry."
	},
	{
		question: "Can I switch between courses after enrolling?",
		answer: "You can request a course transfer within the first two weeks of enrollment, subject to seat availability. After the first two weeks, transfers are evaluated on a case-by-case basis."
	},
	{
		question: "What tools and software do I need?",
		answer: "Each course has specific software requirements. Web Development students need a laptop with Node.js installed. Graphic Design students need Adobe Creative Suite. We provide a detailed requirements list upon enrollment and assist with setup."
	}
];
function FAQPage() {
	const allFaqs = [...FAQS, ...EXTRA_FAQS];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Help Center",
		title: "Frequently Asked",
		highlight: "Questions",
		subtitle: "Everything you need to know about SkillStack programs, enrollment, certification, and more."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl mx-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			type: "single",
			collapsible: true,
			className: "flex flex-col gap-4",
			children: allFaqs.map((faq, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: `item-${index}`,
				className: "glass-card rounded-2xl px-6 border border-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
					className: "text-left text-lg font-display font-semibold text-white hover:text-[var(--gold)] transition-colors py-6",
					children: faq.question
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
					className: "text-[var(--color-text-secondary)] text-base leading-relaxed pb-6",
					children: faq.answer
				})]
			}, index))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 24
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: { once: true },
		className: "max-w-2xl mx-auto mt-20 text-center glass-card rounded-3xl p-10 md:p-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-2xl md:text-3xl font-display font-bold text-white mb-4",
				children: "Still Have Questions?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[var(--color-text-secondary)] text-lg mb-8",
				children: "Our admissions team is here to help. Reach out and we'll get back to you within 24 hours."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-4 justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: "/contact",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OutlineButton, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" }), " Contact Us"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "tel:" + BRAND.phone1.replace(/\s/g, ""),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold bg-[var(--gold)] text-black shadow-glow-sm hover:shadow-glow-md hover:bg-[var(--gold-hover)] transition-all duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-5 h-5" }), " Call Us"]
					})
				})]
			})
		]
	})] })] });
}
var SplitComponent = FAQPage;
//#endregion
export { SplitComponent as component };
