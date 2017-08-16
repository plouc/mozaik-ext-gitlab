import { Component } from 'react'
import PropTypes from 'prop-types'

export default class MockedMeasure extends Component {
    static propTypes = {
        onResize: PropTypes.func.isRequired,
        children: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const { onResize } = this.props
        onResize({
            bounds: {
                width: 600,
                height: 400,
            },
        })
    }

    render() {
        const { children } = this.props

        return children({ measureRef: () => {} })
    }
}
