import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import styled from 'styled-components/native';

import {Article} from '../../types/article';
import ArticleCard from '../../components/ArticleCard';
interface Props {
  loading: boolean;
  data: Article[];
  fetchData: Function;
}
const Headlines: React.FC<Props> = ({loading, data, fetchData}) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <Articles>
      <StyledFlatList<React.ElementType>
        data={data}
        renderItem={({item}: {item: Article}) => <ArticleCard article={item} />}
        keyExtractor={(item): string => item.title}
        refreshing={loading}
        onRefresh={fetchData}
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

const StyledFlatList = styled(FlatList as new () => FlatList<Article[]>)`
  width: 100%;
`;

export default Headlines;
