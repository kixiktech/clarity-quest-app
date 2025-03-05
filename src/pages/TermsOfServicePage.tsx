
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

const TermsOfServicePage: FC = () => {
  const navigate = useNavigate();
  const lastUpdated = "August 15, 2023";

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
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>

        <div className="text-sm text-muted-foreground mb-8">
          Last Updated: {lastUpdated}
        </div>

        <div className="space-y-8 text-foreground/90">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and ClarityQuest ("we," "our," or "us") governing your access to and use of our visualization application and related services (collectively, the "Service").
            </p>
            <p>
              By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not access or use our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, please stop using the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Eligibility</h2>
            <p>
              To use our Service, you must be at least 16 years of age. By using our Service, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are at least 16 years of age;</li>
              <li>You have the legal capacity to enter into these Terms;</li>
              <li>You will use the Service in accordance with these Terms;</li>
              <li>You will comply with all applicable laws and regulations.</li>
            </ul>
            <p>
              If you are using the Service on behalf of a company, organization, or other entity, you represent that you have the authority to bind that entity to these Terms, in which case "you" refers to that entity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Account Registration and Security</h2>
            <p>
              To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create a strong password and keep it confidential;</li>
              <li>Maintain the security of your account;</li>
              <li>Immediately notify us of any unauthorized use of your account or any other breach of security;</li>
              <li>Accept responsibility for all activities that occur under your account.</li>
            </ul>
            <p>
              We cannot and will not be liable for any loss or damage arising from your failure to comply with the above.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Acceptable Use</h2>
            <p>
              When using our Service, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable law, regulation, or these Terms;</li>
              <li>Infringe upon the rights of others or violate their privacy;</li>
              <li>Use the Service for illegal, fraudulent, or unauthorized purposes;</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service;</li>
              <li>Attempt to gain unauthorized access to the Service, other accounts, or computer systems;</li>
              <li>Transmit any viruses, worms, defects, Trojan horses, or other items of a destructive nature;</li>
              <li>Use the Service to harass, abuse, or harm another person or group;</li>
              <li>Use our Service for any harmful or objectionable purpose.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Intellectual Property Rights</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of ClarityQuest and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ClarityQuest.
            </p>
            <p>
              You retain any rights to content you create, upload, or share through our Service. By submitting or sharing content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content in any existing or future media formats for the purpose of providing and improving our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. User-Generated Content</h2>
            <p>
              Our Service may allow you to create, upload, or share content ("User Content"). You are solely responsible for your User Content and the consequences of sharing it. By providing User Content, you affirm, represent, and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You own or have the necessary licenses, rights, consents, and permissions to use and authorize us to use your User Content;</li>
              <li>Your User Content does not violate the privacy rights, publicity rights, copyrights, contractual rights, intellectual property rights, or any other rights of any person or entity;</li>
              <li>Your User Content does not contain material that is unlawful, obscene, defamatory, threatening, pornographic, harassing, hateful, or otherwise objectionable.</li>
            </ul>
            <p>
              We reserve the right to remove any User Content that violates these Terms or that we determine is inappropriate in our sole discretion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Subscription and Payments</h2>
            <p>
              Some aspects of the Service may be available for free, while others may require payment. If you choose a paid subscription:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You agree to pay all fees in accordance with the applicable subscription plan;</li>
              <li>Subscription fees are billed in advance on a recurring basis, depending on the type of subscription plan you select;</li>
              <li>Unless otherwise stated, subscriptions automatically renew for additional periods equal to the expiring subscription term, unless canceled before the end of the current period;</li>
              <li>You may cancel your subscription at any time through your account settings or by contacting us.</li>
            </ul>
            <p>
              All payments are non-refundable except as expressly set forth in these Terms or as required by applicable law. We reserve the right to change our prices at any time, with notice provided prior to implementation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Termination</h2>
            <p>
              We may terminate or suspend your account and access to our Service immediately, without prior notice or liability, for any reason, including, without limitation, if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or delete your account through the account settings.
            </p>
            <p>
              All provisions of the Terms that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">10. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>
            <p>
              CLARITYQUEST, ITS SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT WARRANT THAT:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION;</li>
              <li>ANY ERRORS OR DEFECTS WILL BE CORRECTED;</li>
              <li>THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS;</li>
              <li>THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">11. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CLARITYQUEST, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF, OR INABILITY TO USE, THE SERVICE.
            </p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CLARITYQUEST ASSUMES NO LIABILITY OR RESPONSIBILITY FOR:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>ANY ERRORS, MISTAKES, OR INACCURACIES OF CONTENT;</li>
              <li>PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO OR USE OF OUR SERVICE;</li>
              <li>ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY PERSONAL INFORMATION STORED THEREIN;</li>
              <li>ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICE;</li>
              <li>ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH OUR SERVICE BY ANY THIRD PARTY;</li>
              <li>ANY CONTENT OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">12. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless ClarityQuest, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your violation of these Terms;</li>
              <li>Your User Content;</li>
              <li>Your use of the Service;</li>
              <li>Your violation of any rights of another person or entity.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">13. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">14. Dispute Resolution</h2>
            <p>
              Any disputes arising out of or related to these Terms or the Service shall be resolved as follows:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Informal Resolution:</strong> We encourage you to contact us first to try to resolve any dispute informally.</li>
              <li><strong>Binding Arbitration:</strong> If informal resolution is unsuccessful, any dispute, controversy, or claim arising out of or relating to these Terms, including the validity, breach, or termination thereof, shall be settled by arbitration in accordance with the rules of the American Arbitration Association.</li>
              <li><strong>Arbitration Location:</strong> The arbitration shall take place in Wilmington, Delaware, and shall be conducted in English.</li>
              <li><strong>Individual Capacity:</strong> You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">15. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any other legal notices published by us on the Service, constitute the entire agreement between you and ClarityQuest concerning the Service and supersede all prior or contemporaneous communications and proposals, whether electronic, oral, or written, between you and ClarityQuest with respect to the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">16. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By email: legal@clarityquest.io</li>
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

export default TermsOfServicePage;
