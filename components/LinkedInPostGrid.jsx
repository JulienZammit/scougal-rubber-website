import React, { useState } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

const LinkedInPostGrid = ({ posts }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPostContent = (post) => {
    const content = post.specificContent['com.linkedin.ugc.ShareContent'];
    return {
      text: content.shareCommentary.text,
      media: content.media?.[0] || null,
      timestamp: post.created.time,
      shareMediaCategory: content.shareMediaCategory,
      url: content.shareMediaCategory === 'ARTICLE' ? content.media?.[0]?.originalUrl : null
    };
  };

  const handlePostClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post, index) => {
        const { text, media, timestamp, shareMediaCategory, url } = getPostContent(post);
        
        return (
          <div 
            key={index} 
            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handlePostClick(url)}
            style={{ cursor: url ? 'pointer' : 'default' }}
          >
            {/* LinkedIn branding */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
            
            <div className="p-5 flex-1 flex flex-col">
              {/* Header with Logo and Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    SR
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Scougal Rubber</h3>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{formatDate(timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {text}
                </p>
              </div>

              {/* Media content */}
              {media && (
                <div className="mt-auto">
                  {shareMediaCategory === 'ARTICLE' && (
                    <div className={`border border-gray-200 rounded-lg overflow-hidden transition-transform duration-300 ${hoveredId === index ? 'transform scale-[1.02]' : ''}`}>
                      {media.thumbnails && (
                        <div className="relative h-32">
                          <img
                            src={media.thumbnails[0].url}
                            alt={media.title?.text || "Article thumbnail"}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-3 bg-gray-50">
                        <h4 className="font-medium text-sm text-gray-800 mb-1">
                          {media.title?.text}
                        </h4>
                        {media.description && (
                          <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                            {media.description.text}
                          </p>
                        )}
                        <div className="flex items-center text-blue-500 text-xs">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          <span className="truncate">{new URL(media.originalUrl).hostname}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {shareMediaCategory === 'IMAGE' && (
                    <div className={`rounded-lg overflow-hidden transition-all duration-300 ${hoveredId === index ? 'transform scale-[1.02]' : ''}`}>
                      <div className="relative h-64">
                        <img
                          src={media.thumbnails[0].url}
                          alt={media.description?.text || "Post image"}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      {media.description?.text && (
                        <p className="text-xs text-gray-600 mt-2">
                          {media.description.text}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Hover effect for clickable items */}
            {url && hoveredId === index && (
              <div className="absolute inset-0 bg-black bg-opacity-5 transition-opacity duration-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LinkedInPostGrid;