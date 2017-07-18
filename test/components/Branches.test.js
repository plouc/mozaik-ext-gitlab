import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { WidgetHeader, WidgetLoader, defaultTheme } from '@mozaik/ui'
import Branches from './../../src/components/Branches'

const sampleProject = {
    name: 'ploucifier',
    web_url: 'https://gitlab.com/plouc/ploucifier',
}
const sampleBranches = [
    {
        name: 'fix-something',
        protected: false,
        created_at: '2015-10-22T11:38:08.000+02:00',
        commit: {
            id: '0610e6ffb1b8672eea4ba03591f1f0da13669bbc',
            message: 'Whatever',
            author_name: 'plouc',
            committed_date: '2015-10-22T11:38:08.000+02:00',
        },
    },
]

test('should return correct api request', () => {
    expect(
        Branches.getApiRequest({
            project: sampleProject.name,
        })
    ).toEqual({
        id: `gitlab.projectBranches.${sampleProject.name}`,
        params: { project: sampleProject.name },
    })
})

test('should display loader if no apiData available', () => {
    const wrapper = shallow(<Branches project={sampleProject.name} />)

    expect(wrapper.find(WidgetLoader).exists()).toBeTruthy()
})

test('header should display 0 count by default', () => {
    const wrapper = shallow(<Branches project={sampleProject.name} />)

    const header = wrapper.find(WidgetHeader)
    expect(header.prop('count')).toBe(0)
})

test('header should display pull request count when api sent data', () => {
    const wrapper = shallow(
        <Branches
            project={sampleProject.name}
            apiData={{ project: sampleProject, branches: sampleBranches }}
        />
    )

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('count')).toBe(sampleBranches.length)
})

test(`header title should default to '<project_name> Branches'`, () => {
    const wrapper = shallow(
        <Branches
            project={sampleProject.name}
            apiData={{ project: sampleProject, branches: sampleBranches }}
        />
    )

    const header = wrapper.find(WidgetHeader)
    expect(header.prop('title')).toBe('Branches')
})

test(`header title should be overridden when passing 'title' prop`, () => {
    const customTitle = 'Custom Title'
    const wrapper = shallow(
        <Branches
            project={sampleProject.name}
            apiData={{ project: sampleProject, branches: sampleBranches }}
            title={customTitle}
        />
    )

    const header = wrapper.find(WidgetHeader)
    expect(header.prop('title')).toBe(customTitle)
})

test('should render as expected', () => {
    const tree = renderer.create(
        <ThemeProvider theme={defaultTheme}>
            <Branches
                project={sampleProject.name}
                apiData={{ project: sampleProject, branches: sampleBranches }}
            />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
