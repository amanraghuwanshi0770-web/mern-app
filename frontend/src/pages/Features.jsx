function Features() {
  const features = [
    {
      icon: "🔍",
      title: "Smart Search",
      text: "Find anything quickly with our simple and powerful search feature.",
    },
    {
      icon: "⚡",
      title: "Fast Performance",
      text: "Enjoy a smooth and fast experience while using our website.",
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      text: "Your data and information are protected with secure technology.",
    },
    {
      icon: "📱",
      title: "Fully Responsive",
      text: "Our website works perfectly on mobile, tablet and desktop devices.",
    },
    {
      icon: "🛒",
      title: "Easy Shopping",
      text: "Browse products and manage your shopping experience easily.",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      text: "Get help whenever you need it with our support system.",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-header">
        <span>OUR FEATURES</span>

        <h1>
          Everything You Need
          <br />
          <strong>In One Place</strong>
        </h1>

        <p>
          Explore the powerful features that make our website
          simple, fast and easy to use.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>

            <h2>{feature.title}</h2>

            <p>{feature.text}</p>

            <a href="#">Learn More →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;

