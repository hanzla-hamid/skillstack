import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as LegalPage } from "./LegalPage-Cg7CC2zT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/refund-policy-BIo3ffVJ.js
var import_jsx_runtime = require_jsx_runtime();
var sections = [
	{
		heading: "Refund Eligibility",
		body: [
			"SkillStack offers a limited refund policy to ensure student satisfaction while accounting for the resources invested in course delivery.",
			"Students may request a full refund within 7 days of enrollment, provided they have attended no more than 2 class sessions and have not accessed more than 20% of the course materials.",
			"After the 7-day window or the session/material access threshold, refunds are evaluated on a case-by-case basis."
		]
	},
	{
		heading: "Non-Refundable Scenarios",
		body: [
			"Refunds will not be issued if the student has attended more than 2 class sessions or accessed more than 20% of the course materials.",
			"Refunds are not available for students who have been dismissed due to academic dishonesty, code of conduct violations, or disciplinary action.",
			"Refunds are not available for courses that have been completed or are more than 50% through the program duration.",
			"Installment plan payments already made are non-refundable once the refund eligibility window has passed."
		]
	},
	{
		heading: "How to Request a Refund",
		body: [
			"To request a refund, contact us at our official email address with your full name, enrolled course, enrollment date, and reason for the refund request.",
			"Refund requests are reviewed within 5 business days. Approved refunds are processed within 14 business days to the original payment method.",
			"If your refund request is denied, you will receive a written explanation. You may appeal the decision once within 7 days of receiving the denial."
		]
	},
	{
		heading: "Course Cancellation by SkillStack",
		body: [
			"If SkillStack cancels a course before it begins, all enrolled students will receive a full refund or the option to transfer to another program.",
			"If a course is cancelled mid-program, students will receive a prorated refund based on the percentage of the course completed.",
			"SkillStack is not liable for indirect costs such as travel, accommodation, or equipment purchased for the course."
		]
	},
	{
		heading: "Special Circumstances",
		body: ["Medical emergencies with supporting documentation may qualify for a prorated refund or course deferral, subject to review.", "Relocation or job transfer does not automatically qualify for a refund but may be considered for online course transfer where available."]
	}
];
function RefundPolicyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalPage, {
		title: "Refund",
		highlight: "Policy",
		eyebrow: "Legal",
		lastUpdated: "August 2026",
		sections
	});
}
var SplitComponent = RefundPolicyPage;
//#endregion
export { SplitComponent as component };
