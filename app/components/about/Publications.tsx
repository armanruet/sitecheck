'use client';

import { motion } from 'framer-motion';

interface Publication {
  authors: string[];
  title: string;
  journal: string;
  year: string;
  impactFactor?: string;
  location?: string;
}

const publications: Publication[] = [
  {
    authors: ['M. A. Hossen', 'T. X. Vu', 'S. Chatzinotas', 'V. D. Nguyen', 'B. Ottersten'],
    title:
      'Joint Resource Allocation and Link Adaptation for Ultra-reliable and Low-latency Services',
    journal: 'IEEE Consumer Communications & Networking Conference (CCNC)',
    year: '2023',
  },
];

export default function Publications() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-8">Publications</h2>
      <div className="space-y-2">
        {publications.map((pub, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="prose dark:prose-invert max-w-none"
          >
            <p className="mb-2">
              <strong>• </strong>
              {pub.authors.map((author, i) => (
                <span key={i}>
                  {author === 'M. A. Hossen' ? <strong>{author}</strong> : author}
                  {i < pub.authors.length - 1 ? ', ' : ''}
                </span>
              ))}
              , &quot;{pub.title},&quot; <em>{pub.journal}</em>
              {pub.impactFactor && <span> (Impact Factor: {pub.impactFactor})</span>}
              {pub.year && `, ${pub.year}`}
              {pub.location && `, ${pub.location}`}.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
