import { ArrowRight, CheckCircle, Gift } from 'lucide-react';

const ProductComparisonSection = () => {
    
    const scrollToItems = () => {
        const itemsSection = document.getElementById('items');
        if (itemsSection) {
          itemsSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 mb-8">
    <div className="max-w-7xl mx-auto">
      
      <div className="space-y-4 sm:space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Choosing the right product can be daunting, but this page is your guide to making informed choices. By providing a clear comparison of products, we empower you to evaluate features, prices, and benefits at a glance.
        </p>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-indigo-700 flex items-center">
            <ArrowRight className="mr-2" size={20} />
            Why Compare?
          </h3>
          <p className="text-gray-700">
            Comparing products side by side helps you understand the unique offerings of each option. With our detailed insights and visual representations, you can easily pinpoint the product that aligns with your needs and preferences.
          </p>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-indigo-700 flex items-center">
            <CheckCircle className="mr-2" size={20} />
            Make Confident Choices
          </h3>
          <p className="text-gray-700">
            Gone are the days of second-guessing your decisions. With our easy-to-navigate interface and comprehensive information, you'll feel equipped to choose the best product for you, whether it's for personal use or gifting.
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-base sm:text-lg font-medium text-indigo-800 mb-3 sm:mb-4">
            Dive in and discover the perfect fit for your needs today!
          </p>
          <button  onClick={scrollToItems} className="bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center mx-auto text-sm sm:text-base">
            <Gift className="mr-2" size={18} />
            Your Informed Choice Awaits
          </button>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ProductComparisonSection;