import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { SITE_BRAND_ONLINE, SITE_DEFAULT_EMAIL } from "../lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_BRAND_ONLINE} collects, uses, and protects your personal data under Nigeria's data protection laws.`,
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const DPO_EMAIL = SITE_DEFAULT_EMAIL;

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[70px]">
        <section
          className="py-16 md:py-20"
          style={{ background: "linear-gradient(135deg, #060F1C 0%, #0B1F3A 100%)" }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(200,144,42,0.15)",
                color: "#E8AE4A",
                border: "1px solid rgba(200,144,42,0.3)",
              }}
            >
              Legal
            </span>
            <h1
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Last updated: {new Date().toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="space-y-10 text-[0.95rem] leading-relaxed text-[#3D4F63]">
            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                1. Introduction
              </h2>
              <p>
                Welcome to {SITE_BRAND_ONLINE} (&ldquo;{SITE_BRAND_ONLINE}&rdquo; &ldquo;We&rdquo; &ldquo;Our&rdquo;
                &ldquo;Us&rdquo;) Privacy Notice. {SITE_BRAND_ONLINE} understands that you care much about your
                privacy, and is committed to protecting your personal data. This Privacy Notice describes how{" "}
                {SITE_BRAND_ONLINE} processes personal data and the rights available to you. Please read the entire
                Privacy Notice to understand how we process your personal data and the rights available to you.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                2. Data Protection Officer (DPO)
              </h2>
              <p>
                {SITE_BRAND_ONLINE} has, in compliance with the relevant laws, designated a data protection officer
                for you to contact if you have any questions concerning this Notice or our privacy practices. Our DPO
                can be reached via{" "}
                <a
                  href={`mailto:${DPO_EMAIL}`}
                  className="text-[#C8902A] underline underline-offset-2 hover:text-[#0B1F3A]"
                >
                  {DPO_EMAIL}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                3. Information We Collect About You
              </h2>
              <p>
                For the services we render and our events, we may collect personal data including names, contact
                address, telephone numbers, social media accounts, payment information, still and motion images,
                communication data such as email content and call logs, technical data such IP address, location
                data, log files and other relevant personal data.
              </p>
              <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-[#0B1F3A] mt-5 mb-2">
                Information About Other People
              </h3>
              <p>
                If you provide information to us about any person other than yourself, your employees, counterparties,
                your advisers or your suppliers, you must ensure that they understand how their information will be
                used, and that they have given their consent for you to disclose it to us and for you to allow us, and
                our outsourced service providers to use it.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                4. Sources We Collect Your Personal Data From
              </h2>
              <p>
                {SITE_BRAND_ONLINE} collects data directly from you when you correspond with us, fill physical or
                online form on our website, register for our events or enroll into our institute. We may also receive
                data from third party such as employers, service providers like Google, Zoom or social media or public
                registry.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                5. How We Use Your Personal Data
              </h2>
              <p>We process your personal data in order to achieve the following:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>
                  To provide services to you such as registration, incorporation, training, certification, events,
                  publication and content.
                </li>
                <li>
                  To register and grant you access to our live events, communicate with you about {SITE_BRAND_ONLINE}
                  &apos;s future events, publications and other services.
                </li>
                <li>To tailor our services to better suit your needs.</li>
                <li>
                  To perform contractual obligations between you and us or us and your company or firm.
                </li>
                <li>To comply with legal obligations</li>
                <li>To investigate, defend and exercise our legal rights.</li>
              </ul>
              <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-[#0B1F3A] mt-5 mb-2">
                Further Purpose
              </h3>
              <p>
                We will only process your personal data for the particular purposes for which we collected it. We will
                notify you and obtain your consent before using it for any further purpose that is not compatible with
                the original purpose.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                6. Legal Bases for Processing Your Personal Data
              </h2>
              <p>
                We may process your personal data on one or more lawful grounds depending on the specific purpose for
                which we are using your personal data. Kindly contact us if you need further details or clarity about
                the specific legal ground we are relying on to process your personal data where more than one ground
                has been stated. We will rely on any of the legal bases listed below depending on the processing
                activities:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>
                  We will ask you for your consent in certain processing activities especially where it involves a
                  collection of sensitive personal data. Where we obtain your consent, kindly note that you can
                  withdraw the consent at any time and we will comply by not further processing your personal data.
                </li>
                <li>
                  We may process your personal data in order to perform a contract you have entered with us or with
                  your company or take pre-contractual steps at your instruction.
                </li>
                <li>
                  We may rely on our legitimate interest to process your personal data in order to tailor our services
                  to suit your needs.
                </li>
                <li>We may process your personal data where the law mandates us to do so.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                7. What Constitutes Consent
              </h2>
              <p>
                We rely on consent in certain circumstances to process some of your personal data. Where we require
                your consent, ticking a yes/no box, endorsing your signature in a form or document, clicking accept
                button, stating express conformance will constitute consent.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                8. Whom Do We Share Your Personal Data With?
              </h2>
              <p>
                We may disclose your personal information to third parties such as online payment solutions, regulators,
                experts and consultants, third party service providers such data storage infrastructure provider,
                Google, Zoom, amongst others.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                9. Data Retention
              </h2>
              <p>
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes they
                were collected and where we are required to assert or defend against legal claims, pending the final
                adjudication of the claim. In some circumstances we will anonymise your personal data so that it can
                no longer be associated with you for research or statistical purposes, in which case we may use this
                information indefinitely without further notice to you. To learn more about our retention periods as
                established in our retention policy, please contact us.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                10. Principles of Data Protection
              </h2>
              <p>
                We are obligated to comply with data protection principles whenever we process your personal data and
                to inform you about these principles. These principles are:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>
                  We will inform you about the personal data we have about you, and the lawful basis for processing it.
                </li>
                <li>
                  We must use your personal data in a way you reasonably expect and in a manner that ensures
                  transparency, lawfulness, and fairness.
                </li>
                <li>
                  We will not use your personal data for any other reason that is not compatible with the reason we
                  collected it except we have informed you and relied on an appropriate lawful basis.
                </li>
                <li>
                  We will only collect personal data about you that is only necessary to meet the required purpose and
                  nothing more.
                </li>
                <li>We will only use your correct personal data in the course of our processing activities.</li>
                <li>
                  We will not store or keep your personal data in our custody beyond the period necessary to fulfil the
                  purpose for which it is collected.
                </li>
                <li>
                  We will ensure that your personal data in our custody is protected from unauthorized use, alteration
                  or corruption.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                11. Your Legal Rights
              </h2>
              <p>
                You have certain rights under the law which we respect and adhere to and which can be exercised by you
                at any time. However, note that these rights are not absolute and may only apply in certain
                circumstances. Your rights are as listed:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to request correction of your personal data</li>
                <li>Right to request the erasure of your personal data</li>
                <li>
                  Right to object to the processing of your personal data especially with regards to direct marketing
                </li>
                <li>
                  Right to request the restriction of processing of your personal data pending the rectification of
                  accuracy of your personal data
                </li>
                <li>
                  Right to request transfer of your personal data to another controller or to you
                </li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                12. Right to Complaint
              </h2>
              <p>
                Kindly note that you have the right to make a complaint at any time to the Nigeria Data Protection
                Commission (NDPC), the Regulator for data protection issues (
                <a
                  href="https://ndpc.gov.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8902A] underline underline-offset-2 hover:text-[#0B1F3A]"
                >
                  https://ndpc.gov.ng/
                </a>
                ) or approach competent court of law to enforce your data protection rights. We would, however,
                appreciate the chance to deal with your concerns before you approach the NDPC, so please contact us in
                the first instance.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                13. Changes to Our Privacy Notice
              </h2>
              <p>
                This privacy notice will be updated from time to time to reflect our processing activities and we will
                aim to notify you when this happens.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                14. Contact Details
              </h2>
              <p>
                Please address questions, comments and requests regarding this Notice to our DPO at{" "}
                <a
                  href={`mailto:${DPO_EMAIL}`}
                  className="text-[#C8902A] underline underline-offset-2 hover:text-[#0B1F3A]"
                >
                  {DPO_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>

          <p className="mt-12 pt-8 border-t text-sm" style={{ borderColor: "#E2E0D8", color: "#6B7A8D" }}>
            <Link
              href="/"
              className="text-[#C8902A] underline underline-offset-2 hover:text-[#0B1F3A] font-medium"
            >
              ← Back to home
            </Link>
          </p>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
