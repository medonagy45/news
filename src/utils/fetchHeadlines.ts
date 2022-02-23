import {API_KEY} from 'react-native-dotenv';
import {Article} from '../types/article';

const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`;

// This function allows you to fetch articles directly from the REST API instead of directing through GraphQL
export async function fetchHeadlines(text: string): Promise<Article[]> {
  let fetchUrl = url;
  if (text) {
    fetchUrl += `&q=${text}`;
  }
  const result = await fetch(fetchUrl).then(response => response.json());

  return result.articles;
}
