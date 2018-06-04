import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import SubHeader from './SubHeader';

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

class Content extends React.Component {
  _renderContent = (content) => {
    if (typeof content === 'string') {
      return <Header>{content}</Header>;
    }

    const { header, subheader } = content;

    return (
      <React.Fragment>
        <Header>{header}</Header>

        {subheader && <SubHeader>{subheader}</SubHeader>}
      </React.Fragment>
    );
  };

  render() {
    const { content, children } = this.props;

    return (
      <ContentBox>
        {children || this._renderContent(content)}
      </ContentBox>
    );
  }
}

Content.defaultProps = {
  subheader: '',
};

Content.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
};

export default Content;
