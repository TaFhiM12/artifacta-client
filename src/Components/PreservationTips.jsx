import { motion } from "framer-motion";
import { Link } from "react-router";

const PreservationTips = () => {
  const tips = [
    {
      title: "Proper Handling",
      icon: "👐",
      description:
        "Always wear gloves when handling artifacts to prevent oils from your skin causing damage.",
    },
    {
      title: "Climate Control",
      icon: "🌡️",
      description:
        "Maintain stable temperature and humidity to prevent material degradation.",
    },
    {
      title: "Light Exposure",
      icon: "💡",
      description:
        "Limit exposure to light, especially UV, which can fade colors and weaken materials.",
    },
  ];

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-stone-100 md:to-amber-50 ">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-amber-800"
        >
          Artifact Preservation Tips
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-amber-700">
                {tip.title}
              </h3>
              <p className="text-gray-700">{tip.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/preservation-guide">
            <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer">
              Learn More About Preservation
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PreservationTips;
