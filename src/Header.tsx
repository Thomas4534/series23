import { Search, X, Clock, ChevronRight, Copy, Check, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Common questions and FAQs with short answers
const FAQ_DATA = [
  {
    question: "How does Series matching work?",
    answer: "AI analyzes your profile and interests to connect you with relevant people for meaningful conversations."
  },
  {
    question: "What makes Series different from other social apps?",
    answer: "Quality over quantity. Curated AI introductions instead of endless scrolling."
  },
  {
    question: "How do I create a profile on Series?",
    answer: "Download the app, sign up, and complete your profile with background and interests."
  },
  {
    question: "Is Series available on mobile?",
    answer: "Yes! Available on iOS and Android with full feature parity."
  },
  {
    question: "How does the AI matching algorithm work?",
    answer: "Machine learning analyzes your profile, interactions, and preferences to predict valuable connections."
  },
  {
    question: "What kind of connections can I make on Series?",
    answer: "Founders, investors, professionals, creatives, and like-minded individuals across industries."
  },
  {
    question: "How do I delete my Series account?",
    answer: "Settings > Account > Delete Account. This action is permanent."
  },
  {
    question: "Is Series free to use?",
    answer: "Free basic plan available. Premium subscriptions offer advanced features."
  },
  {
    question: "How do I report inappropriate content?",
    answer: "Tap the three dots on any message or profile and select 'Report'. We review within 24 hours."
  },
  {
    question: "Can I use Series for professional networking?",
    answer: "Absolutely! Many users find co-founders, investors, and professional collaborators."
  },
  {
    question: "What age groups use Series?",
    answer: "Primarily 20-45, focusing on professionals, founders, and creatives."
  },
  {
    question: "How do I reset my password?",
    answer: "Login screen → 'Forgot Password' → enter email → check your inbox for reset link."
  },
  {
    question: "Does Series have video calling?",
    answer: "Not yet. We focus on quality text conversations first. Video coming soon!"
  },
  {
    question: "How do I customize my matching preferences?",
    answer: "Profile → Settings → Matching Preferences. Adjust industries, interests, and connection types."
  },
  {
    question: "What's the difference between founders and investors on Series?",
    answer: "Founders seek funding and advice. Investors look for promising startups. Both find value in connecting."
  },
  {
    question: "How do I verify my account?",
    answer: "Upload official ID in Settings. Verification usually takes 1-2 business days."
  },
  {
    question: "Can I use Series internationally?",
    answer: "Yes! Available worldwide. Connect across time zones and borders."
  },
  {
    question: "How do I contact Series support?",
    answer: "Settings → Help & Support → Contact Us. Typically respond within 24 hours."
  },
  {
    question: "What data does Series collect?",
    answer: "Profile info, messages, and usage patterns to improve matching. We never sell your data."
  },
  {
    question: "How do I improve my matching results?",
    answer: "Complete your profile thoroughly, be active in conversations, and update your preferences regularly."
  }
];

function Header() {
  const [query, setQuery] = useState("");
  const [floating, setFloating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [suggestions, setSuggestions] = useState<typeof FAQ_DATA>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setSelectedSuggestion(-1);
      setExpandedItems([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matched = FAQ_DATA
      .filter(faq =>
        faq.question.toLowerCase().includes(lowerQuery) ||
        faq.question.toLowerCase().split(' ').some(word => word.startsWith(lowerQuery))
      )
      .slice(0, 5);

    setSuggestions(matched);
    setSelectedSuggestion(-1);
    setExpandedItems([]);
  }, [query]);

  // Handle scroll effects
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 100, 1);
      setScrollProgress(progress);
      setFloating(scrollY > 60);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setShowSuggestions(false);
        setExpandedItems([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (faq: typeof FAQ_DATA[0]) => {
    setQuery(faq.question);

    // Add to recent searches (limit to 5)
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== faq.question);
      return [faq.question, ...filtered].slice(0, 5);
    });
  };

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
          handleSuggestionClick(suggestions[selectedSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        setExpandedItems([]);
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    setExpandedItems([]);
    inputRef.current?.focus();
  };

  const copyAnswer = async (answer: string, index: number) => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getRecentSuggestions = () => {
    return recentSearches
      .map(search => FAQ_DATA.find(faq => faq.question === search))
      .filter(Boolean)
      .slice(0, 3) as typeof FAQ_DATA;
  };

  const hasRecentSearches = getRecentSuggestions().length > 0;
  const showRecentSearches = showSuggestions && !query && hasRecentSearches;
  const showNoResults = showSuggestions && query && suggestions.length === 0;

  return (
    <header
      className={`w-full flex justify-center transition-all duration-500 ease-out ${
        floating ? "fixed top-4 z-50" : "relative pt-8"
      }`}
    >
      <div
        className={`
          relative transition-all duration-500 ease-out
          ${floating
            ? "bg-white/90 backdrop-blur-xl border border-gray-100 rounded-xl shadow-sm px-6 py-2"
            : "bg-transparent px-6 py-4"
          }
        `}
        style={{
          transform: floating ? `translateY(${scrollProgress * -10}px)` : 'none',
          opacity: floating ? (0.95 + scrollProgress * 0.05) : 1,
        }}
      >
        <div className="relative w-[480px] max-w-full group">
          <Search
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              text-gray-500 w-4 h-4
              group-focus-within:text-gray-800
              group-hover:text-gray-600
              transition-all duration-300
              z-10
            "
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder="Ask Series..."
            className="
              w-full pl-12 pr-10 py-3
              rounded-xl
              bg-white/80
              border border-gray-300/80
              text-gray-900 placeholder-gray-500
              focus:outline-none
              focus:bg-white
              focus:border-gray-400
              focus:ring-1 focus:ring-gray-400/50
              backdrop-blur-sm
              transition-all duration-300
              hover:bg-white/90
              hover:border-gray-400/80
              text-sm
              font-mono
              tracking-tight
              font-medium
            "
          />

          {query && (
            <button
              onClick={clearSearch}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 hover:text-gray-800
                transition-all duration-200
                p-1 rounded-lg hover:bg-gray-200/80
                font-mono
              "
            >
              <X size={14} />
            </button>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && (suggestions.length > 0 || showRecentSearches || showNoResults) && (
            <div
              ref={suggestionsRef}
              className="
                absolute top-full left-0 right-0 mt-1
                bg-white/95 backdrop-blur-xl
                border border-gray-200/80
                rounded-xl shadow-xl
                overflow-hidden
                z-50
                animate-in fade-in slide-in-from-top-2 duration-200
                max-h-96 overflow-y-auto
                font-mono
              "
            >
              {/* Recent Searches */}
              {showRecentSearches && (
                <div className="p-2 border-b border-gray-100/80">
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    <Clock size={12} />
                    Recent Queries
                  </div>
                  {getRecentSuggestions().map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(faq)}
                      className="
                        w-full flex items-center gap-3 px-3 py-2
                        text-sm text-gray-800
                        hover:bg-gray-100/80
                        transition-colors duration-150
                        text-left
                        font-medium
                      "
                    >
                      <Clock size={14} className="text-gray-500 flex-shrink-0" />
                      <span className="flex-1 truncate">{faq.question}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Matching Questions with Expandable Answers */}
              {suggestions.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    System Responses
                  </div>
                  {suggestions.map((faq, index) => (
                    <div
                      key={index}
                      className={`
                        border-l-2 transition-all duration-150
                        ${selectedSuggestion === index
                          ? 'bg-blue-50/80 border-blue-600'
                          : 'border-transparent'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSuggestionClick(faq)}
                          className={`
                            flex-1 flex items-center gap-3 px-3 py-3
                            text-sm
                            transition-colors duration-150
                            text-left
                            font-medium
                            ${selectedSuggestion === index
                              ? 'text-blue-800'
                              : 'text-gray-800 hover:bg-gray-100/80'
                            }
                          `}
                        >
                          <Search size={14} className="text-gray-500 flex-shrink-0" />
                          <span className="flex-1 text-left">{faq.question}</span>
                        </button>

                        {/* Expand Arrow Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(index);
                          }}
                          className={`
                            mr-3 p-1 rounded-lg transition-all duration-200
                            ${expandedItems.includes(index)
                              ? 'text-gray-700 bg-gray-200/80 rotate-180'
                              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/80'
                            }
                          `}
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>

                      {/* Answer Section - Only shows when expanded */}
                      {expandedItems.includes(index) && (
                        <div className="px-3 pb-3 -mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="bg-gray-100/80 rounded-lg p-3 border border-gray-200/80">
                            <p className="text-sm text-gray-700 leading-relaxed font-normal">
                              {faq.answer}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyAnswer(faq.answer, index);
                              }}
                              className="flex items-center gap-1 mt-2 text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                            >
                              {copiedIndex === index ? (
                                <>
                                  <Check size={12} />
                                  Copied to buffer
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  Copy response
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {showNoResults && (
                <div className="p-4 text-center">
                  <div className="text-gray-600 text-sm mb-2 font-medium">
                    No results found for "{query}"
                  </div>
                  <div className="text-gray-500 text-xs font-normal">
                    Try: "matching", "profile", or "algorithm"
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-gray-100/80 bg-gray-100/50 px-3 py-2">
                <div className="text-xs text-gray-600 text-center font-medium tracking-wide">
                  [↑↓ Navigate] [↵ Select] [ESC Close]
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;