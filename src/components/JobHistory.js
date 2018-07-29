import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    ExternalLink,
    BarChartIcon,
} from '@mozaik/ui'
import JobHistoryItem from './JobHistoryItem'

export default class JobHistory extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object,
            jobs: {
                items: PropTypes.array.isRequired,
            },
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectJobs.${project}`,
            params: { project },
        }
    }

    render() {
        const { title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        let subject = null
        if (apiData) {
            const { project, jobs } = apiData

            subject = <ExternalLink href={project.web_url}>{project.name}</ExternalLink>

            body = (
                <div>
                    {jobs.items.map(job => (
                        <JobHistoryItem key={job.id} project={project} job={job} />
                    ))}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Jobs'}
                    subject={title ? null : subject}
                    icon={BarChartIcon}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
