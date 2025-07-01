import { motion } from 'framer-motion';
import { FaMonument, FaScroll, FaMask, FaCog } from 'react-icons/fa';

const TimelineSection = () => {
  const discoveries = [
    { 
      year: "1799", 
      name: "Rosetta Stone", 
      description: "Key to deciphering Egyptian hieroglyphs",
      icon: <FaScroll className="text-amber-700 text-2xl" />,
      color: "bg-amber-100"
    },
    { 
      year: "1900", 
      name: "Antikythera Mechanism", 
      description: "Ancient Greek analog computer",
      icon: <FaCog className="text-amber-700 text-2xl" />,
      color: "bg-amber-50"
    },
    { 
      year: "1922", 
      name: "Tutankhamun's Tomb", 
      description: "Most intact pharaonic tomb ever found",
      icon: <FaMask className="text-amber-700 text-2xl" />,
      color: "bg-amber-100"
    },
    { 
      year: "1974", 
      name: "Terracotta Army", 
      description: "Clay warriors guarding Qin Shi Huang's tomb",
      icon: <FaMonument className="text-amber-700 text-2xl" />,
      color: "bg-amber-50"
    }
  ];

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-stone-100 md:to-amber-50 relative overflow-hidden mb-4">
      {/* Ancient paper texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-amber-800 font-serif"
        >
          <span className="md:border-b-2 border-amber-600 pb-2">Chronicles of Discovery</span>
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line with decorative ends */}
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-700 transform -translate-x-1/2">
            <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-amber-700 border-2 border-amber-800"></div>
            <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-amber-700 border-2 border-amber-800"></div>
          </div>
          
          {discoveries.map((discovery, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`mb-16 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start`}
            >
              <div className="w-1/2 px-6 py-2">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-lg shadow-lg ${discovery.color} border-l-4 ${index % 2 === 0 ? 'border-amber-600' : 'border-amber-500'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      {discovery.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-900 mb-1">{discovery.name}</h3>
                      <p className="text-amber-800">{discovery.description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="w-1/2 px-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center"
                >
                  <div className={`relative w-20 h-20 rounded-full ${index % 2 === 0 ? 'bg-amber-600' : 'bg-amber-700'} text-white flex items-center justify-center text-xl font-bold shadow-md`}>
                    {discovery.year}
                    {/* Decorative notch */}
                    <div className={`absolute ${index % 2 === 0 ? '-right-2' : '-left-2'} top-1/2 w-4 h-4 transform -translate-y-1/2 rotate-45 ${index % 2 === 0 ? 'bg-amber-100' : 'bg-amber-50'}`}></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-amber-100 rounded-full border border-amber-200">
            <span className="mr-2 text-amber-700">𓃭𓃮𓃯</span>
            <span className="text-amber-800 font-medium">More discoveries await...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;