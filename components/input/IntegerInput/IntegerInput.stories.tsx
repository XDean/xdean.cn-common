import {ComponentMeta, ComponentStory} from '@storybook/react';
import {useState} from 'react';
import {IntegerInput as Comp} from '.';

export default {
  title: `components/util/input/${Comp.name}`,
  component: Comp,
} as ComponentMeta<typeof Comp>;

const Template: ComponentStory<typeof Comp> = (args) => {
  const [value, setValue] = useState(0);
  return (
    <Comp
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Normal = Template.bind({});
Normal.storyName = Comp.displayName;
Normal.args = {
  min: 0,
  max: 100,
  step: 5,
};
