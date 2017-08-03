import React, { Component } from 'react'
import LabelsIcon from 'react-icons/lib/fa/tags'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import { ResponsivePie } from 'nivo'
import { labelsPropTypes, labelsDefaultProps } from './propTypes'
import { countLabel } from './counts'

export default class LabelsPie extends Component {
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

            const data = labels.map(label => ({
                ...label,
                id: `${label.id}`,
                value: label[countBy],
            }))

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body = (
                <ResponsivePie
                    data={data}
                    colorBy={d => d.color}
                    innerRadius={0.6}
                    label={d => `${d.name} ${d.open_issues_count}`}
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
