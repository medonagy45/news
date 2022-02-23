import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Headlines from '../../components/Headlines';
import normalize from '../../utils/normalize';
import {fetchHeadlines} from '../../utils/fetchHeadlines';
import {Article} from '../../types/article';

const TopHeadlines: React.FC = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  let fetchData = async (query: string) => {
    let articles = await fetchHeadlines(query);
    setData(articles);
    setLoading(false);
  };
  useEffect(() => {
    fetchData('');
  });
  useEffect(() => {
    setLoading(true);
    fetchData(text);
  }, [text]);
  return (
    <StyledSafeAreaView>
      <Container>
        <H1>Top Headlines</H1>
        <SearchBar placeholder="Search..." onChangeText={onChangeText} />
        <Headlines data={data} loading={loading} fetchData={fetchData} />
      </Container>
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled(SafeAreaView)`
  align-items: center;
  background-color: ${(props): string => props.theme.backgroundColor};
  flex: 1;
`;
const SearchBar = styled(TextInput)`
  border: 2px;
  border-radius: 25px;
`;

const Container = styled(View)`
  flex: 1;
  margin-top: 5%;
  width: 80%;
`;

const H1 = styled(Text)`
  color: ${(props): string => props.theme.primaryFontColor};
  font-size: ${normalize(26) + 'px'};
  font-weight: 700;
`;

export default TopHeadlines;
