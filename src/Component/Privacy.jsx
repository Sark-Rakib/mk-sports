import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#aba65e]">
        Privacy Policy
      </h1>

      <p className="mb-4">
        At <strong>MK Sports</strong>, your privacy is very important to us. We
        are committed to protecting your personal information and ensuring
        transparency about how it is collected and used.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        Information We Collect
      </h2>
      <p className="mb-4">We may collect the following types of information:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Personal information such as name, email, and phone number.</li>
        <li>
          Order details, including products purchased and payment information.
        </li>
        <li>
          Information you provide via contact forms or newsletter subscriptions.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        Your information is used for the following purposes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To process and fulfill your orders.</li>
        <li>To communicate important updates or promotions.</li>
        <li>To improve our website and services based on user feedback.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Data Protection</h2>
      <p className="mb-4">
        We implement appropriate security measures to protect your personal data
        from unauthorized access, alteration, disclosure, or destruction.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Third-Party Services</h2>
      <p className="mb-4">
        We may share your data with trusted third-party services (such as
        payment processors and email providers) to provide and improve our
        services. We ensure these providers maintain strict data protection
        standards.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Cookies</h2>
      <p className="mb-4">
        Our website uses cookies to enhance your browsing experience, analyze
        traffic, and personalize content. You can manage cookies through your
        browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal
        information. If you wish to exercise any of these rights, please contact
        us at <strong>support@mksports.com</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this privacy policy periodically. Any changes will be
        posted on this page with the effective date.
      </p>

      <p className="mt-6">
        By using our website, you agree to the terms outlined in this Privacy
        Policy.
      </p>
    </div>
  );
};

export default Privacy;
