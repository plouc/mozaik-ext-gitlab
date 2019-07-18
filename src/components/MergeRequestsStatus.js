import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

export default class MergeRequestsStatus extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        status: PropTypes.string,
        thresholds: PropTypes.arrayOf(
            PropTypes.shape({
                threshold: PropTypes.number.isRequired,
                textColor: PropTypes.string.isRequired,
                bgColor: PropTypes.string.isRequired,
                message: PropTypes.string.isRequired,
            })
        ).isRequired,
        apiData: PropTypes.object.isRequired,
        apiError: PropTypes.object,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        thresholds: [
            {
                threshold: 0,
                textColor: 'text',
                bgColor: 'success',
                message: 'good job!',
            },
            {
                threshold: 3,
                textColor: 'text',
                bgColor: 'warning',
                message: 'you should consider reviewing',
            },
            {
                threshold: 5,
                textColor: 'text',
                bgColor: 'failure',
                message: 'merge requests overflow',
            },
        ],
        apiData: { items: [] },
    }

    static getApiRequest({ project, status = 'opened' }) {
        return {
            id: `gitlab.projectMergeRequestsStatus.${project}.${status}`,
            params: {
                project,
                query: {
                    state: status,
                },
            },
        }
    }

    render() {
        const { thresholds, apiData, theme } = this.props

        const mergeRequestCount = apiData.items ? apiData.items.length : 0

        let currentThreshold
        let count = 0
        thresholds.map((threshold, index) => {
            if (mergeRequestCount >= threshold.threshold) {
                count = index
            }
            return null
        })
        currentThreshold = thresholds[count]

        const backgroundColor = theme.colors[currentThreshold.bgColor]
            ? theme.colors[currentThreshold.bgColor]
            : ''
        const fontColor = theme.colors[currentThreshold.textColor]
            ? theme.colors[currentThreshold.textColor]
            : theme.colors.text

        return (
            <Widget>
                <WidgetHeader title="Pending Merge Requests" icon="dashboard" />
                <WidgetBody
                    style={{
                        background: backgroundColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: fontColor,
                        fontWeight: 'bolder',
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: '3rem',
                                lineHeight: '3.5rem',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            {parseInt(mergeRequestCount, 10)}
                        </div>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            {currentThreshold.message}
                        </div>
                    </div>
                </WidgetBody>
            </Widget>
        )
    }
}
