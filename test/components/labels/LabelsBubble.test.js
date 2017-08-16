import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@mozaik/ui'
import LabelsBubble from './../../../src/components/labels/LabelsBubble'
import { sampleProject, sampleLabels } from './sampleData'

test('should render as expected', () => {
    const tree = renderer.create(
        <ThemeProvider theme={defaultTheme}>
            <LabelsBubble
                project={sampleProject.name}
                apiData={{ project: sampleProject, labels: sampleLabels }}
                theme={defaultTheme}
            />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
