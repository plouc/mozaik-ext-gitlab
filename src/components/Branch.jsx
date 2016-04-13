import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';


class Branch extends Component {
    render() {
        const { project, branch } = this.props;

        return (
            <div className="list__item">
                <div className="list__item__header">
                    <a
                        href={`${project.web_url}/tree/${branch.name}`}
                        target="_blank"
                        className="gitlab__branches__item__name"
                    >
                        {branch.name}
                    </a>
                    {branch.protected && (
                        <span>
                            <i className="fa fa-lock" /> protected
                        </span>
                    )}
                    <a
                        href={`${project.web_url}/commit/${branch.commit.id}`}
                        target="_blank"
                        className="gitlab__branches__item__commit__id"
                    >
                        {branch.commit.id.substring(0, 7)}
                    </a>
                </div>
                <div className="gitlab__branches__item__commit__message">
                    {branch.commit.message}
                    <time className="list__item__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(branch.commit.committed_date).fromNow()}
                    </time>
                </div>
            </div>
        );
    }
}

Branch.displayName = 'Branch';

Branch.propTypes = {
    project: PropTypes.shape({
        web_url: PropTypes.string.isRequired
    }).isRequired,
    branch: PropTypes.shape({
        name:      PropTypes.string.isRequired,
        protected: PropTypes.bool.isRequired,
        commit:    PropTypes.shape({
            message:     PropTypes.string.isRequired,
            author_name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};


export default Branch;
