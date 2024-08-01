import { useState } from 'react';

const FaqSection = ({ faqs }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className='mx-auto max-w-7xl px-6 pb-8 sm:pb-24 sm:pt-12 lg:px-8 lg:py-32'>
      <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
        <div className='lg:col-span-4'>
          <h2 className='md:text-3xl text-2xl font-bold leading-10 tracking-tight text-gray-900'>
            Frequently Asked Questions
          </h2>
          <p className='mt-4 md:text-xl text-lg leading-7 text-gray-600'>
            Have another question? Contact us by <a href="mailto:sales@scougalrubber.com" className="text-blue-500 hover:text-yellow-600">email</a>.
          </p>
        </div>
        <div className='mt-12 lg:col-span-8 lg:mt-0'>
          <dl className='space-y-8 divide-y divide-gray-200'>
            {faqs.map((faq, index) => (
              <div key={faq.id} className='pt-6'>
                <dt className='text-lg'>
                  <button
                    onClick={() => toggleFaq(index)}
                    className='w-full flex justify-between items-start text-left text-gray-900'
                  >
                    <span className='font-medium'>{faq.question}</span>
                    <span className='ml-6 flex h-7 items-center'>
                      <span className={`text-2xl transform transition-transform duration-800 ${openFaqIndex === index ? 'rotate-0' : 'rotate-0'}`}>
                        {openFaqIndex === index ? '-' : '+'}
                      </span>
                    </span>
                  </button>
                </dt>
                <dd className={`mt-2 pr-12 overflow-hidden transition-all duration-800 ${openFaqIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                  <p className='text-base leading-7 text-gray-600'>
                    {faq.answer}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
