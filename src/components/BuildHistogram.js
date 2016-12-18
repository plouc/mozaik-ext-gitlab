import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import {
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'
import {
    ResponsiveChart as Chart,
    Scale,
    Axis,
    Grid,
    Bars,
} from 'nivo'


const margin = { top: 20, right: 20, bottom: 40, left: 60 }


class BuildHistogram extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        apiData: PropTypes.shape({
            project: PropTypes.object,
            builds:  PropTypes.array.isRequired,
        }),
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectBuilds.${ project }`,
            params: { project },
        }
    }

    render() {
        const { apiData } = this.props
        const { theme }   = this.context

        let subject = null

        let body = <div>no data</div>
        if (apiData !== undefined) {
            const { project, builds } = apiData

            subject = (
                <a href={project.web_url} target="_blank">
                    {project.name}
                </a>
            )

            const data = builds.map(({ id, status, started_at, finished_at }) => {
                let duration = 0
                if (started_at && finished_at) {
                    duration = moment(finished_at).diff(started_at) / 1000
                }

                return { id, duration, status }
            })

            body = (
                <Chart data={data} margin={margin} theme={theme.charts}>
                    <Scale id="duration" type="linear" dataKey="duration" axis="y"/>
                    <Scale id="id" type="band" dataKey="id" axis="x" padding={0.3}/>
                    <Grid yScale="duration"/>
                    <Axis position="left" scaleId="duration" axis="y"/>
                    <Axis position="bottom" scaleId="id" axis="x"/>
                    <Bars xScale="id" x="id" yScale="duration" y="duration" color="#fff"/>
                </Chart>
            )
        }

        return (
            <div>
                <WidgetHeader
                    title="Builds"
                    subject={subject}
                    icon="bar-chart"
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    {body}
                </WidgetBody>
            </div>
        )
    }
}


export default BuildHistogram
