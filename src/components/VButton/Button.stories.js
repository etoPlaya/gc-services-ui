import { action } from '@storybook/addon-actions'

import VButton from './VButton.vue';

export default {
  title: 'Components/VButton',
  component: VButton,
  argTypes: {
    // button args
    backgroundColor: { 
      control: { 
        type: 'select',
      },
      options: [
        'yellow', 
        'white', 
        'gray',
        'transparent',
      ],
      description: 'Цвет заливки кнопки',
    },
    size: {
      control: { 
        type: 'select',
      },
      options: [
        'auto', 
        'fit-content',
        'thin',
        'thin-fit-content',
      ],
      description: 'Размер кнопки <br> <b>Использование значение auto нежелательно!</b>',
    },
    position: {
      control: { 
        type: 'select',
      },
      options: [
        'center', 
        'left',
        'right',
      ],
      description: 'Позиция контента внутри кнопки',
    },
    fontSize: {
      control: { 
        type: 'select',
      },
      options: [
        'small',
        'normal',
        'medium',
      ],
      description: 'small - 14px, normal - 16px, big - 18px',
    },

    // icons args
    iconName: {
      control: { 
        type: 'select',
      },
      options: [
        'Cards',
        'Projects',
        'Stars',
      ],
      description: 'Имя иконки',
    },
    onlyIcon: {
      control: { 
        type: 'boolean',
      },
      options: [
        true,
        false,
      ],
      defaultValue: false,
      description: 'Показывать только иконку',
    },
    sizeIcon: {
      control: { 
        type: 'number',
      },
      defaultValue: 24,
      description: 'Размер иконки Width and Height',
    },
    iconFill: {
      control: { 
        type: 'color',
      },
      description: 'Цвет заливки',
    },
    iconStroke: {
      control: { 
        type: 'color',
      },
      description: 'Цвет обводки',
    },

    // actions
    onClick: {
      action: 'onClick',
    },
  },
};

const Template = args => ({
  components: { 
    VButton,
  },
  setup() {
    return { 
      args,
    };
  },
  methods: {
    action,
  },
  template: `<VButton v-bind="args" @click="onClick"/>`,
});

export const Button = Template.bind({});
Button.args = {
  text: 'Кнопка',
  size: 'fit-content',
  backgroundColor: 'yellow',
  fontSize: 'normal',
};

export const ButtonIcon = Template.bind({});
ButtonIcon.args = {
  text: 'Кнопка',
  size: 'thin',
  backgroundColor: 'yellow',
  fontSize: 'normal',
  iconName: 'Cards',
  sizeIcon: 24,
  iconStroke: '#000',
};

export const ButtonOnlyIcon = Template.bind({});
ButtonOnlyIcon.args = {
  size: 'fit-content',
  backgroundColor: 'yellow',
  iconName: 'Cards',
  sizeIcon: 24,
  iconStroke: '#000',
  onlyIcon: true,
};
