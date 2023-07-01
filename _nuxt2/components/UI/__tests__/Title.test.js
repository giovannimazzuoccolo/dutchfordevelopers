import { shallowMount } from '@vue/test-utils'
import Title from '../Title.vue'

describe('Title component', () => {
    test('renders a title in orange and blue', () => {
        const wrapper = shallowMount(Title, { propsData: { orange: 'My text' } })
        expect(wrapper.text()).toContain('My text')
    })
})
