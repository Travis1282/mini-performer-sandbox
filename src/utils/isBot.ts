export const isBot = (userAgent: null | string): boolean => {
  if (!userAgent) {
    return false;
  }
  const botsPatterns = [
    /googlebot/i,
    /bingbot/i,
    /yandex/i,
    /baiduspider/i,
    /slurp/i,
    /duckduckbot/i,
    /sogou/i,
    /exabot/i,
    /facebookexternalhit/i,
    /facebot/i,
    /ia_archiver/i,
    /adsbot-google/i, // Google AdsBot
    /adsbot-google-mobile/i, // Google AdsBot Mobile
    /adsbot-google-mobile-apps/i, // Google AdsBot Mobile Apps
    /bingads/i, // Bing AdsBot
    /linkedinbot/i, // LinkedInBot
    /twitterbot/i, // TwitterBot
    /pinterest/i, // PinterestBot
    /applebot/i, // AppleBot
    // AI and ML bots patterns
    /aipatterns/i, // Generic pattern for AI bots
    /aihttpclient/i, // Generic pattern for AI bots
    /crawl/i, // A common substring in many bots
    /bot/i, // A broad match, catching many bots but possibly with false positives
    /spider/i, // Common in many web crawlers
    /python-requests/i, // Common library used for scripting bots
    /python-urllib/i, // Another common library for bots
    /wget/i, // Often used for automated downloads and bots
    /curl/i, // Command-line tool often used in scripting bots
    /httpclient/i, // Generic HTTP client, could be used by bots
    /gptbot/i, // OpenAI's GPT-3 bot
  ];
  return botsPatterns.some((pattern) => pattern.test(userAgent.toLowerCase()));
};
