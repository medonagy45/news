import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View, Text} from 'react-native';
import styled from 'styled-components/native';

import {Article} from '../../types/article';
import ArticleCard from '../../components/ArticleCard';
import normalize from '../../utils/normalize';
import {fetchHeadlines} from '../../utils/fetchHeadlines';

const Headlines: React.FC = () => {
  //   const {loading, error, data, refetch} = useQuery(GET_TOP_HEADLINES);
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      let articles = await fetchHeadlines();
      setData(articles);
      setLoading(false);
    }
    fetchData();
  }, []);
  if (loading) {
    return <Spinner />;
  }

  return (
    <Articles>
      <FlatList
        data={data}
        renderItem={({item}: {item: Article}) => <ArticleCard article={item} />}
        keyExtractor={(item): string => item.title}
        refreshing={loading}
      />
    </Articles>
  );
};

const Spinner = styled(ActivityIndicator)`
  flex: 1;
`;
const Articles = styled(View)`
  align-items: center;
  flex: 1;
  margin-top: 5%;
`;

// const StyledFlatList = styled(FlatList as new () => FlatList<Article[]>)`
//   width: 100%;
// `;

export default Headlines;
