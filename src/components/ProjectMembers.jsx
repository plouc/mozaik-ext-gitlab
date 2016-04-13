import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import ProjectMembersItem              from './ProjectMembersItem.jsx';


class ProjectMembers extends Component {
    constructor(props) {
        super(props);

        this.state = { members: [] };
    }

    getApiRequest() {
        const { project } = this.props;

        return {
            id:     `gitlab.projectMembers.${ project }`,
            params: { project }
        };
    }

    onApiData(members) {
        this.setState({ members });
    }

    render() {
        const { members } = this.state;

        return (
            <div>
                <div className="widget__header">
                    Project members
                    <span className="widget__header__count">
                        {members.length}
                    </span>
                    <i className="fa fa-child" />
                </div>
                <div className="widget__body">
                    {members.map(member => (
                        <ProjectMembersItem
                            key={`member.${member.id}`}
                            member={member}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

ProjectMembers.displayName = 'ProjectMembers';

ProjectMembers.propTypes = {
    project: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

reactMixin(ProjectMembers.prototype, ListenerMixin);
reactMixin(ProjectMembers.prototype, Mozaik.Mixin.ApiConsumer);


export default ProjectMembers;
