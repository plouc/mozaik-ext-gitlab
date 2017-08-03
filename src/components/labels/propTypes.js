import PropTypes from 'prop-types'
import { countTypes } from './counts'

export const labelsPropTypes = {
    project: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    countBy: PropTypes.oneOf(countTypes).isRequired,
    apiData: PropTypes.arrayOf(PropTypes.any).isRequired,
    apiError: PropTypes.object,
    animate: PropTypes.func.isRequired,
}

export const labelsDefaultProps = {
    countBy: 'open_issues_count',
    animate: false,
}
