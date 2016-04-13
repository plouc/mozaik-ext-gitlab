import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import moment                          from 'moment';
import Mozaik                          from 'mozaik/browser';
const { BarChart }                     = Mozaik.Component;


class BuildHistogram extends Component {
    constructor(props) {
        super(props);

        this.state = { builds: [] };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id:     `gitlab.projectBuilds.${ project }`,
            params: { project }
        };
    }

    onApiData({ builds }) {
        this.setState({ builds: builds.slice().reverse() });
    }

    render() {
        const { builds } = this.state;

        // converts to format required by BarChart component
        const data = builds.map(({ id, status, started_at, finished_at }) => {
            let duration = 0;
            if (started_at && finished_at) {
                duration = moment(finished_at).diff(started_at) / 1000;
            }

            return {
                x: id,
                y: duration,
                status
            };
        });

        const barChartOptions = {
            mode:            'stacked',
            xLegend:         'build number',
            xLegendPosition: 'right',
            yLegend:         'duration (seconds)',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        d => `result--${ d.status }`
        };

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
        );
    }
}

BuildHistogram.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(BuildHistogram.prototype, ListenerMixin);
reactMixin(BuildHistogram.prototype, Mozaik.Mixin.ApiConsumer);


export default BuildHistogram;
