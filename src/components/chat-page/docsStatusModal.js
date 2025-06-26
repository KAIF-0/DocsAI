import React from "react";
import {
  X,
  CheckCircle,
  Clock,
  ArrowRight,
  FileText,
  MessageSquare,
  ShieldCheck,
  ShieldBan,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DocsStatusModal = ({ chatId, isOpen, onClose }) => {
  const router = useRouter();

  const handleGoToChat = () => {
    router.push(`/chat/${chatId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex items-center justify-center p-2 animate-fade-in">
      <div
        className="bg-black bg-opacity-60 p-4 rounded-2xl border border-slate-700/50 shadow-2xl max-w-2xl w-full mx-2 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-2 pb-0">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-slate-700/50 transition-colors group"
          >
            <X className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
          </button>

          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-2 animate-pulse">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">
              Documentation Status Guide
            </h2>
            <p className="text-slate-400">
              Understanding your documentation feeding process
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-2 pb-2 space-y-2">
          {/* Active State */}
          <div className="group relative overflow-hidden bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-2 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start space-x-2">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-green-400 mb-1">
                  Active State
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-1">
                  Your documentation feeding has been completed successfully!
                  All your docs have been processed, indexed, and are ready for
                  intelligent Q&A interactions.
                </p>
                <div className="flex items-center text-green-400 text-sm font-medium">
                  <MessageSquare className="w-2 h-2 mr-1" />
                  Ready for Q&A
                </div>
              </div>
            </div>
          </div>

          {/* Inactive/Processing State */}
          <div className="group relative overflow-hidden bg-gradient-to-r from-red-500/10 to-red-500/10 border border-red-500/20 rounded-xl p-2 hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start space-x-2">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <ShieldBan className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-red-400 mb-1">
                  Processing State
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-1">
                  Your processing job has been queued and is currently
                  processing. We&apos;re scraping, analyzing, and indexing your
                  documentation content.{" "}
                  <span className="font-bold text-gray-100">
                    Also add that if you ask any question related to it, it will
                    be answered by AI&apos;s general knowledge.
                  </span>
                </p>
                <div className="flex items-center text-red-400 text-sm font-medium">
                  <div className="w-1 h-1 bg-red-400 rounded-full mr-1 animate-pulse" />
                  Currently processing...
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row gap-1">
            <Button
              onClick={handleGoToChat}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 group"
            >
              Start Chatting
              <ArrowRight className="w-2 h-2 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsStatusModal;
