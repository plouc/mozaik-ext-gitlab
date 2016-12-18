import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import {
    Gauge,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


class MergeRequestsGauge extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectMergeRequests.${ project }.opened`,
            params: {
                project,
                query: {
                    state: 'opened',
                },
            },
        }
    }

    render() {
        const { thresholds, apiData: mergeRequestCount } = this.props

        const cappedValue    = Math.min(mergeRequestCount, _.max(thresholds.map(threshold => threshold.threshold)))
        let message          = null
        const normThresholds = thresholds.map(threshold => {
            if (message === null && cappedValue <= threshold.threshold) {
                message = threshold.message
            }

            return {
                upperBound: threshold.threshold,
                color:      threshold.color,
            }
        })

        return (
            <div>
                <WidgetHeader
                    title="Pending Merge Requests"
                    count={mergeRequestCount}
                    icon="dashboard"
                />
                <WidgetBody>
                    <div className="gitlab__merge-requests_gauge_chart">
                        <Gauge
                            donutRatio={0.65}
                            spacing={{ top: 45, right: 45, left: 45 }}
                            ranges={normThresholds}
                            value={parseInt(mergeRequestCount, 10)}
                        />
                    </div>
                    <div className="gitlab__merge-requests_gauge_message">
                        {message}
                    </div>
                </WidgetBody>
            </div>
        )
    }
}

MergeRequestsGauge.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    thresholds: PropTypes.arrayOf(PropTypes.shape({
        threshold: PropTypes.number.isRequired,
        color:     PropTypes.string.isRequired,
        message:   PropTypes.string.isRequired,
    })).isRequired,
    apiData: PropTypes.number.isRequired,
}

MergeRequestsGauge.defaultProps = {
    thresholds: [
        { threshold: 3,  color: '#85e985', message: 'good job!' },
        { threshold: 5,  color: '#ecc265', message: 'you should consider reviewing' },
        { threshold: 10, color: '#f26a3f', message: 'merge requests overflow' },
    ],
    apiData: 0,
}


export default MergeRequestsGauge
