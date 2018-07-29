import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WidgetListItem } from '@mozaik/ui'
import styled from 'styled-components'

const Additions = styled.span`
    color: ${props => props.theme.colors.success};
`

const Deletions = styled.span`
    color: ${props => props.theme.colors.failure};
`

export default class ProjectContributorsItem extends Component {
    static propTypes = {
        contributor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            commits: PropTypes.number.isRequired,
        }).isRequired,
    }

    render() {
        const {
            contributor: { name, commits, additions, deletions },
        } = this.props

        return (
            <WidgetListItem
                title={name}
                meta={
                    <div>
                        {commits} commit <Additions>{additions} ++</Additions>{' '}
                        <Deletions>{deletions} --</Deletions>
                    </div>
                }
            />
        )
    }
}
