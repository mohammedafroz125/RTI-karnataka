import React, { memo, useCallback, useState } from 'react';
import { RTIDostModal } from './RTIDostModal';

const ChatbotComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatClick = useCallback(() => {
    // Show RTI Dost modal first
    setIsModalOpen(true);
  }, []);

  const handleDraft = useCallback(() => {
    // Close modal and redirect to chat page
    setIsModalOpen(false);
    window.open('https://chat.filemyrti.com/', '_blank', 'noopener,noreferrer');
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {/* Chat with AI FAB */}
      <div className="group fixed bottom-5 right-4 md:bottom-6 md:right-6 z-[9999]">
        {/* Hover tooltip for desktop */}
        <div className="hidden md:block absolute right-16 bottom-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-sm text-gray-900 shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition-all duration-200 pointer-events-none">
          Need help with RTI? <span className="font-semibold">Chat with AI</span>
          {/* Arrow pointing to button */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-white" />
        </div>

        {/* Circular FAB Button */}
        <button
          onClick={handleChatClick}
          aria-label="Open Chat with AI"
          className="flex h-[52px] w-[52px] md:h-14 md:w-14 items-center justify-center rounded-full bg-[#026CB6] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:bg-[#025a9d] focus:outline-none focus:ring-2 focus:ring-[#026CB6]/70 focus:ring-offset-2"
        >
          {/* Chat bubble icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </div>

      {/* RTI Dost Modal */}
      <RTIDostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDraft={handleDraft}
      />
    </>
  );
};

export const Chatbot = memo(ChatbotComponent);


