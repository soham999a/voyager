'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpaceNewsApi } from '@/lib/api';

interface NewsArticle {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
}

const CommunicationLogs = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const fetchSpaceNews = async () => {
      try {
        const response = await SpaceNewsApi.getLatestNews(8);
        if (response.success) {
          setNewsArticles(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch space news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaceNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-orbitron text-4xl font-bold mb-2 text-glow">
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            COMMUNICATIONS
          </span>
        </h1>
        <p className="font-mono text-gray-400">
          Live Space Communications & News Feed
        </p>
      </motion.div>

      <div className="glass-strong rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-orbitron text-xl font-bold text-white flex items-center">
            <span className="mr-2">📡</span>
            Incoming Transmissions
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-neon-green">LIVE</span>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {newsArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🛰️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-neon-blue bg-neon-blue/20 px-2 py-1 rounded">
                          {article.newsSite}
                        </span>
                        <span className="font-mono text-xs text-gray-400">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-orbitron text-sm font-semibold text-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="font-mono text-xs text-gray-400 line-clamp-2">
                        {article.summary}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationLogs;
