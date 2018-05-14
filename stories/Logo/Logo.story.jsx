import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import LogoTypes from '../../components/Logo/LogoTypes';
import Heading from '../../.storybook/components/Heading';
import Atom from '../static/atom.svg';
import { TabbedView, Tab } from '../../.storybook/components/TabbedView';
import HowToImport from '../../.storybook/components/HowToImport';
import CodeExample from '../../.storybook/components/CodeExample';
import AutoPropsApi from '../../.storybook/components/AutoPropsApi';
import { Col, Row } from '../../components/Grid';

const StyledRow = styled(Row)`
  margin-bottom: 30px;
`;

const logos = [
  'Business',
  'Candidate',
  'Education',
  'Facebook',
  'Google',
];

storiesOf('7. Image', module)
  .add('Logo', () => (
    <Heading image={Atom} title="<Logo />">
      <TabbedView>
        <Tab title="Usage">
          <HowToImport importModules="Logo" />
          <p>You can use these logos:</p>
          <ul>
            {logos.map(name => <li key={name}>{name}</li>)}
          </ul>
          {logos.map((name) => {
            const Component = LogoTypes[name];
            return (
              <StyledRow>
                <Col phone={4}>
                  <CodeExample
                    code={`<Logo.${name} />`}
                    showTitle={false}
                  />
                </Col>
                <Col phone={4}>
                  <Component />
                </Col>
              </StyledRow>
            );
          })}
        </Tab>
        <Tab title="API">
          <AutoPropsApi component={Logo} ignoredProps={['src']} />
        </Tab>
      </TabbedView>
    </Heading>
  ));
