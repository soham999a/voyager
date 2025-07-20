'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Star, Rocket, Camera, Dumbbell, ChevronRight, ChevronLeft, Upload, Check } from 'lucide-react';
import { useBookingStore, suites, addons } from '@/store/useBookingStore';

export default function BookingFlow() {
  const {
    bookingData,
    currentStep,
    updateBookingData,
    nextStep,
    prevStep,
    getTotalPrice,
    getSelectedSuite,
    getSelectedAddons,
    completeBooking
  } = useBookingStore();

  const steps = [
    { number: 1, title: 'Choose Suite', description: 'Select your orbital accommodation' },
    { number: 2, title: 'Travel Dates', description: 'Pick your launch and return dates' },
    { number: 3, title: 'Add-ons', description: 'Enhance your space experience' },
    { number: 4, title: 'Profile', description: 'Create your space traveler profile' },
    { number: 5, title: 'Confirm', description: 'Review and confirm your booking' }
  ];

  const toggleAddon = (addonId: string) => {
    const newAddons = bookingData.addons.includes(addonId)
      ? bookingData.addons.filter(id => id !== addonId)
      : [...bookingData.addons, addonId];

    updateBookingData({ addons: newAddons });
  };

  const handleComplete = () => {
    completeBooking();
    // Here you would typically send the booking data to your backend
    console.log('Booking completed:', bookingData);
  };

  return (
    <section id="booking" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-glow">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Book Your Journey
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            Reserve your place among the stars with our simple booking process
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-4">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-max px-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                      : 'glass text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {step.number}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-12 lg:w-16 h-1 mx-1 sm:mx-2 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-cyan-400 to-purple-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="glass-strong rounded-2xl p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6">Choose Your Suite</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {suites.map((suite) => (
                    <motion.div
                      key={suite.id}
                      className={`glass rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                        bookingData.suite === suite.id ? 'ring-2 ring-cyan-400 glow-primary' : 'hover:glow-secondary'
                      }`}
                      onClick={() => updateBookingData({ suite: suite.id })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-400">Suite Image</span>
                      </div>
                      <h4 className="font-orbitron text-xl font-bold text-white mb-2">{suite.name}</h4>
                      <p className="text-gray-300 text-sm mb-4">{suite.description}</p>
                      <div className="space-y-2 mb-4">
                        {suite.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-400">
                            <Star className="w-3 h-3 mr-2 text-cyan-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="text-2xl font-bold text-cyan-400">
                        ${suite.price.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-orbitron text-2xl font-bold text-cyan-400 mb-6">Select Travel Dates</h3>
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Launch Date</label>
                      <input
                        type="date"
                        className="w-full glass rounded-lg p-3 text-white bg-transparent border border-cyan-400/30 focus:border-cyan-400 focus:outline-none"
                        value={bookingData.dates.checkin}
                        onChange={(e) => updateBookingData({
                          dates: { ...bookingData.dates, checkin: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Return Date</label>
                      <input
                        type="date"
                        className="w-full glass rounded-lg p-3 text-white bg-transparent border border-cyan-400/30 focus:border-cyan-400 focus:outline-none"
                        value={bookingData.dates.checkout}
                        onChange={(e) => updateBookingData({
                          dates: { ...bookingData.dates, checkout: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Number of Guests</label>
                    <select
                      className="w-full glass rounded-lg p-3 text-white bg-transparent border border-cyan-400/30 focus:border-cyan-400 focus:outline-none"
                      value={bookingData.guests}
                      onChange={(e) => updateBookingData({ guests: parseInt(e.target.value) })}
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num} className="bg-gray-800">{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-orbitron text-2xl font-bold text-cyan-400 mb-6">Enhance Your Experience</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {addons.map((addon) => (
                    <motion.div
                      key={addon.id}
                      className={`glass rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                        bookingData.addons.includes(addon.id) ? 'ring-2 ring-purple-400 glow-secondary' : 'hover:glow-primary'
                      }`}
                      onClick={() => toggleAddon(addon.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                            <Rocket className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{addon.name}</h4>
                            <p className="text-purple-400 font-bold">${addon.price.toLocaleString()}</p>
                          </div>
                        </div>
                        {bookingData.addons.includes(addon.id) && (
                          <Check className="w-6 h-6 text-green-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-orbitron text-2xl font-bold text-cyan-400 mb-6">Create Your Profile</h3>
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full glass rounded-lg p-3 text-white bg-transparent border border-cyan-400/30 focus:border-cyan-400 focus:outline-none"
                        value={bookingData.profile.name}
                        onChange={(e) => updateBookingData({
                          profile: { ...bookingData.profile, name: e.target.value }
                        })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full glass rounded-lg p-3 text-white bg-transparent border border-cyan-400/30 focus:border-cyan-400 focus:outline-none"
                        value={bookingData.profile.email}
                        onChange={(e) => updateBookingData({
                          profile: { ...bookingData.profile, email: e.target.value }
                        })}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Profile Photo</label>
                    <div className="glass rounded-lg p-6 border-2 border-dashed border-cyan-400/30 text-center">
                      <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Upload your photo for your galactic passport</p>
                      <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-orbitron text-2xl font-bold text-cyan-400 mb-6">Confirm Your Booking</h3>
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="glass rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-3">Suite Selection</h4>
                        {getSelectedSuite() && (
                          <div>
                            <p className="text-cyan-400 font-semibold">{getSelectedSuite().name}</p>
                            <p className="text-gray-300 text-sm">{getSelectedSuite().description}</p>
                            <p className="text-purple-400 font-bold mt-2">${getSelectedSuite().price.toLocaleString()}</p>
                          </div>
                        )}
                      </div>

                      <div className="glass rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-3">Travel Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Launch Date:</span>
                            <span className="text-cyan-400">{bookingData.dates.checkin || 'Not selected'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Return Date:</span>
                            <span className="text-cyan-400">{bookingData.dates.checkout || 'Not selected'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Guests:</span>
                            <span className="text-cyan-400">{bookingData.guests}</span>
                          </div>
                        </div>
                      </div>

                      {getSelectedAddons().length > 0 && (
                        <div className="glass rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-3">Add-ons</h4>
                          <div className="space-y-2">
                            {getSelectedAddons().map((addon) => (
                              <div key={addon.id} className="flex justify-between text-sm">
                                <span className="text-gray-300">{addon.name}</span>
                                <span className="text-purple-400">${addon.price.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="glass-strong rounded-lg p-6">
                      <h4 className="font-orbitron text-xl font-bold text-white mb-6">Booking Summary</h4>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-lg">
                          <span className="text-gray-300">Total Amount:</span>
                          <span className="text-cyan-400 font-bold">${getTotalPrice().toLocaleString()}</span>
                        </div>
                      </div>

                      <motion.button
                        onClick={handleComplete}
                        className="btn-futuristic w-full text-lg py-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Rocket className="w-5 h-5 mr-2" />
                        Complete Booking
                      </motion.button>

                      <p className="text-gray-400 text-xs text-center mt-4">
                        By completing this booking, you agree to our terms and conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 1
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white glass hover:glow-secondary'
              }`}
              whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </motion.button>

            <motion.button
              onClick={currentStep === 5 ? handleComplete : nextStep}
              disabled={currentStep === 5 && (!bookingData.suite || !bookingData.dates.checkin)}
              className="btn-futuristic flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep === 5 ? 'Complete Booking' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
