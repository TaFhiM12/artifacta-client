import { motion } from "framer-motion";
import { Link } from "react-router";

const ConservationSuccessStories = () => {
  const successStories = [
    {
      title: "Venus de Milo",
      image: "https://example.com/venus-de-milo.jpg",
      description: "Careful restoration preserved this iconic Greek statue despite its missing arms",
      year: "1820",
      location: "Louvre Museum"
    },
    {
      title: "Mona Lisa",
      image: "https://example.com/mona-lisa.jpg",
      description: "Advanced climate control protects this masterpiece from deterioration",
      year: "1503",
      location: "Louvre Museum"
    },
    {
      title: "Dead Sea Scrolls",
      image: "https://example.com/dead-sea-scrolls.jpg",
      description: "Cutting-edge preservation techniques saved these ancient biblical texts",
      year: "1947",
      location: "Israel Museum"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-stone-100">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-amber-800"
        >
          Conservation Success Stories
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="h-48 bg-gray-200 rounded-t-lg mb-4 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-amber-700">
                {story.title}
              </h3>
              <p className="text-gray-700 mb-4">{story.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Discovered: {story.year}</span>
                <span>Location: {story.location}</span>
              </div>
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
          <Link to="/conservation-stories">
            <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer">
              Explore More Conservation Stories
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ConservationSuccessStories;