import React from 'react';
import { storiesOf } from '@storybook/react';
import Heading from '../../.storybook/components/Heading';
import AutoPropsApi from '../../.storybook/components/AutoPropsApi';
import ComponentPanel from '../../.storybook/components/ComponentPanel';
import { TabbedView, Tab } from '../../.storybook/components/TabbedView';
import Checkbox from '../../components/Checkbox';
import Atom from '../static/atom.svg';

storiesOf('3. Forms', module)
  .add('Checkbox', () => (
    <Heading image={Atom} title="<Checkbox />">
      <TabbedView>
        <Tab title="Usage">
          <ComponentPanel
            component={<Checkbox />}
            importModules="Checkbox"
          />
        </Tab>

        <Tab title="API">
          <AutoPropsApi component={Checkbox} />
        </Tab>
      </TabbedView>
    </Heading>
  ));