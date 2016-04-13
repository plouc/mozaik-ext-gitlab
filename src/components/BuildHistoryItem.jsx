import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';


class BuildHistoryItem extends Component {
    render() {
        const { project, build } = this.props;

        let commitNode = null;
        if (build.commit) {
            commitNode = (
                <span className="travis__build-history__item__message">{build.commit.message}</span>
            );
        }

        const cssClasses = `list__item list__item--with-status list__item--with-status--${build.status}`;

        return (
            <div className={cssClasses}>
                <a href={`${project.web_url}/builds/${build.id}`} target="_blank">
                    #{build.id}
                </a>
                <span className="label__group">
                    <span className="label__addon">ref</span>
                    <span className="label">{build.ref}</span>
                </span>
                <span className="label__group">
                    <span className="label__addon">stage</span>
                    <span className="label">{build.stage}</span>
                </span>
                &nbsp;
                {commitNode}<br />
                {build.finished_at && (
                    <time className="list__item__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(build.finished_at).fromNow()}
                    </time>
                )}
            </div>
        );
    }
}

BuildHistoryItem.displayName = 'BuildHistoryItem';

BuildHistoryItem.propTypes = {
    project: PropTypes.shape({
        web_url: PropTypes.string.isRequired
    }).isRequired,
    build: PropTypes.shape({
        id:          PropTypes.number.isRequired,
        status:      PropTypes.string.isRequired,
        finished_at: PropTypes.string,
        commit:      PropTypes.shape({
            message: PropTypes.string.isRequired
        })
    }).isRequired
};


export default BuildHistoryItem;
