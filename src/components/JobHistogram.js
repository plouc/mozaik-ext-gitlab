import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BuildsIcon from 'react-icons/lib/fa/bar-chart'
import moment from 'moment'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import { ResponsiveBar } from 'nivo'

const margin = { top: 20, right: 20, bottom: 60, left: 70 }
const colorBy = d => d.color
const axisLeft = {
    tickPadding: 7,
    tickSize: 0,
    legend: 'duration (mn)',
    legendPosition: 'center',
    legendOffset: -40,
}
const axisBottom = {
    tickSize: 0,
    tickPadding: 7,
    legend: 'job id',
    legendPosition: 'center',
    legendOffset: 40,
}

export default class JobHistogram extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object,
            jobs: {
                items:PropTypes.array.isRequired,
            }
        }),
        apiError: PropTypes.object,
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectJobs.${project}`,
            params: { project },
        }
    }

    render() {
        const { title, apiData, apiError, theme } = this.props

        const getColorForStatus = status => {
            if (status === 'success') return theme.colors.success
            if (status === 'failed') return theme.colors.failure
            return theme.colors.unknown
        }

        let body = <WidgetLoader />
        let subject = null
        if (apiData) {
            const { project, jobs } = apiData
            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            const data = [
                {
                    id: 'jobs',
                    data: jobs.items.map(({ id, status, started_at, finished_at }) => {
                        let duration = 0
                        if (started_at && finished_at) {
                            duration = moment(finished_at).diff(started_at, 'minutes')
                        }

                        return {
                            id: `${id}`,
                            duration,
                            status,
                            x: id,
                            y: duration,
                            color: getColorForStatus(status),
                        }
                    }),
                },
            ]

            body = (
                <ResponsiveBar
                    data={data}
                    margin={margin}
                    xPadding={0.3}
                    theme={theme.charts}
                    animate={false}
                    enableLabels={false}
                    colorBy={colorBy}
                    axisLeft={axisLeft}
                    axisBottom={axisBottom}
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Jobs'}
                    subject={title ? null : subject}
                    icon={BuildsIcon}
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
