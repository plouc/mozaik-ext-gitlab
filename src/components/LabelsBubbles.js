import React, { Component, PropTypes }  from 'react'
import { ResponsiveBubbleD3 as Bubble } from 'nivo'


class LabelsBubbles extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectLabels.${ project }`,
            params: { project }
        }
    }

    render() {
        const { apiData: labels } = this.props

        const data = {
            name:     'labels',
            color:    '#000',
            children: labels,
        }

        return (
            <div>
                <div className="widget__header">
                    <span>
                        Labels
                        <span className="widget__header__count">
                            {labels.length}
                        </span>
                    </span>
                    <i className="fa fa-tags" />
                </div>
                <div className="widget__body">
                    {labels.length ? (
                        <Bubble
                            data={data}
                            labelSkipRadius={12}
                            value="open_issues_count"
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}

LabelsBubbles.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    countBy: PropTypes.oneOf([
        'open_issues_count',
        'closed_issues_count',
        'open_merge_requests_count',
    ]).isRequired,
    apiData: PropTypes.arrayOf(PropTypes.any).isRequired,
}

LabelsBubbles.defaultProps = {
    apiData: [],
    countBy: 'open_issues_count',
}


export default LabelsBubbles
