import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

const PrivacyPolicyPage: FC = () => {
  const navigate = useNavigate();
  const lastUpdated = "March 06, 2025";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        <div className="text-sm text-muted-foreground mb-8">
          Last Updated: {lastUpdated}
        </div>

        <div className="space-y-8 text-foreground/90">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to ClarityQuest ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our visualization application and related services (collectively, the "Service").
            </p>
            <p>
              By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our Service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> Information that identifies you, such as your name, email address, and any other information you provide when you register for an account, update your profile, or interact with our Service.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you access and use our Service, including your IP address, browser type, device information, pages visited, time spent on pages, and other diagnostic data.
              </li>
              <li>
                <strong>Visualization Data:</strong> Information you provide when creating visualizations, including goals, challenges, aspirations, and other personal information you choose to share.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information to enhance your experience.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing, maintaining, and improving our Service</li>
              <li>Processing your account registration and authentication</li>
              <li>Personalizing your experience with our Service</li>
              <li>Creating and storing your visualization exercises</li>
              <li>Analyzing usage patterns and trends to improve our Service</li>
              <li>Communicating with you about updates, features, or support</li>
              <li>Detecting, preventing, and addressing technical issues</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Data Retention</h2>
            <p>
              We will retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining how long to keep your data, we consider:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The amount, nature, and sensitivity of the personal data</li>
              <li>The potential risk of harm from unauthorized use or disclosure</li>
              <li>The purposes for which we process your personal data</li>
              <li>Whether we can achieve those purposes through other means</li>
              <li>Applicable legal, regulatory, tax, accounting, or other requirements</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
              <li>Secure data storage using industry-standard providers</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Access:</strong> The right to request copies of your personal data.</li>
              <li><strong>Right to Rectification:</strong> The right to request correction of inaccurate or incomplete information.</li>
              <li><strong>Right to Erasure:</strong> The right to request deletion of your personal data under certain circumstances.</li>
              <li><strong>Right to Restrict Processing:</strong> The right to request restriction of processing of your personal data.</li>
              <li><strong>Right to Data Portability:</strong> The right to receive your personal data in a structured, machine-readable format.</li>
              <li><strong>Right to Object:</strong> The right to object to our processing of your personal data.</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Cookies Policy</h2>
            <p>
              Our Service uses cookies and similar tracking technologies to track activity and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            <p>
              Types of cookies we use:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Necessary for the operation of our Service, such as session management and authentication.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Service.</li>
              <li><strong>Preference Cookies:</strong> Enable our Service to remember your preferences and settings.</li>
            </ul>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Third-Party Services</h2>
            <p>
              Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p>
              We may use third-party service providers to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facilitate our Service</li>
              <li>Provide the Service on our behalf</li>
              <li>Perform Service-related services</li>
              <li>Assist us in analyzing how our Service is used</li>
            </ul>
            <p>
              These third parties may have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Children's Privacy</h2>
            <p>
              Our Service is not intended for individuals under the age of 16 ("Children"). We do not knowingly collect personally identifiable information from Children. If you are a parent or guardian and you believe your Child has provided us with personal data, please contact us. If we become aware that we have collected personal data from Children without verification of parental consent, we take steps to remove that information from our servers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
            </p>
            <p>
              If you are located outside the United States and choose to provide information to us, please note that we transfer the data to the United States and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">11. GDPR Compliance</h2>
            <p>
              For users in the European Union (EU) and European Economic Area (EEA), we process your personal data in accordance with the General Data Protection Regulation (GDPR). Our legal bases for processing include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consent:</strong> Where you have given clear consent for us to process your personal data for a specific purpose.</li>
              <li><strong>Contract:</strong> Processing necessary for the performance of a contract with you.</li>
              <li><strong>Legal Obligation:</strong> Processing necessary for compliance with a legal obligation.</li>
              <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests, provided those interests are not overridden by your rights and freedoms.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">12. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, the California Consumer Privacy Act (CCPA) grants you specific rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to know what personal information we collect, use, disclose, and sell</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to opt-out of the sale of your personal information</li>
              <li>The right to non-discrimination for exercising your CCPA rights</li>
            </ul>
            <p>
              We do not sell your personal information. To exercise your rights under the CCPA, please contact us using the information provided in the "Contact Us" section.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">13. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">14. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By email: privacy@clarityquest.io</li>
              <li>By visiting the contact section on our website</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 mb-6 border-t border-border pt-6">
          <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to previous page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
