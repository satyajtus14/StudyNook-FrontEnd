const WhyChooseUs = () => {
  const features = [
    {
      icon: "🔒",
      title: "Private & Quiet",
      description: "All rooms are soundproofed and distraction-free, perfect for deep focus and concentration."
    },
    {
      icon: "⚡",
      title: "Instant Booking",
      description: "No waiting, no phone calls. Book your room online in seconds and get instant confirmation."
    },
    {
      icon: "💰",
      title: "Flexible Hourly Rates",
      description: "Only pay for the time you need. No long-term commitments or hidden fees."
    },
    {
      icon: "📶",
      title: "High-Speed WiFi",
      description: "Stay connected with blazing-fast internet available in every room."
    },
    {
      icon: "🖥️",
      title: "Premium Equipment",
      description: "Whiteboards, monitors, and conference tools available in selected rooms."
    },
    {
      icon: "🕐",
      title: "Flexible Hours",
      description: "Early bird or night owl — our rooms are available from early morning to late evening."
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Why Choose StudyNook?
          </h2>
          <p className="text-gray-500 mt-2">
            Everything you need for a productive session
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
            >
              <span className="text-3xl">{feature.icon}</span>
              <div>
                <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;