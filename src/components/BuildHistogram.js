import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import Mozaik                          from 'mozaik/ui'
const { BarChart }                     = Mozaik


class BuildHistogram extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectBuilds.${ project }`,
            params: { project },
        }
    }

    render() {
        const { apiData: { builds } } = this.props

        // converts to format required by BarChart component
        const data = builds.map(({ id, status, started_at, finished_at }) => {
            let duration = 0
            if (started_at && finished_at) {
                duration = moment(finished_at).diff(started_at) / 1000
            }

            return {
                x: id,
                y: duration,
                status
            }
        })

        const barChartOptions = {
            mode:            'stacked',
            xLegend:         'build number',
            xLegendPosition: 'right',
            yLegend:         'duration (seconds)',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        d => `result--${ d.status }`
        }

        return (
            <div>
                <div className="widget__header">
                    Build histogram
                    <i className="fa fa-bar-chart" />
                </div>
                <div className="widget__body">
                    <BarChart data={[{ data: data }]} options={barChartOptions}/>
                </div>
            </div>
        )
    }
}

BuildHistogram.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    apiData: PropTypes.shape({
        builds: PropTypes.array.isRequired,
    }).isRequired,
}

BuildHistogram.defaultProps = {
    apiData: {
        project: null,
        builds:  [],
    },
}


export default BuildHistogram
