declare module "youtube-transcript-api" {
    export function fetchTranscript(videoId: string): Promise<Array<{ text: string; duration: number; start: number }>>;
  }