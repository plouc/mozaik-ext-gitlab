import React, { Component, PropTypes }    from 'react'
import { ResponsiveTreeMapD3 as Treemap } from 'nivo'


class LabelsTreemap extends Component {
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
                        <Treemap
                            root={data}
                            valueAccessor={d => d.open_issues_count}
                            skipVMin={20}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}

LabelsTreemap.propTypes = {
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

LabelsTreemap.defaultProps = {
    apiData: [],
    countBy: 'open_issues_count',
}


export default LabelsTreemap
