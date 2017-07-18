import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BuildsIcon from 'react-icons/lib/fa/bar-chart'
import moment from 'moment'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import { ResponsiveBar } from 'nivo'

const margin = { top: 20, right: 20, bottom: 60, left: 70 }

export default class BuildHistogram extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            project: PropTypes.object,
            builds: PropTypes.array.isRequired,
        }),
        apiError: PropTypes.object,
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.projectBuilds.${project}`,
            params: { project },
        }
    }

    render() {
        const { title, apiData, apiError, theme } = this.props

        let body = <WidgetLoader />
        let subject = null
        if (apiData) {
            const { project, builds } = apiData
            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            const data = [
                {
                    id: 'builds',
                    data: builds.map(({ id, status, started_at, finished_at }) => {
                        let duration = 0
                        if (started_at && finished_at) {
                            duration = moment(finished_at).diff(started_at, 'minutes')
                        }

                        return { id: `${id}`, duration, status, x: id, y: duration }
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
                    axes={{
                        left: {
                            tickPadding: 7,
                            tickSize: 0,
                            legend: 'duration (mn)',
                            legendPosition: 'center',
                            legendOffset: -40,
                        },
                        bottom: {
                            tickSize: 0,
                            tickPadding: 7,
                            legend: 'build id',
                            legendPosition: 'center',
                            legendOffset: 40,
                        },
                    }}
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Builds'}
                    subject={title ? null : subject}
                    icon={BuildsIcon}
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
