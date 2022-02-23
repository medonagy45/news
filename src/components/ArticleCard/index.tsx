import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {Article} from '../../types/article';
import Link from '../Link';
import ArticleDate from '../ArticleDate';
import ArticleTitle from '../ArticleTitle';
import useScreenDimensions from '../../hooks/useScreenDimensions';

interface Props {
  article: Article;
}

interface DimensionProps {
  isLandscape: boolean;
}
const ArticleCard: React.FC<Props> = ({article}) => {
  const navigation = useNavigation();
  const {isLandscape} = useScreenDimensions();
  const imageWidth = Dimensions.get('screen').width * (isLandscape ? 0.3 : 0.8);

  return (
    <BoxShadow>
      <ArticleWrapper isLandscape={isLandscape}>
        {article.urlToImage && (
          <StyledImage
            source={{uri: article.urlToImage}}
            resizeMode="stretch"
            width={imageWidth}
            isLandscape={isLandscape}
          />
        )}
        <TextWrapper>
          <Row>
            <ArticleDate publishDate={article.publishedAt} />
          </Row>
          <ArticleTitle>{article.title}</ArticleTitle>
          <Link
            onPress={(): void =>
              navigation.navigate(
                'HeadlineDetails' as never,
                {article} as never,
              )
            }
            alignment="right">
            Read More
          </Link>
        </TextWrapper>
      </ArticleWrapper>
    </BoxShadow>
  );
};

const BoxShadow = styled(View)`
  shadow-color: #a3b1c5;
  shadow-offset: 5px 5px;
  shadow-opacity: 0.5;
`;
const ArticleWrapper = styled(View)<DimensionProps>`
  align-items: ${(props): string => (props.isLandscape ? 'center' : 'stretch')};
  background-color: ${(props): string => props.theme.backgroundColor};
  border-radius: ${(props): string => props.theme.borderRadius};
  elevation: 5;
  flex-direction: ${(props): string => (props.isLandscape ? 'row' : 'column')};
  margin-bottom: ${(props): string => (props.isLandscape ? '5%' : '10%')};
  overflow: hidden;
  position: relative;
  width: ${(props): string => (props.isLandscape ? '80%' : '95%')};
`;

const TextWrapper = styled(View)`
  flex-shrink: 1;
  padding: 5% 5% 0 5%;
`;
const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledImage = styled(Image)<DimensionProps>`
  height: 150px;
  width: ${(props): number => (props.width ? props.width : 100)}px;
`;

export default ArticleCard;
