import Link from 'next/link';
import { AiFillLinkedin } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
          {/* Left side */}
          <div className="flex items-center space-x-2 text-sm">
            <span>© 2025</span>
            <span>•</span>
            <span>Arman Hossen</span>
          </div>

          {/* Right side - Social Icons */}
          <div className="flex items-center space-x-5">
            <Link
              href="https://linkedin.com/in/armanruet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              <AiFillLinkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <Link
              href="https://github.com/armanruet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FaGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>

            <Link
              href="https://twitter.com/armanruet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FaXTwitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
