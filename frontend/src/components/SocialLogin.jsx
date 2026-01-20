import React from 'react';
import { Chrome, Github, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function SocialLogin() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const socialProviders = [
    { name: 'Google', icon: <Chrome className="w-5 h-5" />, color: 'bg-red-500 hover:bg-red-600', provider: 'google' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, color: 'bg-gray-800 hover:bg-gray-900', provider: 'github' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, color: 'bg-blue-400 hover:bg-blue-500', provider: 'twitter' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'bg-blue-600 hover:bg-blue-700', provider: 'facebook' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'bg-blue-700 hover:bg-blue-800', provider: 'linkedin' }
  ];

  const handleSocialLogin = (provider) => {
    // Check if OAuth is configured
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login will be available once OAuth credentials are configured in .env file.\n\nFor now, please use email/password login.`);
    // Uncomment below when OAuth is configured:
    // window.location.href = `${API_URL}/api/auth/${provider}`;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => handleSocialLogin(provider.provider)}
            className={`${provider.color} text-white p-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center`}
            title={`Sign in with ${provider.name}`}
          >
            {provider.icon}
          </button>
        ))}
      </div>

      <p className="text-xs text-center text-gray-600 dark:text-gray-400">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}
