import React, { Component, PropTypes } from 'react'
import { WidgetListItem }              from 'mozaik/ui'


class ProjectContributorsItem extends Component {
    render() {
        const { contributor: { name, commits } } = this.props

        return (
            <WidgetListItem
                title={name}
                post={(
                    <span>
                        {commits}&nbsp;<i className="fa fa-dot-circle-o"/>
                    </span>
                )}
            />
        )
    }
}

ProjectContributorsItem.propTypes = {
    contributor: PropTypes.shape({
        name:    PropTypes.string.isRequired,
        commits: PropTypes.number.isRequired,
    }).isRequired,
}


export default ProjectContributorsItem
