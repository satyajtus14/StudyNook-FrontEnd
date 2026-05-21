const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: "🔍",
      title: "Browse Rooms",
      description: "Explore our available study and meeting rooms. Filter by capacity, amenities, and hourly rate."
    },
    {
      step: "02",
      icon: "📅",
      title: "Pick Your Time",
      description: "Choose your date, start time, and duration. We'll instantly check availability for you."
    },
    {
      step: "03",
      icon: "✅",
      title: "Confirm & Study",
      description: "Book instantly and receive confirmation. Show up and enjoy your private space."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-500 mt-2">
          Book your perfect study space in 3 simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
          >
            <span className="text-4xl mb-4">{item.icon}</span>
            <span className="text-xs font-bold text-cyan-500 mb-1">
              STEP {item.step}
            </span>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;