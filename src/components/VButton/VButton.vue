<template>
  <button 
    type="button"
    class="v-button"
    :class="classes" 
    @click="onClick"
  >
    <VIcon 
      v-if="iconName"
      :iconName="iconName"
      :sizeIcon="sizeIcon"
      :iconFill="iconFill"
      :iconStroke="iconStroke"
    />

    <span v-if="!onlyIcon">
      {{ text }}
    </span>
  </button>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: 'VButton',

  props: {
    // props button
    text: {
      type: [String, Number],
      required: true,
    },
    size: {
      type: String,
      default: 'auto',
      validator: value => 
        [
          'auto',
          'fit-content',
          'thin',
          'thin-fit-content',
        ].indexOf(value) !== -1,
    },
    position: {
      type: String,
      default: 'center',
      validator: value => 
        [
          'center',
          'left',
          'right',
        ].indexOf(value) !== -1,
    },
    fontSize: {
      type: String,
      default: 'normal',
      validator: value => 
        [
          'small',
          'normal',
          'medium',
        ].indexOf(value) !== -1,
    },
    backgroundColor: {
      type: String,
      default: 'yellow',
      validator: value => 
        [
          'yellow',
          'white',
          'gray',
          'transparent',
        ].indexOf(value) !== -1,
    },

    // props icons
    iconName: {
      type: String,
    },
    onlyIcon: {
      type: Boolean,
      default: false,
    },
    sizeIcon: {
      type: [Number, String],
      default: 24,
    },
    iconFill: {
      type: String,
    },
    iconStroke: {
      type: String,
    },
  },
  emits: ['onClick'],

  setup(props) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        'v-button_only-icon': props.onlyIcon,
        [`v-button_size-${props.size}`]: true,
        [`v-button_position-${props.position}`]: true,
        [`v-button_color-${props.backgroundColor}`]: true,
        [`v-button_fontSize-${props.fontSize}`]: true,
      })),
    };
  },
};
</script>

<style lang="scss">
.v-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  column-gap: 12px;
  width: 100%;
  border-radius: 6px;
  border: none;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  transition: 250ms ease all;

  &_only-icon {
    padding: 10px 10px 8px 10px !important;
  }

  &_size {
    &-fit-content {
      max-width: fit-content;
      padding: 14px;
    }
    &-thin {
      max-width: fit-content;
      padding: 10px 40px;
    }
    &-thin-fit-content {
      max-width: fit-content;
      padding: 10px 15px;
    }
  }

  &_position {
    &-center {
      justify-content: center;
    }

    &-left {
      justify-content: flex-start;
    }

    &-right {
      justify-content: flex-end;
    }
  }

  &_fontSize {
    &-small {
      @include font(500, 14px, 16px);
    }

    &-normal {
      @include font(500, 16px, 16px);
    }

    &-medium {
      @include font(500, 18px, 16px);
    }
  }

  &_color {
    &-yellow {
      color: #484B51;
      background: $yellow;

      &:hover {
        background: $yellow-hover;
      }
    }

    &-white {
      color: #93979F;
      background: #FFF;
      border: 1px solid $border-color;

      &:hover {
        color: #2E3138;
        background: $yellow-hover;
        border-color: transparent;
      }

      &:active, &:focus, .v-button_active {
        color: #2E3138;
        background: #FFE666;
      }
    }

    &-gray {
      background: transparent;
      border: 1px solid $border-color-gray;

      &:hover {
        background: $yellow-hover;
        border-color: transparent;
      }

      &:active, &:focus, .v-button_active {
        background: #FFE666;
        border-color: transparent;
      }
    }

    &-transparent {
      color: #93979F;
      background: transparent;

      &:hover {
        color: #2E3138;
      }

      &:active, &:focus, .v-button_active {
        color: #2E3138;
        background: #FFE666;
      }
    }
  }
}
</style>
