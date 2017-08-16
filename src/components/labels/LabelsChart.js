import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LabelsIcon from 'react-icons/lib/fa/tags'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import { countTypes, countLabel } from './counts'

export default class LabelsChart extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        countBy: PropTypes.oneOf(countTypes).isRequired,
        apiData: PropTypes.shape({
            project: PropTypes.shape({
                name: PropTypes.string.isRequired,
                web_url: PropTypes.string.isRequired,
            }).isRequired,
            labels: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    color: PropTypes.string.isRequired,
                    open_issues_count: PropTypes.number.isRequired,
                    closed_issues_count: PropTypes.number.isRequired,
                    open_merge_requests_count: PropTypes.number.isRequired,
                })
            ).isRequired,
        }),
        apiError: PropTypes.object,
        title: PropTypes.string,
        animate: PropTypes.bool.isRequired,
        children: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        countBy: 'open_issues_count',
        animate: false,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectLabels.${project}`,
            params: { project },
        }
    }

    render() {
        const { apiData, apiError, title, countBy, animate, children, theme } = this.props

        let body = <WidgetLoader />
        let subject = null
        let count = 0
        if (apiData) {
            const { project, labels } = apiData

            count = labels.length

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            body = children({
                labels,
                countBy,
                animate,
                theme: theme.charts,
            })
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
