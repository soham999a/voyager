'use client';

import { motion } from 'framer-motion';
import { Star, Award, Rocket } from 'lucide-react';

const crewMembers = [
  {
    name: "Commander Sarah Chen",
    role: "Station Commander",
    experience: "15 years NASA",
    specialties: ["Station Operations", "Emergency Response", "Crew Leadership"],
    bio: "Former ISS commander with over 400 days in space. Expert in orbital mechanics and space station operations.",
    image: "/crew-sarah.jpg"
  },
  {
    name: "Dr. Marcus Rodriguez",
    role: "Chief Medical Officer",
    experience: "12 years Space Medicine",
    specialties: ["Zero-G Medicine", "Emergency Surgery", "Psychological Support"],
    bio: "Leading expert in space medicine with extensive research in zero-gravity health effects.",
    image: "/crew-marcus.jpg"
  },
  {
    name: "Captain Elena Volkov",
    role: "Flight Operations Director",
    experience: "18 years Roscosmos",
    specialties: ["Spacecraft Docking", "EVA Operations", "Navigation"],
    bio: "Veteran cosmonaut with 6 space missions and expertise in complex orbital maneuvers.",
    image: "/crew-elena.jpg"
  },
  {
    name: "Chef Antoine Dubois",
    role: "Executive Chef",
    experience: "20 years Michelin Star",
    specialties: ["Zero-G Cuisine", "Molecular Gastronomy", "Nutrition"],
    bio: "World-renowned chef pioneering the art of fine dining in zero gravity environments.",
    image: "/crew-antoine.jpg"
  },
  {
    name: "Dr. Yuki Tanaka",
    role: "Research Director",
    experience: "10 years JAXA",
    specialties: ["Microgravity Research", "Materials Science", "Earth Observation"],
    bio: "Leading researcher in microgravity sciences and Earth observation technologies.",
    image: "/crew-yuki.jpg"
  },
  {
    name: "Captain James Mitchell",
    role: "Safety & Security Chief",
    experience: "14 years Space Force",
    specialties: ["Station Security", "Emergency Protocols", "Risk Assessment"],
    bio: "Former Space Force officer specializing in orbital security and emergency response.",
    image: "/crew-james.jpg"
  }
];

const testimonials = [
  {
    name: "Dr. Amanda Foster",
    role: "Astrophysicist",
    rating: 5,
    text: "The most incredible experience of my life. Watching Earth from the observatory while enjoying a gourmet meal was absolutely magical.",
    image: "/guest-amanda.jpg"
  },
  {
    name: "Robert Kim",
    role: "Tech Entrepreneur",
    rating: 5,
    text: "Voyager Station exceeded every expectation. The zero-gravity sports were thrilling, and the crew was exceptional.",
    image: "/guest-robert.jpg"
  },
  {
    name: "Maria Santos",
    role: "Travel Blogger",
    rating: 5,
    text: "This isn't just a vacation - it's a life-changing journey. The views, the experience, the luxury - everything was perfect.",
    image: "/guest-maria.jpg"
  }
];

export default function CrewSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Crew Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-glow">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Meet Your Crew
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            Our expert team of astronauts, scientists, and hospitality professionals ensure your safety and comfort
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {crewMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-strong rounded-2xl p-4 sm:p-6 hover:glow-primary transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-lg sm:text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white text-center mb-2">
                {member.name}
              </h3>
              
              <div className="text-center mb-4">
                <p className="text-cyan-400 font-semibold">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.experience}</p>
              </div>

              <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed">
                {member.bio}
              </p>

              <div className="space-y-2">
                <h4 className="text-white font-semibold text-sm">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 text-glow">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Guest Experiences
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our pioneering guests who have experienced the ultimate luxury in space
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass rounded-2xl p-6 hover:glow-accent transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-lg font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-300 italic leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-strong rounded-2xl p-8 max-w-4xl mx-auto">
            <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
              Ready for Your Space Adventure?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join the select few who have experienced the ultimate luxury vacation. 
              Book your stay at Voyager Station and become part of space exploration history.
            </p>
            <motion.button
              className="btn-futuristic text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Award className="w-5 h-5 mr-2" />
              Reserve Your Suite Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
