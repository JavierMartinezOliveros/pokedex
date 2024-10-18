import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../components/Button.vue'

describe('Button.vue', () => {
  it('renders the label when passed', () => {
    const wrapper = mount(Button, {
      props: { label: 'Get Started', usage: 'active' },
    })

    expect(wrapper.text()).toContain('Get Started')
  })

  it('applies the correct usage class', () => {
    const wrapper = mount(Button, {
      props: { label: 'Click me', usage: 'inactive' },
    })

    expect(wrapper.classes()).toContain('-inactive')
  })

  it('renders the icon when passed through the slot', () => {
    const wrapper = mount(Button, {
      props: { label: 'All', usage: 'active' },
      slots: {
        icon: '<img src="menu-icon.svg" alt="menu icon"/>',
      },
    })

    expect(wrapper.html()).toContain('menu-icon.svg')
  })
})
