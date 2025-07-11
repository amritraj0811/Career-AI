import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const Footer = () => {
  const { isSignedIn, user } = useUser();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      setMessage('Please login to continue.');
      return;
    }

    const userEmail = user?.emailAddresses[0]?.emailAddress?.toLowerCase();
    const enteredEmail = email.trim().toLowerCase();

    if (enteredEmail !== userEmail) {
      setMessage('The entered email does not match your account email.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email-subscribe`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: userEmail }),
});


      const data = await res.json();

      if (res.ok) {
        setMessage('Subscribed successfully!');
        setEmail('');
      } else {
        setMessage(data.error || 'Subscription failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Try again later.');
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-950 border-t border-gray-800 py-12 px-6"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">CareerPath</h3>
            <p className="text-gray-400">
              Helping you navigate your career journey with the best pathways and resources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-gray-400">Subscribe to our newsletter for the latest career insights.</p>
            <form className="flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 bg-gray-900 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary w-full"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dull text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
            {message && <p className={`text-sm mt-2 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CareerPath. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-gray-500 hover:text-primary text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
