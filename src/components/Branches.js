import React, { Component, PropTypes } from 'react'
import Branch                          from './Branch'


class Branches extends Component {
    static getApiRequest({ project }) {
        return {
            id:     `gitlab.projectBranches.${ project }`,
            params: { project }
        }
    }

    render() {
        const { apiData: { project, branches } } = this.props

        return (
            <div>
                <div className="widget__header">
                    Project branches
                    <span className="widget__header__count">
                        {branches.length}
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    {branches.map(branch => (
                        <Branch key={branch.name} project={project} branch={branch} />
                    ))}
                </div>
            </div>
        )
    }
}

Branches.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    apiData: PropTypes.shape({
        project:  PropTypes.object,
        branches: PropTypes.array.isRequired,
    }).isRequired,
}

Branches.defaultProps = {
    apiData: {
        project:  null,
        branches: [],
    },
}


export default Branches
