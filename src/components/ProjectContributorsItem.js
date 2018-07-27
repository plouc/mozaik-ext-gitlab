import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DotIcon from 'react-icons/lib/fa/dot-circle-o'
import { WidgetListItem } from '@mozaik/ui'

export default class ProjectContributorsItem extends Component {
    static propTypes = {
        contributor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            commits: PropTypes.number.isRequired,
        }).isRequired,
    }

    render() {
        const {
            contributor: { name, commits },
        } = this.props

        return (
            <WidgetListItem
                title={name}
                post={
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {commits}&nbsp;<DotIcon />
                    </span>
                }
            />
        )
    }
}
