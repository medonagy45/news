import React from 'react';
import {Dimensions, Image, Linking, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp} from '@react-navigation/native';
import styled from 'styled-components/native';

import {RootStackParamList} from '../../types/navigation';
import ArticleDate from '../../components/ArticleDate';
import ArticleTitle from '../../components/ArticleTitle';
import Link from '../../components/Link';
import normalize from '../../utils/normalize';

type HeadlineDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'HeadlineDetails'
>;
interface Props {
  route: HeadlineDetailsScreenRouteProp;
}

const HeadlineDetails: React.FC<Props> = ({route}) => {
  const article = route.params.article;

  return (
    <StyledSafeAreaView>
      <Container>
        <Row>
          <ArticleDate publishDate={article.publishedAt} />
        </Row>
        <ArticleTitle>{article.title}</ArticleTitle>
        {article.author ? <Author>{article.author}</Author> : null}
        {article.urlToImage && (
          <StyledAutoHeightImage
            source={{uri: article.urlToImage}}
            resizeMode="stretch"
            width={Dimensions.get('screen').width * 0.8}
          />
        )}
        {article.description ? (
          <Description>{article.description}</Description>
        ) : null}
        {article.url ? (
          <Link
            alignment="left"
            onPress={(): Promise<string> => Linking.openURL(article.url || '')}>
            Go to Full Article
          </Link>
        ) : null}
      </Container>
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled(SafeAreaView)`
  align-items: center;
  background-color: ${(props): string => props.theme.backgroundColor};
  flex: 1;
`;

const Container = styled(ScrollView)`
  flex: 1;
  margin-top: 5%;
  width: 80%;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10%;
`;

const Author = styled(Text)`
  color: ${(props): string => props.theme.secondaryFontColor};
  font-size: ${normalize(13) + 'px'};
  font-weight: 600;
  margin-top: 5%;
`;

const StyledAutoHeightImage = styled(Image)`
  margin-top: 5%;
  height: 250px;
  width: ${(props): number => (props.width ? props.width : 100)}px;
`;

const Description = styled(Text)`
  font-size: ${normalize(13) + 'px'};
  margin-top: 5%;
`;

export default HeadlineDetails;
