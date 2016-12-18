import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import { WidgetListItem }              from 'mozaik/ui'


class Branch extends Component {
    render() {
        const { project, branch } = this.props

        // {branch.protected && (<span><i className="fa fa-lock" /> protected</span>)}

        return (
            <WidgetListItem
                title={
                    <span>
                        <a href={`${project.web_url}/tree/${branch.name}`} target="_blank">
                            {branch.name}
                        </a>&nbsp;
                        <a
                            href={`${project.web_url}/commit/${branch.commit.id}`}
                            target="_blank"
                            style={{ textDecoration: 'underline' }}
                        >
                            #{branch.commit.id.substring(0, 7)}
                        </a>
                    </span>
                }
                meta={
                    <div>
                        <div>{branch.commit.message}</div>
                        <time>
                            <i className="fa fa-clock-o" />&nbsp;
                            {moment(branch.commit.committed_date).fromNow()}
                        </time>
                    </div>
                }
            />
        )
    }
}

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
    }).isRequired,
}


export default Branch
