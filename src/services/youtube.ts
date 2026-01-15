/**
 * YouTube Data API v3 Service
 * Fetches the latest video from a YouTube channel, excluding Shorts
 */

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
}

interface YouTubeAPIResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
      publishedAt: string;
    };
  }>;
}

interface VideoDetailsResponse {
  items: Array<{
    contentDetails: {
      duration: string;
    };
  }>;
}

/** Converts ISO 8601 duration to seconds (PT1M30S = 90 seconds) */
const parseDuration = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  return hours * 3600 + minutes * 60 + seconds;
};

export const fetchLatestYouTubeVideo = async (): Promise<YouTubeVideo | null> => {
  const API_KEY = import.meta.env.YT_API_SERVER || import.meta.env.YT_API;
  const CHANNEL_ID = import.meta.env.CHANNEL_ID;
console.log("API_KEY:", API_KEY);
console.log("CHANNEL_ID:", CHANNEL_ID);

  if (!API_KEY) {
    throw new Error("YouTube API key is missing");
  }

  if (!CHANNEL_ID) {
    throw new Error("YouTube Channel ID is missing");
  }

  try {
    const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=10`;

    const searchResponse = await fetch(searchURL);

    // Handle 403 (quota exceeded) or 500 (server error) - return fallback video
    if (searchResponse.status === 403 || searchResponse.status === 500) {
      console.warn(`YouTube API error ${searchResponse.status}, using fallback video`);
      return getFallbackVideo();
    }

    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchResponse.status}`);
    }

    const searchData: YouTubeAPIResponse = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return getFallbackVideo();
    }

    // Filter out Shorts (videos < 60 seconds)
    for (const item of searchData.items) {
      const videoId = item.id.videoId;
      const detailsURL = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=contentDetails`;

      const detailsResponse = await fetch(detailsURL);
      if (!detailsResponse.ok) continue;

      const detailsData: VideoDetailsResponse = await detailsResponse.json();
      if (!detailsData.items || detailsData.items.length === 0) continue;

      const duration = detailsData.items[0].contentDetails.duration;
      const durationInSeconds = parseDuration(duration);

      if (durationInSeconds < 60) continue;

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        duration,
      };
    }

    return getFallbackVideo();
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    // Return fallback video on any error
    return getFallbackVideo();
  }
};

const fallbackVideoId = "bNFQxl92zu8";

/** Fallback video when API fails */
const getFallbackVideo = (): YouTubeVideo => {
  return {
    id: fallbackVideoId,
    title: "Astro Tema Oscuro Tutorial",
    description: "Fallback content when YouTube API is unavailable",
    thumbnail: `https://img.youtube.com/vi/${fallbackVideoId}/hqdefault.jpg`,
    publishedAt: new Date().toISOString(),
    duration: "PT15M30S"
  };
};
