import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
    TrapApiError,
    Widget,
    WidgetBody,
    WidgetLoader,
    typography,
    WidgetAvatar,
} from '@mozaik/ui'

const AVATAR_SIZE = '12vmin'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Header = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AvatarPlaceholder = styled.span`
    width: ${AVATAR_SIZE};
    height: ${AVATAR_SIZE};
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: ${props => props.theme.colors.textHighlight};
    background: ${props => props.theme.colors.unknown};
    ${props => typography(props.theme, 'display')} font-size: 6vmin;
`

const Description = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre;
    color: ${props => props.theme.colors.textHighlight};
    margin: 1vmin 0 3vmin;
    ${props => typography(props.theme, 'default', 'strong')};
`

export default class Project extends Component {
    static propTypes = {
        project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        apiData: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            name_with_namespace: PropTypes.string.isRequired,
            visibility: PropTypes.string.isRequired,
            avatar_url: PropTypes.string,
        }),
        apiError: PropTypes.object,
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ project }) {
        return {
            id: `gitlab.project.${project}`,
            params: { project },
        }
    }

    render() {
        const { apiData: project, apiError } = this.props

        let body = <WidgetLoader />
        if (project) {
            let avatar
            if (project.avatar_url !== null) {
                avatar = <img src={project.avatar_url} alt={project.name_with_namespace} />
            } else {
                avatar = <AvatarPlaceholder>{project.name[0]}</AvatarPlaceholder>
            }

            body = (
                <Container>
                    <Header>
                        <WidgetAvatar size={AVATAR_SIZE}>{avatar}</WidgetAvatar>
                    </Header>
                    <Description>{project.description}</Description>
                </Container>
            )
        }

        return (
            <Widget>
                <WidgetBody isHeaderless={true}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
