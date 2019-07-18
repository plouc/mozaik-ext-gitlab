import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { WidgetHeader, WidgetLoader, defaultTheme } from '@mozaik/ui'
import Branches from './../../src/components/Branches'
import fixtures from '../../fixtures'

Enzyme.configure({ adapter: new Adapter() })

test('should return correct api request', () => {
    expect(
        Branches.getApiRequest({
            project: fixtures.project.name,
        })
    ).toEqual({
        id: `gitlab.projectBranches.default.${fixtures.project.name}`,
        params: { client: 'default', project: fixtures.project.name },
    })
})

test('should display loader if no apiData available', () => {
    const wrapper = Enzyme.shallow(<Branches project={fixtures.project.name} />)

    expect(wrapper.find(WidgetLoader).exists()).toBeTruthy()
})

test('header should display 0 count by default', () => {
    const wrapper = Enzyme.shallow(<Branches project={fixtures.project.name} />)

    const header = wrapper.find(WidgetHeader)
    expect(header.prop('count')).toBe(0)
})

test('header should display pull request count when api sent data', () => {
    const wrapper = Enzyme.shallow(
        <Branches
            project={fixtures.project.name}
            apiData={{
                project: fixtures.project,
                branches: { items: fixtures.branches, pagination: { total: 42 } },
            }}
        />
    )

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('count')).toBe(42)
})

test(`header title should default to '<project_name> Branches'`, () => {
    const wrapper = Enzyme.shallow(
        <Branches
            project={fixtures.project.name}
            apiData={{
                project: fixtures.project,
                branches: { items: fixtures.branches, pagination: { total: 42 } },
            }}
        />
    )

    const header = wrapper.find(WidgetHeader)
    expect(header.prop('title')).toBe('Branches')
})

test(`header title should be overridden when passing 'title' prop`, () => {
    const customTitle = 'Custom Title'
    const wrapper = Enzyme.shallow(
        <Branches
            project={fixtures.project.name}
            apiData={{
                project: fixtures.project,
                branches: { items: fixtures.branches, pagination: { total: 42 } },
            }}
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
                project={fixtures.project.name}
                apiData={{
                    project: fixtures.project,
                    branches: { items: fixtures.branches, pagination: { total: 42 } },
                }}
            />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
