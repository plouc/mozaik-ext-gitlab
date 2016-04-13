import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const { Gauge }                        = Mozaik.Component;


class MergeRequestsGauge extends Component {
    constructor(props) {
        super(props);

        this.state = { mergeRequests: [] };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id:     `gitlab.projectMergeRequests.${ project }`,
            params: { project }
        };
    }

    onApiData(mergeRequests) {
        this.setState({ mergeRequests });
    }

    render() {
        const { thresholds }    = this.props;
        const { mergeRequests } = this.state;

        const cappedValue    = Math.min(mergeRequests.length, _.max(thresholds.map(threshold => threshold.threshold)));
        let message          = null;
        const normThresholds = thresholds.map(threshold => {
            if (message === null && cappedValue <= threshold.threshold) {
                message = threshold.message;
            }

            return {
                upperBound: threshold.threshold,
                color:      threshold.color
            };
        });

        return (
            <div>
                <div className="widget__header">
                    Pending Merge Requests
                    <span className="widget__header__count">
                        {mergeRequests.length}
                    </span>
                    <i className="fa fa-dashboard"/>
                </div>
                <div className="widget__body">
                    <div className="gitlab__merge-requests_gauge_chart">
                        <Gauge
                            donutRatio={0.65}
                            spacing={{ top: 45, right: 45, left: 45 }}
                            ranges={normThresholds}
                            value={mergeRequests.length}
                        />
                    </div>
                    <div className="gitlab__merge-requests_gauge_message">
                        {message}
                    </div>
                </div>
            </div>
        );
    }
}

MergeRequestsGauge.displayName = 'MergeRequestsGauge';

MergeRequestsGauge.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    thresholds: PropTypes.arrayOf(PropTypes.shape({
        threshold: PropTypes.number.isRequired,
        color:     PropTypes.string.isRequired,
        message:   PropTypes.string.isRequired
    })).isRequired
};

MergeRequestsGauge.defaultProps = {
    thresholds: [
        { threshold: 3,  color: '#85e985', message: 'good job!' },
        { threshold: 5,  color: '#ecc265', message: 'you should consider reviewing' },
        { threshold: 10, color: '#f26a3f', message: 'merge requests overflow' }
    ]
};

reactMixin(MergeRequestsGauge.prototype, ListenerMixin);
reactMixin(MergeRequestsGauge.prototype, Mozaik.Mixin.ApiConsumer);


export default MergeRequestsGauge;
