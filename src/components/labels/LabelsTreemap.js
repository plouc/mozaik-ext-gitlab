import React, { Component } from 'react'
import LabelsIcon from 'react-icons/lib/fa/tags'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import { ResponsiveTreeMap } from 'nivo'
import { labelsPropTypes, labelsDefaultProps } from './propTypes'
import { countLabel } from './counts'

export default class LabelsTreemap extends Component {
    static propTypes = labelsPropTypes

    static defaultProps = labelsDefaultProps

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectLabels.${project}`,
            params: { project },
        }
    }

    render() {
        const { apiData, apiError, title, countBy, animate } = this.props

        let body = <WidgetLoader />
        let subject = null
        let count = 0
        if (apiData) {
            const { project, labels } = apiData

            count = labels.length

            const data = {
                name: 'labels',
                color: '#000',
                children: labels,
            }

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body = (
                <ResponsiveTreeMap
                    root={data}
                    tile="binary"
                    labelSkipSize={12}
                    identity="id"
                    value={countBy}
                    label={d => `${d.name} ${d[countBy]}`}
                    labelTextColor="inherit:darker(1.6)"
                    leavesOnly={true}
                    outerPadding={10}
                    innerPadding={2}
                    colorBy={d => d.color}
                    animate={animate}
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || `Labels by ${countLabel(countBy)}`}
                    subject={title ? null : subject}
                    count={count}
                    icon={LabelsIcon}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}