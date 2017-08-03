import PropTypes from 'prop-types'
import { countTypes } from './counts'

export const labelsPropTypes = {
    project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    countBy: PropTypes.oneOf(countTypes).isRequired,
    apiData: PropTypes.shape({
        project: PropTypes.shape({
            name: PropTypes.string.isRequired,
            web_url: PropTypes.string.isRequired,
        }).isRequired,
        labels: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired,
                open_issues_count: PropTypes.number.isRequired,
                closed_issues_count: PropTypes.number.isRequired,
                open_merge_requests_count: PropTypes.number.isRequired,
            })
        ).isRequired,
    }),
    apiError: PropTypes.object,
    animate: PropTypes.bool.isRequired,
}

export const labelsDefaultProps = {
    countBy: 'open_issues_count',
    animate: false,
}
