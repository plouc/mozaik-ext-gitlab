import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@mozaik/ui'
import LabelsTreemap from './../../../src/components/labels/LabelsTreemap'
import { sampleProject, sampleLabels } from './sampleData'

test('should render as expected', () => {
    const tree = renderer.create(
        <ThemeProvider theme={defaultTheme}>
            <LabelsTreemap
                project={sampleProject.name}
                apiData={{ project: sampleProject, labels: sampleLabels }}
                theme={defaultTheme}
            />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
