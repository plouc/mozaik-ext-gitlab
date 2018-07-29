import PropTypes from 'prop-types'

export const eventPropType = {
    project_id: PropTypes.number.isRequired,
    action_name: PropTypes.string.isRequired,
    target_type: PropTypes.oneOf([
        'Issue',
        'Milestone',
        'MergeRequest',
        'Note',
        'Project',
        'Snippet',
        'User',
        'DiscussionNote',
        'DiffNote',
    ]),
    target_id: PropTypes.number,
    target_iid: PropTypes.number,
    target_title: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    author: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        web_url: PropTypes.string.isRequired,
    }).isRequired,
    note: PropTypes.shape({
        noteable_type: PropTypes.oneOf(['Issue', 'MergeRequest']).isRequired,
    }),
    push_data: PropTypes.shape({
        action: PropTypes.string.isRequired,
        commit_count: PropTypes.number.isRequired,
        commit_from: PropTypes.string.isRequired,
        commit_to: PropTypes.string.isRequired,
        commit_title: PropTypes.string.isRequired,
        ref_type: PropTypes.string.isRequired,
        ref: PropTypes.string.isRequired,
    }),
}
