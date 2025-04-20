import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    pincode: '',
    whatsappUpdates: true,
    constructionWork: false,
    localPainter: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Need help with your painting needs?</h2>
          <p className="text-gray-600 mb-8">
            Fill the form below to book a free site evaluation by a HomeBuddy Beautiful Home Painting Service expert.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile*</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode*</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="whatsappUpdates"
                  name="whatsappUpdates"
                  checked={formData.whatsappUpdates}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="whatsappUpdates" className="ml-2 block text-sm text-gray-700">
                  Yes, I would like to receive important updates and notifications on WhatsApp
                </label>
              </div>

              <div className="space-y-4 mt-6">
                <p className="text-sm font-medium text-gray-700">Is any construction work going on at your house?</p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="constructionWork"
                      value="yes"
                      checked={formData.constructionWork}
                      onChange={() => setFormData(prev => ({ ...prev, constructionWork: true }))}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="constructionWork"
                      value="no"
                      checked={!formData.constructionWork}
                      onChange={() => setFormData(prev => ({ ...prev, constructionWork: false }))}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">Is there a local painter hired?</p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="localPainter"
                      value="yes"
                      checked={formData.localPainter}
                      onChange={() => setFormData(prev => ({ ...prev, localPainter: true }))}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="localPainter"
                      value="no"
                      checked={!formData.localPainter}
                      onChange={() => setFormData(prev => ({ ...prev, localPainter: false }))}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                ENQUIRE NOW
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 